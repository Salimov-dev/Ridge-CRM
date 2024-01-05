// libraries
import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
// components
import { usersColumns } from "../../columns/users.columns";
import UsersFiltersPanel from "../../components/UI/filters-panels/users-filters-panel";
import BasicTable from "../../components/common/table/basic-table";
// hooks
import useUsers from "../../hooks/user/use-users";
import useSearchUser from "../../hooks/user/use-search-user";
import HeaderLayout from "../../components/common/page-headers/header-layout";
// store
import {
  getCurrentUserId,
  getUsersList,
  getUsersLoadingStatus,
} from "../../store/user/users.store";
import Buttons from "./components/buttons";
import CreateManager from "@components/pages/user/create-manager";
import UpdateManager from "@components/pages/user/update-manager";
import DialogStyled from "@components/common/dialog/dialog-styled";

const initialState = {
  lastName: "",
  phone: "",
  email: "",
  contract: {
    startDate: "",
    endDate: "",
  },
  gender: "",
  selectedUsers: [],
  selectedStatuses: [],
};

const Users = () => {
  // const columns = usersColumns;
  const isLoading = useSelector(getUsersLoadingStatus());
  const users = useSelector(getUsersList());
  const currentUserId = useSelector(getCurrentUserId());
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
    mode: "onBlur",
  });
  const data = watch();
  const isInputEmpty = JSON.stringify(initialState) !== JSON.stringify(data);

  const searchedUsers = useSearchUser({
    users: usersWithoutCurrentUser,
    data,
  });

  useEffect(() => {
    localStorage.setItem("search-users-data", JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    localStorage.setItem("search-users-data", JSON.stringify(initialState));
  }, []);

  const [state, setState] = useState({
    createManagerPage: false,
    updateManagerPage: false,
    managerId: "",
  });

  // обновление стейта при создании менеджера
  const handleOpenCreatePresentationPage = () => {
    setState((prevState) => ({
      ...prevState,
      createManagerPage: true,
    }));
  };
  const handleCloseCreatePresentationPage = () => {
    setState((prevState) => ({
      ...prevState,
      createManagerPage: false,
    }));
  };

  // обновление стейта при обновлении менеджера
  const handleOpenUpdatePresentationPage = (userId) => {
    setState((prevState) => ({
      ...prevState,
      updateManagerPage: true,
      managerId: userId,
    }));
  };
  const handleCloseUpdatePresentationPage = () => {
    setState((prevState) => ({
      ...prevState,
      updateManagerPage: false,
    }));
  };

  return (
    <Box
      sx={{
        height: "100%",
      }}
    >
      <HeaderLayout title="Менеджеры" />
      <Buttons
        initialState={initialState}
        reset={reset}
        handleOpenCreatePresentationPage={handleOpenCreatePresentationPage}
        isInputEmpty={isInputEmpty}
      />
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
        itemsColumns={usersColumns(handleOpenUpdatePresentationPage)}
        isLoading={isLoading}
      />

      <DialogStyled
        component={
          <CreateManager onClose={handleCloseCreatePresentationPage} />
        }
        onClose={handleCloseCreatePresentationPage}
        open={state.createManagerPage}
        maxWidth="xl"
      />
      <DialogStyled
        component={
          <UpdateManager
            userId={state.managerId}
            onClose={handleCloseUpdatePresentationPage}
          />
        }
        onClose={handleCloseUpdatePresentationPage}
        open={state.updateManagerPage}
        maxWidth="xl"
      />
    </Box>
  );
};

export default Users;
