// libraries
import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
// components
import Buttons from "./components/buttons";
import PageDialogs from "@components/common/dialog/page-dialogs";
import HeaderLayout from "@components/common/page-headers/header-layout";
import TeamMateTables from "./components/temmate-tables";
// hooks
import useSearchUser from "@hooks/user/use-search-user";
import useDialogHandlers from "@hooks/dialog/use-dialog-handlers";
// store
import {
  getCurrentUserId,
  getUsersList,
  getUsersLoadingStatus
} from "@store/user/users.store";

const initialState = {
  lastName: "",
  phone: "",
  email: "",
  gender: "",
  selectedUsers: [],
  selectedStatuses: []
};

const Users = () => {
  const isLoading = useSelector(getUsersLoadingStatus());
  const users = useSelector(getUsersList());

  const currentUserId = useSelector(getCurrentUserId());

  const userRoleManager = "69gfoep3944jgjdso345002";
  const userRoleObserver = "69dgp34954igfj345043001";

  const usersWithoutCurrentUser = users?.filter(
    (user) => user?._id !== currentUserId
  );

  const localStorageState = JSON.parse(
    localStorage.getItem("search-users-data")
  );
  const { register, watch, setValue, reset } = useForm({
    defaultValues: localStorageState || initialState,
    mode: "onBlur"
  });

  const data = watch();
  const isInputEmpty = JSON.stringify(initialState) !== JSON.stringify(data);

  const observerUsersWithRole = usersWithoutCurrentUser.filter(
    (user) => user.role && user.role.includes(userRoleObserver)
  );
  const managerUsersWithRole = usersWithoutCurrentUser.filter(
    (user) => user.role && user.role.includes(userRoleManager)
  );

  const searchedUsers = useSearchUser({
    users: managerUsersWithRole,
    data
  });

  useEffect(() => {
    localStorage.setItem("search-users-data", JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    localStorage.setItem("search-users-data", JSON.stringify(initialState));
  }, []);

  const [state, setState] = useState({
    createManagerPage: false,
    createObserverPage: false
  });

  const { handleOpenCreateUserPage } = useDialogHandlers(setState);

  return (
    <Box
      sx={{
        height: "100%"
      }}
    >
      <HeaderLayout title="Моя команда" />
      <Typography>Баланс: 550руб</Typography>

      <Typography>Тип аккаунта: Демо-доступ</Typography>
      <Typography>Дата блокировки: 22.03.24</Typography>
      <Typography>Дней до блокировки: 14 дней</Typography>
      <Typography>Количество активных пользователей: 4шт</Typography>
      <Typography>
        Стоимость пользования за 1 сутки (за все лицензии): 100руб (25руб за 1
        пользователя)
      </Typography>

      {/* <Buttons
        initialState={initialState}
        reset={reset}
        onOpenCreateUserPage={handleOpenCreateUserPage}
        isInputEmpty={isInputEmpty}
      /> */}
      <TeamMateTables
        searchedUsers={searchedUsers}
        observerUsersWithRole={observerUsersWithRole}
        data={data}
        initialState={initialState}
        register={register}
        reset={reset}
        setValue={setValue}
        isLoading={isLoading}
        isInputEmpty={isInputEmpty}
        onOpenCreateUserPage={handleOpenCreateUserPage}
      />

      <PageDialogs state={state} setState={setState} />
    </Box>
  );
};

export default Users;
