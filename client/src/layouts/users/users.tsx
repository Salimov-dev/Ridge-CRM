// libraries
import { useEffect } from "react";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { orderBy } from "lodash";
import { useForm } from "react-hook-form";
// components
import BasicTable from "../../components/common/table/basic-table";
import FiltersPanel from "./components/filter-panel";
import ButtonsBlock from "./components/buttons-block";
import { groupedColumns } from "./table/columns";
// store
import {
  getCurrentUserId,
  getUsersList,
  getUsersLoadingStatus,
} from "../../store/users.store";
// hooks
import useSearchUser from "../../hooks/use-search-user";
import { getUserStatusesList } from "../../store/user-statuses.store";
import LayoutTitle from "../../components/common/page-titles/layout-title";

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
  const users = useSelector(getUsersList());
  const currentUserId = useSelector(getCurrentUserId());
  const statuses = useSelector(getUserStatusesList());
  const columns = groupedColumns;
  const isLoading = useSelector(getUsersLoadingStatus());
  const usersWithoutCurrentUser = users.filter(
    (user) => user._id !== currentUserId
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

  const handleKeyDown = (e) => {
    const keyValue = e.key;
    const isRussianLetter = /^[А-ЯЁа-яё]$/.test(keyValue);
    const isDigit = /^\d$/.test(keyValue);
    const isBackspace = e.keyCode === 8;

    if (!isRussianLetter && !isDigit && !isBackspace) {
      e.preventDefault();
    }
  };

  const getActualUsersList = () => {
    const actualUsersArray = usersWithoutCurrentUser?.map((u) => {
      const foundObject = users?.find((user) => user._id === u._id);
      return foundObject
        ? {
            _id: foundObject._id,
            name: `${foundObject.name.lastName} ${foundObject.name.firstName}`,
          }
        : null;
    });

    const sortedUsers = orderBy(actualUsersArray, ["name"], ["asc"]);

    return sortedUsers;
  };

  const getActualStatusesList = () => {
    const filteredStatuses = usersWithoutCurrentUser?.map(
      (user) => user?.status
    );
    const formateStatusesArray = filteredStatuses?.filter((s) => s !== "");

    const uniqueStatuses = [...new Set(formateStatusesArray)];

    const actualStatusesArray = uniqueStatuses?.map((id) => {
      const foundObject = statuses?.find((obj) => obj._id === id);
      return foundObject
        ? { _id: foundObject._id, name: foundObject.name }
        : null;
    });

    const sortedStatuses = orderBy(actualStatusesArray, ["name"], ["asc"]);

    return sortedStatuses;
  };

  useEffect(() => {
    localStorage.setItem("search-users-data", JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    localStorage.setItem("search-users-data", JSON.stringify(initialState));
  }, []);

  return (
    <Box>
      <LayoutTitle title="Менеджеры"/>
      <ButtonsBlock
        isInputEmpty={isInputEmpty}
        reset={reset}
        initialState={initialState}
      />
      <FiltersPanel
        data={data}
        usersList={getActualUsersList()}
        statusesList={getActualStatusesList()}
        register={register}
        setValue={setValue}
        handleKeyDown={handleKeyDown}
        isLoading={isLoading}
      />
      <BasicTable
        items={searchedUsers}
        itemsColumns={columns}
        isLoading={isLoading}
      />
    </Box>
  );
};

export default Users;
