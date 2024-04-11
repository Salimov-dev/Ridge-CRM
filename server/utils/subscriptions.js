import UserLicense from "../models/UserLicense.js";
import User from "../models/User.js";
import dayjs from "dayjs";
import { Sequelize } from "sequelize";

const subscriptions = async () => {
  try {
    const usersList = await User.findAll();
    const licenseList = await UserLicense.findAll();

    // тип лицензии
    const trialLicenseTypeId = "71pbfi4954itj045tloop001";
    const activeLicenseTypeId = "718gkgdbn48jgfo3kktjt002";
    const blockedLicenseTypeId = "71kbjld394u5jgfdsjk4l003";

    licenseList.forEach(async (userLicense) => {
      try {
        const currentUserId = userLicense.userId;
        const currentUser = await User.findByPk(currentUserId);

        const currentLicenseTypeId = userLicense?.accountType;
        const isLicenseTrialType = currentLicenseTypeId === trialLicenseTypeId;
        const isLicenseActiveType =
          currentLicenseTypeId === activeLicenseTypeId;
        const isLicenseBlockedType =
          currentLicenseTypeId === blockedLicenseTypeId;

        // дата
        const currentDate = dayjs();
        const yesterday = currentDate.subtract(1, "day");
        const currentLicenseStartDate = dayjs(userLicense.dateStart);
        const currentLicenseEndDate = dayjs(userLicense.dateEnd);
        const currentLicenseEndTrialDate = dayjs(userLicense.dateTrialEnd);
        let newLicenseStartDate = currentLicenseStartDate;

        // вычисление активных пользователей лицензии
        const usersManagersArray = userLicense?.managers;
        const activeUsersManagers = usersManagersArray?.filter((userId) => {
          const user = usersList.find((user) => user._id === userId);
          return user && user.isActive;
        });

        const usersObserversArray = userLicense?.observers;
        const activeUsersObservers = usersObserversArray?.filter((userId) => {
          const user = usersList.find((user) => user._id === userId);
          return user && user.isActive;
        });

        const allCuratorUsers = [...usersManagersArray, ...usersObserversArray];
        const allUserWithCurrentUserArray = [
          ...allCuratorUsers,
          currentUser._id
        ];

        const updateYesterdayUsers = [];
        for (const userId of allCuratorUsers) {
          try {
            const filteredUser = await User.findByPk(userId);
            if (
              filteredUser &&
              filteredUser.updated_at &&
              filteredUser.created_at &&
              filteredUser.updated_at !== filteredUser.created_at &&
              dayjs(filteredUser.updated_at).isSame(yesterday, "day")
            ) {
              updateYesterdayUsers.push(filteredUser);
            }
          } catch (error) {
            console.error(
              "Ошибка при обновлении поиске обновленного сегодня пользователя:",
              error
            );
          }
        }

        const updateYesterdayUsersIds = updateYesterdayUsers.map(
          (user) => user._id
        );

        const managersLength = activeUsersManagers?.length || 0;
        const observersLength = activeUsersObservers?.length || 0;
        const updatedYesterdayUsersLength =
          updateYesterdayUsersIds?.length || 0;
        const totalActiveUsersQuantity =
          managersLength + observersLength + updatedYesterdayUsersLength + 1; // 1 добавляю в качестве лицензии текущего пользователя Куратора
        let newLicenseEndDate = currentLicenseEndDate;

        // баланс
        const currentLicenseBalance = userLicense.balance;
        const subscriptionCostPerUser = 25; // Стоимость подписки за одного пользователя
        const licenseDaysLeftQuantity = Math.floor(
          currentLicenseBalance /
            (subscriptionCostPerUser * totalActiveUsersQuantity)
        );

        const costsForAllActivityUsersPerDay =
          totalActiveUsersQuantity * subscriptionCostPerUser;

        const newBalanceAtNewDay =
          currentLicenseBalance - costsForAllActivityUsersPerDay;

        const makeLicenseTypeIsBlock = async () => {
          allUserWithCurrentUserArray.forEach(async (userId) => {
            try {
              await User.update(
                { isActive: false },
                { where: { _id: userId } }
              );
            } catch (error) {
              console.error(
                "Ошибка при обновлении статуса активности пользователя:",
                error
              );
            }

            try {
              await UserLicense.update(
                { quantityClicksOnMap: 0 },
                { where: { userId } }
              );
            } catch (error) {
              console.error(
                "Ошибка при обновлении количества кликов на карте:",
                error
              );
            }
          });

          // Обновление информации о лицензии
          await UserLicense.update(
            {
              balance: Sequelize.literal(
                `balance - ${costsForAllActivityUsersPerDay}`
              ),
              accountType: blockedLicenseTypeId,
              activeUsersQuantity: 0,
              dateEnd: currentDate
            },
            { where: { userId: currentUserId } }
          );

          const updatedLicense = await UserLicense.findOne({
            where: { userId: currentUserId }
          });

          return updatedLicense;
        };

        if (isLicenseTrialType && currentDate > currentLicenseEndTrialDate) {
          makeLicenseTypeIsBlock();
        }

        if (
          isLicenseActiveType &&
          newBalanceAtNewDay > costsForAllActivityUsersPerDay
        ) {
          allUserWithCurrentUserArray.forEach(async (userId) => {
            try {
              await UserLicense.update(
                { quantityClicksOnMap: 60 },
                { where: { userId } }
              );
            } catch (error) {
              console.error(
                "Ошибка при обновлении кол-ва кликов пользователя активной лицензии:",
                error
              );
            }
          });

          // Обновление информации о лицензии
          const newTotalActiveUsersQuantity =
            managersLength + observersLength + 1;
          const newUserLicenseBalance =
            currentLicenseBalance - costsForAllActivityUsersPerDay;
          const newLicenseDaysLeftQuantity = Math.floor(
            newUserLicenseBalance /
              (subscriptionCostPerUser * newTotalActiveUsersQuantity)
          );
          const newLicenseEndDate = updatedYesterdayUsersLength
            ? currentDate
                .add(newLicenseDaysLeftQuantity, "day")
                .subtract(1, "day")
            : userLicense.dateEnd;

          await UserLicense.update(
            {
              balance: Sequelize.literal(
                `balance - ${costsForAllActivityUsersPerDay}`
              ),
              quantityClicksOnMap: 60,
              dateEnd: newLicenseEndDate
            },
            { where: { userId: currentUserId } }
          );

          const updatedLicense = await UserLicense.findOne({
            where: { userId: currentUserId }
          });

          return updatedLicense;
        }

        if (
          isLicenseActiveType &&
          newBalanceAtNewDay < costsForAllActivityUsersPerDay
        ) {
          makeLicenseTypeIsBlock();
        }
      } catch (error) {
        console.error("Ошибка при обработке баланса лицензии:", error);
      }
    });
  } catch (e) {
    console.error("На сервере произошла ошибка, попробуйте позже:", e);
  }
};

export default subscriptions;
