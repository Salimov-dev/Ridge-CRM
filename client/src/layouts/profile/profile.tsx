import { useState } from "react";
import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
// components
import HeaderLayout from "@components/common/page-headers/header-layout";
import PageDialogs from "@components/common/dialog/page-dialogs";
// hooks
// icons
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
// store
import {
  getCurrentUserData,
  getCurrentUserId,
  getUserNameById,
} from "@store/user/users.store";
import { getUserAvatarsLoadingStatus } from "@store/avatar/avatar.store";
import Avatar from "./components/avatar";
import ButtonStyled from "@components/common/buttons/button-styled.button";
import useDialogHandlers from "@hooks/dialog/use-dialog-handlers";

const Profile = () => {
  const [state, setState] = useState({
    avatarUpdatePage: false,
    openDialog: false,
    updateProfilePage: false,
  });

  const user = useSelector(getCurrentUserData());
  console.log("user", user);

  const isUserLoading = useSelector(getUserAvatarsLoadingStatus());
  const currentUserId = useSelector(getCurrentUserId());
  const userNameSelector = useSelector(getUserNameById(user?._id));
  const isUserActivated = user?.isActive;

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
    { name: "Пол", value: user?.gender || "Не задано" },
    { name: "Дата рождения", value: user?.birthday || "Не задано" },
    { name: "Телефон", value: user?.phone || "Не задано" },
  ];

  return (
    <Box sx={{ height: "100vh" }}>
      <HeaderLayout
        title={`Мой профиль: ${
          !isUserLoading ? userNameSelector : "загрузка..."
        }`}
      />
      {isUserActivated ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "4px",
            margin: "10px 0",
          }}
        >
          <CheckCircleOutlineOutlinedIcon
            sx={{ width: "30px", height: "30px", color: "green" }}
          />
          <Typography variant="h4">Почта подтверждена</Typography>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "4px",
            margin: "10px 0",
          }}
        >
          <CancelOutlinedIcon
            sx={{ width: "30px", height: "30px", color: "red" }}
          />
          <Typography variant="h4">Почта не подтверждена</Typography>
          <ButtonStyled
            title="Подтвердить"
            style="MANAGER_TASK"
            variant="contained"
            // onClick={handleOpenUpdateProfilePage}
          />
        </Box>
      )}
      <Avatar state={state} setState={setState} />
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
      <ButtonStyled
        title="Править мой профиль"
        style="OBJECT"
        variant="contained"
        onClick={handleOpenUpdateProfilePage}
      />

      <PageDialogs state={state} setState={setState} />
    </Box>
  );
};

export default Profile;
