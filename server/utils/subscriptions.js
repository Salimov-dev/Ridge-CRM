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
        const userId = userLicense.userId;
        const currentUser = await User.findByPk(userId);

        const currentLicenseTypeId = userLicense?.accountType;
        const isLicenseTrialType = currentLicenseTypeId === trialLicenseTypeId;
        const isLicenseActiveType =
          currentLicenseTypeId === activeLicenseTypeId;
        const isLicenseBlockedType =
          currentLicenseTypeId === blockedLicenseTypeId;

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

        const allCuratorUsers = [...usersManagersArray, usersObserversArray];
        const allUserWithCurrentUserArray = [...allCuratorUsers, currentUser];

        const managersLength = activeUsersManagers?.length || 0;
        const observersLength = activeUsersObservers?.length || 0;
        const totalActiveUsersQuantity = managersLength + observersLength + 1; // 1 добавляю в качестве лицензии текущего пользователя Куратора

        // баланс
        const currentLicenseBalance = userLicense.balance;
        const subscriptionCostPerUser = 25; // Стоимость подписки за одного пользователя
        const licenseDaysLeftQuantity = Math.floor(
          currentLicenseBalance /
            (subscriptionCostPerUser * totalActiveUsersQuantity)
        );
        const costsForAllActivityUsersPerDay =
          totalActiveUsersQuantity * subscriptionCostPerUser;

        // дата
        const currentDate = dayjs();
        const currentLicenseStartDate = dayjs(userLicense.dateStart);
        const currentLicenseEndDate = dayjs(userLicense.dateEnd);
        const currentLicenseEndTrialDate = dayjs(userLicense.dateTrialEnd);
        let newLicenseStartDate = currentLicenseStartDate;
        let newLicenseEndDate = currentLicenseEndDate;

        if (isLicenseTrialType && currentDate > currentLicenseEndTrialDate) {
          allUserWithCurrentUserArray.forEach(async (userId) => {
            try {
              await User.update(
                { isActive: false },
                { where: { _id: userId } }
              );
              await UserLicense.update(
                { quantityClicksOnMap: 0 },
                { where: { userId } }
              );
            } catch (error) {
              console.error(
                "Ошибка при обновлении статуса активности пользователя:",
                error
              );
            }
          });

          // Обновление информации о лицензии
          await UserLicense.update(
            {
              accountType: blockedLicenseTypeId,
              activeUsersQuantity: 0
            },
            { where: { userId } }
          );

          const updatedLicense = await UserLicense.findOne({
            where: { userId }
          });

          return updatedLicense;
        }

        if (isLicenseActiveType) {
          // usersManagersArray
          //   .concat(usersObserversArray)
          //   .forEach(async (userId) => {
          //     try {
          //       await User.update(
          //         { quantityClicksOnMap: 60 },
          //         { where: { _id: userId } }
          //       );
          //     } catch (error) {
          //       console.error("Ошибка при обновлении  пользователя:", error);
          //     }
          //   });

          // Обновление информации о лицензии
          await UserLicense.update(
            {
              balance: Sequelize.literal(
                `balance - ${costsForAllActivityUsersPerDay}`
              ),
              quantityClicksOnMap: 60
            },
            { where: { userId } }
          );

          const updatedLicense = await UserLicense.findOne({
            where: { userId }
          });

          return updatedLicense;
        }
      } catch (error) {
        console.error("Ошибка при обработке баланса лицензии:", error);
      }
    });
  } catch (e) {
    console.error("На сервере произошла ошибка, попробуйте позже:", e);
    // Если это функция, которая выполняется асинхронно, не у вас нет доступа к res здесь.
    // res.status(500).json({ message: "На сервере произошла ошибка, попробуйте позже" });
  }
};

export default subscriptions;
