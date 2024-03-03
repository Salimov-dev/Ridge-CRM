import { useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";
import styled from "@emotion/styled";
// utils
import { FormatDate } from "@utils/date/format-date";
import { getGenderName } from "@utils/user/get-gender-name";
// store
import { getUserStatusNameById } from "@store/user-params/user-statuses.store";
import { getUserRolNameById } from "@store/user-params/user-role.store";

const Component = styled(Box)`
  display: flex;
  flex-direction: column;
`;

const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin: 30px 0 10px 0;
`;

const UserProfileInfo = ({ user }) => {
  const userDataArrayMain = [
    { name: "Почта", value: user?.email || "Не задано" },
    { name: "Статус", value: useSelector(getUserStatusNameById(user?.status)) },
    { name: "Роль", value: useSelector(getUserRolNameById(user?.role[0])) }
  ];

  const userDataArraySecondary = [
    { name: "Фамилия", value: user?.lastName || "Не задано" },
    { name: "Имя", value: user?.firstName || "Не задано" },
    { name: "Отчество", value: user?.surName || "Не задано" },
    { name: "Пол", value: getGenderName(user?.gender) || "Не задано" },
    {
      name: "Дата рождения",
      value: user?.birthday ? FormatDate(user?.birthday) : "Не задано"
    },
    { name: "Телефон", value: user?.phone || "Не задано" }
  ];

  return (
    <Component>
      <Container>
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
      </Container>
    </Component>
  );
};

export default UserProfileInfo;
