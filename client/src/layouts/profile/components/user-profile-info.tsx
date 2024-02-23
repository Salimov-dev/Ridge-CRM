import { Box, Typography } from "@mui/material";
import styled from "@emotion/styled";
// utils
import { FormatDate } from "@utils/date/format-date";
import { getGenderName } from "@utils/user/get-gender-name";

const Component = styled(Box)`
  display: flex;
  flex-direction: column;
`;

const UserProfileInfo = ({ user, setState }) => {
  const getRoleName = (role) => {
    if (role && role[0]) {
      if (role[0] === "CURATOR") return "Куратор";
      if (role[0] === "MANAGER") return "Менеджер";
      if (role[0] === "OBSERVER") return "Наблюдатель";
      return "Не задано";
    }
  };

  const userDataArrayMain = [
    { name: "Почта", value: user?.email || "Не задано" },
    { name: "Статус", value: user?.status || "Не задано" },
    { name: "Роль", value: getRoleName(user?.role) }
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
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "14px",
          margin: "30px 0 10px 0"
        }}
      >
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
    </Component>
  );
};

export default UserProfileInfo;
