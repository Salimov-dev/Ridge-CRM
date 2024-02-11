import { Typography } from "@mui/material";

const CurrentLicenseInfo = ({
  currentBalace,
  totalUsersLength,
  totalLicensesCost
}) => {
  return (
    <>
      <Typography variant="h4">Текущий баланс: {currentBalace}₽</Typography>
      <Typography variant="h4">
        Количество пользователей: {totalUsersLength}шт
      </Typography>
      <Typography variant="h4">
        Общая стоимость подписок: {totalLicensesCost} ₽/день
      </Typography>
    </>
  );
};

export default CurrentLicenseInfo;
