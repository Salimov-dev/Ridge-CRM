import dayjs from "dayjs";
import config from "@config/config.json";
import styled from "@emotion/styled";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
// components
import InformItemUsersLayout from "./inform-item.users-layout";
// utils
import { FormatDate } from "@utils/date/format-date";
// data
import {
  licenseTypeBlockedId,
  licenseTypeTrialId,
  userLicenseStatusesArray
} from "@data/license/user-license-statuses";
// store
import { getCurrentUserId, getUsersList } from "@store/user/users.store";
import { getUserLicensesByUserId } from "@store/license/user-license.store";

const InformItemsContainer = styled(Box)`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 30px;
`;

const InformItemsUsersLayout = () => {
  const currentUserId = useSelector(getCurrentUserId());
  const userLicense = useSelector(getUserLicensesByUserId(currentUserId));

  const getAccountType = () => {
    const accountType = userLicense?.accountType;

    const result = userLicenseStatusesArray.find(
      (role) => role._id === accountType
    )?.name;
    return result;
  };

  const currentLicenseTypeId = userLicense?.accountType;
  const isLicenseTrialType = currentLicenseTypeId === licenseTypeTrialId;
  const isLicenseBlockedType = currentLicenseTypeId === licenseTypeBlockedId;

  const totalUsersLength = userLicense?.activeUsersQuantity;
  const licenseCost = config.licenseCost;
  const totalLicensesCost = totalUsersLength * licenseCost;

  const currentDate = dayjs();

  const dateStart = dayjs(userLicense?.dateStart);
  const dateEnd = dayjs(userLicense?.dateEnd);
  const dateEndTrialPeriod = dayjs(userLicense?.dateTrialEnd);

  const daysDifference = userLicense?.accessDaysQuantity;

  console.log("users", useSelector(getUsersList()));

  return (
    <InformItemsContainer>
      <InformItemUsersLayout
        title="Баланс"
        subtitle={(userLicense?.balance || 0)
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
        unit="₽"
        userLicense={userLicense}
      />
      <InformItemUsersLayout
        title="Тип аккаунта"
        subtitle={getAccountType()}
        userLicense={userLicense}
      />
      <InformItemUsersLayout
        title="Дата активации подписки"
        subtitle={FormatDate(dateStart)}
        userLicense={userLicense}
      />
      <InformItemUsersLayout
        title="Текущая дата"
        subtitle={FormatDate(currentDate)}
        userLicense={userLicense}
      />
      {isLicenseTrialType ? (
        <InformItemUsersLayout
          title="Последний день демо-доступа"
          subtitle={FormatDate(dateEndTrialPeriod)}
          userLicense={userLicense}
        />
      ) : (
        <InformItemUsersLayout
          title="Последний день доступа"
          subtitle={FormatDate(dateEnd)}
          userLicense={userLicense}
        />
      )}
      <InformItemUsersLayout
        title="Дней доступа к системе"
        subtitle={!isLicenseBlockedType ? daysDifference : 0}
        userLicense={userLicense}
      />
      <InformItemUsersLayout
        title="Активных пользователей"
        subtitle={totalUsersLength}
        unit="шт"
        userLicense={userLicense}
      />
      <InformItemUsersLayout
        title="Общая стоимость подписки"
        subtitle={totalLicensesCost.toString()}
        unit="₽/день"
        userLicense={userLicense}
      />
    </InformItemsContainer>
  );
};

export default InformItemsUsersLayout;
