// libraries
import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
// components
import { usersColumns } from "@columns/users.columns";
import UsersFiltersPanel from "@components/UI/filters-panels/users-filters-panel";
import BasicTable from "@components/common/table/basic-table";
import Buttons from "./components/buttons";
import PageDialogs from "@components/common/dialog/page-dialogs";
import HeaderLayout from "@components/common/page-headers/header-layout";
import TeamTitle from "./components/team-title";
// hooks
import useUsers from "@hooks/user/use-users";
import useSearchUser from "@hooks/user/use-search-user";
import useDialogHandlers from "@hooks/dialog/use-dialog-handlers";
// store
import {
  getCurrentUserData,
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
  const currentUserData = useSelector(getCurrentUserData());
  const currentUserName = `${currentUserData?.lastName} ${currentUserData?.firstName} ${currentUserData?.surName}`;

  const userRoleManager = "69gfoep3944jgjdso345002";
  const userRoleObserver = "69dgp34954igfj345043001";

  const usersWithoutCurrentUser = users?.filter(
    (user) => user?._id !== currentUserId
  );

  const { getActualUsersList, getActualStatusesList } = useUsers(
    users,
    usersWithoutCurrentUser
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
      <Buttons
        initialState={initialState}
        reset={reset}
        onOpenCreateUserPage={handleOpenCreateUserPage}
        isInputEmpty={isInputEmpty}
      />

      <Box sx={{ marginTop: "20px" }}>
        <TeamTitle title="Куратор" background="red" />
        <Typography variant="h4">{currentUserName}</Typography>

        <TeamTitle title="Мои Наблюдатели" background="red" />
        <BasicTable
          items={observerUsersWithRole}
          itemsColumns={usersColumns()}
          isLoading={isLoading}
        />

        <TeamTitle title="Мои Менеджеры" background="red" />
        <UsersFiltersPanel
          data={data}
          users={getActualUsersList()}
          statuses={getActualStatusesList()}
          register={register}
          setValue={setValue}
          isLoading={isLoading}
        />
        <BasicTable
          items={searchedUsers}
          itemsColumns={usersColumns()}
          isLoading={isLoading}
        />
      </Box>

      <PageDialogs state={state} setState={setState} />
    </Box>
  );
};

export default Users;
