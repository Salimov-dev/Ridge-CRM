import dayjs from "dayjs";
import config from "@config/config.json";
import styled from "@emotion/styled";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
// components
import InformItem from "./inform-item";
// utils
import { FormatDate } from "@utils/date/format-date";
// store
import { getCurrentUserId } from "@store/user/users.store";
import { getUserLicensesByUserId } from "@store/user/user-license.store";
import { makeDigitSeparator } from "@utils/data/make-digit-separator";
// data
import { userLicenseStatusesArray } from "@data/users/user-license-statuses";

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

  const managersLength = userLicense?.managers.length || 0;
  const observersLength = userLicense?.observers.length || 0;
  const totalUsersLength = managersLength + observersLength + 1; // 1 добавляю в качестве лицензии текущего пользователя Куратора

  const licenseCost = config.licenseCost;
  const totalLicensesCost = totalUsersLength * licenseCost;

  const dateStart = dayjs(userLicense?.dateStart);
  const dateEnd = dayjs(userLicense?.dateEnd);
  const daysDifference = dateEnd?.diff(dayjs(), "day");

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
      <InformItem
        title="Дата окончания подписки"
        subtitle={FormatDate(dateEnd)}
      />
      <InformItem title="Дней доступа к системе" subtitle={daysDifference} />
      <InformItem
        title="Активных пользователей"
        subtitle={totalUsersLength}
        unit="шт"
      />
      <InformItem
        title="Общая стоимость подписок"
        subtitle={totalLicensesCost}
        unit="₽/день"
      />
    </InformItemsContainer>
  );
};

export default InformItems;