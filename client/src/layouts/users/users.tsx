// libraries
import { useEffect } from "react";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
// components
import { usersColumns } from "../../columns/users-columns/users-columns";
import UsersFiltersPanel from "../../components/UI/filters-panels/users-filters-panel";
import BasicTable from "../../components/common/table/basic-table";
import AddAndClearFiltersButton from "../../components/common/buttons/add-and-clear-filters-button";
import ManagerCreatePageDialog from "../../components/UI/dialogs/manager-create-page-dialog/manager-create-page-dialog";
import CreateManagerButton from "../../components/UI/dialogs/buttons/create-manager-button";
import ManagerUpdatePageDialog from "../../components/UI/dialogs/manager-create-page-dialog/manager-update-page-dialog";
// hooks
import useUsers from "../../hooks/user/use-users";
import useSearchUser from "../../hooks/user/use-search-user";
import LayoutTitle from "../../components/common/page-titles/layout-title";
// store
import {
  getCurrentUserId,
  getUsersList,
  getUsersLoadingStatus,
} from "../../store/user/users.store";

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
  const columns = usersColumns;
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

  return (
    <Box>
      <LayoutTitle title="Менеджеры" />
      <AddAndClearFiltersButton
        initialState={initialState}
        isInputEmpty={isInputEmpty}
        reset={reset}
        button={<CreateManagerButton />}
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
        itemsColumns={columns}
        isLoading={isLoading}
      />

      <ManagerCreatePageDialog />
      <ManagerUpdatePageDialog />
    </Box>
  );
};

export default Users;
