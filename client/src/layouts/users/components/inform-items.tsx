import styled from "@emotion/styled";
import { Box } from "@mui/material";
import InformItem from "./inform-item";
import { FormatDate } from "@utils/date/format-date";
import { useSelector } from "react-redux";
import { getCurrentUserId } from "@store/user/users.store";
import { getUserLicensesByUserId } from "@store/user/user-license.store";
import dayjs from "dayjs";
import config from "@config/config.json";

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
    if (accountType === "DEMO") return "Бесплатный";
    if (accountType === "REAL") return "Активированный";
    if (accountType === "BLOCK") return "Заблокированный";
  };

  const managersLength = userLicense?.managers.length;
  const observersLength = userLicense?.observers.length;
  const totalUsersLength = managersLength + observersLength + 1; // 1 добавляю в качестве лицензии текущего пользователя Куратора

  const licenseCost = config.licenseCost;
  const totalLicensesCost = totalUsersLength * licenseCost;

  const dateStart = dayjs(userLicense?.dateStart);
  const dateEnd = dayjs(userLicense?.dateEnd);
  const daysDifference = dateEnd?.diff(dayjs(), "day");

  return (
    <InformItemsContainer>
      <InformItem title="Баланс" subtitle={userLicense?.balance} unit="₽" />
      <InformItem title="Тип аккаунта" subtitle={getAccountType()} />
      <InformItem
        title="Дата активации подписки"
        subtitle={FormatDate(dateStart)}
      />
      <InformItem
        title="Дата окончания подписки"
        subtitle={FormatDate(dateEnd)}
      />
      <InformItem title="Осталось дней работы" subtitle={daysDifference} />
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
