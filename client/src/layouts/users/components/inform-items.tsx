import dayjs from "dayjs";
import config from "@config/config.json";
import styled from "@emotion/styled";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
// components
import InformItem from "./inform-item";
// utils
import { FormatDate } from "@utils/date/format-date";
// data
import { userLicenseStatusesArray } from "@data/users/user-license-statuses";
// store
import { getCurrentUserId } from "@store/user/users.store";
import { getUserLicensesByUserId } from "@store/user/user-license.store";
import { makeDigitSeparator } from "@utils/data/make-digit-separator";

const InformItemsContainer = styled(Box)`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 30px;
`;

const InformItems = () => {
  const currentUserId = useSelector(getCurrentUserId());
  const userLicense = useSelector(getUserLicensesByUserId(currentUserId));

  const getAccountType = () => {
    const accountType = userLicense?.accountType;

    const result = userLicenseStatusesArray.find(
      (role) => role._id === accountType
    )?.name;
    return result;
  };
  const trialLicenseTypeId = "71pbfi4954itj045tloop001";
  const currentLicenseTypeId = userLicense?.accountType;

  const totalUsersLength = userLicense?.activeUsersQuantity;

  const licenseCost = config.licenseCost;
  const totalLicensesCost = totalUsersLength * licenseCost;

  const dateStart = dayjs(userLicense?.dateStart);
  const dateEnd = dayjs(userLicense?.dateEnd);
  const dateEndTrialPeriod = dayjs(userLicense?.dateTrialEnd);

  const isLicenseTypeTrial = userLicense?.accountType === trialLicenseTypeId;
  const daysDifference = (
    isLicenseTypeTrial ? dateEndTrialPeriod : dateEnd
  )?.diff(dateStart, "day");

  return (
    <InformItemsContainer>
      <InformItem
        title="Баланс"
        subtitle={makeDigitSeparator(userLicense?.balance)}
        unit="₽"
      />
      <InformItem title="Тип аккаунта" subtitle={getAccountType()} />
      <InformItem
        title="Дата активации подписки"
        subtitle={FormatDate(dateStart)}
      />
      {currentLicenseTypeId === trialLicenseTypeId ? (
        <InformItem
          title="Дата окончания демо-доступа"
          subtitle={FormatDate(dateEndTrialPeriod)}
        />
      ) : (
        <InformItem
          title="Дата окончания подписки"
          subtitle={FormatDate(dateEnd)}
        />
      )}
      <InformItem title="Дней доступа к системе" subtitle={daysDifference} />
      <InformItem
        title="Активных пользователей"
        subtitle={totalUsersLength}
        unit="шт"
      />
      <InformItem
        title="Общая стоимость подписки"
        subtitle={totalLicensesCost.toString()}
        unit="₽/день"
      />
    </InformItemsContainer>
  );
};

export default InformItems;
