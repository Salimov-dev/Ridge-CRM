// libraries
import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import styled from "@emotion/styled";
import { useForm } from "react-hook-form";
// components
import PageDialogs from "@components/common/dialog/page-dialogs";
import HeaderLayout from "@components/common/page-headers/header-layout";
import TeamMateTables from "./components/temmate-tables";
import InformItems from "./components/inform-items";
import Buttons from "./components/buttons";
// hooks
import useSearchUser from "@hooks/user/use-search-user";
import useDialogHandlers from "@hooks/dialog/use-dialog-handlers";
// store
import {
  getCurrentUserId,
  getUsersList,
  getUsersLoadingStatus
} from "@store/user/users.store";

const Component = styled(Box)`
  height: 100%;
`;

const initialState = {
  lastName: "",
  phone: "",
  email: "",
  gender: "",
  selectedUsers: [],
  selectedStatuses: []
};

const Users = React.memo(() => {
  const [state, setState] = useState({
    createUserPage: false,
    makePaymentPage: false,
    updateUserPage: false,
    userId: ""
  });

  const localStorageState = JSON.parse(
    localStorage.getItem("search-users-data")
  );
  const { register, watch, setValue, reset } = useForm({
    defaultValues: localStorageState || initialState,
    mode: "onBlur"
  });
  const data = watch();

  const users = useSelector(getUsersList());

  const currentUserId = useSelector(getCurrentUserId());

  const isLoading = useSelector(getUsersLoadingStatus());
  const isInputEmpty = JSON.stringify(initialState) !== JSON.stringify(data);

  const userRoleManager = "69gfoep3944jgjdso345002";
  const userRoleObserver = "69dgp34954igfj345043001";

  const {
    handleOpenCreateUserPage,
    handleOpenMakePaymentPage,
    handleOpenUpdateUserPage
  } = useDialogHandlers(setState);

  const usersWithoutCurrentUser = users?.filter(
    (user) => user?._id !== currentUserId
  );

  const observerUsersWithRole = usersWithoutCurrentUser?.filter(
    (user) => user?.role && user?.role.includes(userRoleObserver)
  );
  const managerUsersWithRole = usersWithoutCurrentUser?.filter(
    (user) => user?.role && user?.role.includes(userRoleManager)
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

  return (
    <Component>
      <HeaderLayout title="Моя команда" />
      <Buttons
        initialState={initialState}
        reset={reset}
        onOpenCreateUserPage={handleOpenCreateUserPage}
        onOpenMakePaymentPage={handleOpenMakePaymentPage}
        isInputEmpty={isInputEmpty}
      />
      <InformItems />

      <TeamMateTables
        searchedUsers={searchedUsers}
        observerUsersWithRole={observerUsersWithRole}
        data={data}
        register={register}
        setValue={setValue}
        isLoading={isLoading}
        onOpenUpdateUserPage={handleOpenUpdateUserPage}
      />

      <PageDialogs state={state} setState={setState} />
    </Component>
  );
});

export default Users;
