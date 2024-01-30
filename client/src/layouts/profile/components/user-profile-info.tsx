import ButtonStyled from "@components/common/buttons/button-styled.button";
import styled from "@emotion/styled";
import useDialogHandlers from "@hooks/dialog/use-dialog-handlers";
import { Box, Typography } from "@mui/material";
import { FormatDate } from "@utils/date/format-date";
import { getGenderName } from "@utils/user/get-gender-name";

const Component = styled(Box)`
  display: flex;
  flex-direction: column;
`;

const ButtonsContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const UserProfileInfo = ({ user, setState }) => {
  const { handleOpenUpdateProfilePage } = useDialogHandlers(setState);

  const userDataArrayMain = [
    { name: "Почта", value: user?.email || "Не задано" },
    { name: "Статус", value: user?.status || "Не задано" },
    { name: "Роль", value: user?.role || "Не задано" },
  ];

  const userDataArraySecondary = [
    { name: "Фамилия", value: user?.lastName || "Не задано" },
    { name: "Имя", value: user?.firstName || "Не задано" },
    { name: "Отчество", value: user?.surName || "Не задано" },
    { name: "Пол", value: getGenderName(user?.gender) || "Не задано" },
    { name: "Дата рождения", value: FormatDate(user?.birthday) || "Не задано" },
    { name: "Телефон", value: user?.phone || "Не задано" },
  ];
  return (
    <Component>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "14px",
          margin: "30px 0 10px 0",
        }}
      >
        <Typography variant="h2">Мой профиль:</Typography>
        <Box>
          {userDataArrayMain.map((item) => (
            <Typography variant="h5" key={item.name}>
              {item.name}: {item.value}
            </Typography>
          ))}
        </Box>
        <Box>
          {userDataArraySecondary.map((item) => (
            <Typography variant="h5" key={item.name}>
              {item.name}: {item.value}
            </Typography>
          ))}
        </Box>
      </Box>
      <ButtonsContainer>
        <ButtonStyled
          title="Править мой профиль"
          style="OBJECT"
          variant="contained"
          onClick={handleOpenUpdateProfilePage}
        />
        <ButtonStyled
          title="Изменить пароль"
          style="MY_TASK"
          variant="contained"
          // onClick={handleOpenUpdateProfilePage}
        />
      </ButtonsContainer>
    </Component>
  );
};

export default UserProfileInfo;
