// libraries
import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
// components
import { usersColumns } from "../../columns/users-columns/users-columns";
import UsersFiltersPanel from "../../components/UI/filters-panels/users-filters-panel";
import BasicTable from "../../components/common/table/basic-table";
// hooks
import useSearchUser from "../../hooks/user/use-search-user";
import LayoutTitle from "../../components/common/page-titles/layout-title";
// store
import {
  getCurrentUserId,
  getUsersList,
  getUsersLoadingStatus,
} from "../../store/user/users.store";
import AddAndClearFiltersButton from "../../components/common/buttons/add-and-clear-filters-button";
import DialogStyled from "../../components/common/dialog/dialog-styled";
import UpdateManager from "../../components/pages/update-manager/update-manager";
import CreateManager from "../../components/pages/create-manager/create-manager";
import {
  loadUpdateManagerOpenState,
  setUpdateManagerOpenState,
} from "../../store/user/update-user.store";
import useUsers from "../../hooks/user/use-users";

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
  const [openCreate, setOpenCreate] = useState(false);
  const columns = usersColumns;
  const isLoading = useSelector(getUsersLoadingStatus());
  const isOpenUpdate = useSelector(loadUpdateManagerOpenState());

  const users = useSelector(getUsersList());
  const currentUserId = useSelector(getCurrentUserId());
  const usersWithoutCurrentUser = users.filter(
    (user) => user._id !== currentUserId
  );

  const {
    getActualUsersList,
    getActualStatusesList,
    handleOpenCreate,
    handleCloseCreate,
    handleCloseUpdate,
  } = useUsers(
    setOpenCreate,
    setUpdateManagerOpenState,
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

  return (
    <Box>
      <LayoutTitle title="Менеджеры" />
      <AddAndClearFiltersButton
        title="Добавить менеджера"
        isInputEmpty={isInputEmpty}
        reset={reset}
        initialState={initialState}
        disabled={isLoading}
        onOpen={handleOpenCreate}
      />
      <UsersFiltersPanel
        data={data}
        usersList={getActualUsersList()}
        statusesList={getActualStatusesList()}
        register={register}
        setValue={setValue}
        isLoading={isLoading}
      />
      <BasicTable
        items={searchedUsers}
        itemsColumns={columns}
        isLoading={isLoading}
      />

      <DialogStyled
        component={<CreateManager onClose={handleCloseCreate} />}
        onClose={handleCloseCreate}
        open={openCreate}
        maxWidth="lg"
      />

      <DialogStyled
        component={<UpdateManager onClose={handleCloseUpdate} />}
        onClose={handleCloseUpdate}
        open={isOpenUpdate}
        maxWidth="lg"
      />
    </Box>
  );
};

export default Users;
