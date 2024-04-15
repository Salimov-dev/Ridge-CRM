import React from "react";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";
// components
import BasicTable from "@components/common/table/basic-table";
import RowTitle from "@components/common/titles/row-title";
import AccountInfo from "./account-info.users-layout";
import UsersLayoutFiltersPanel from "@components/UI/filters-panels/users-layout.filters-panel";
// columns
import { usersColumns } from "@columns/users.columns";
// data
import { roleManagerId, roleObserverId } from "@data/users/user-roles";
// hooks
import useDialogHandlers from "@hooks/dialog/use-dialog-handlers";
import useSearchUser from "@hooks/user/use-search-user";
// store
import {
  getCurrentUserId,
  getUsersList,
  getUsersLoadingStatus
} from "@store/user/users.store";

const TeamMateTablesUsersLayout = React.memo(({ data, register, setState }) => {
  const users = useSelector(getUsersList());
  const isLoading = useSelector(getUsersLoadingStatus());
  const { handleOpenUpdateUserPage } = useDialogHandlers(setState);

  const currentUserId = useSelector(getCurrentUserId());

  const usersWithoutCurrentUser = users?.filter(
    (user) => user?._id !== currentUserId
  );

  const observerUsersWithRole = usersWithoutCurrentUser?.filter(
    (user) => user?.role && user?.role.includes(roleObserverId)
  );

  const managerUsersWithRole = usersWithoutCurrentUser?.filter(
    (user) => user?.role && user?.role.includes(roleManagerId)
  );

  const searchedUsers = useSearchUser({
    users: managerUsersWithRole,
    data
  });

  return (
    <Box sx={{ marginTop: "10px" }}>
      <AccountInfo />

      <RowTitle
        title="Мои Менеджеры"
        background="linear-gradient(to right, orange , darkorange)"
      />
      <UsersLayoutFiltersPanel data={data} register={register} />
      <BasicTable
        items={searchedUsers}
        itemsColumns={usersColumns(handleOpenUpdateUserPage)}
        isLoading={isLoading}
      />
      <RowTitle
        title="Мои Наблюдатели"
        background="linear-gradient(to right, SteelBlue , DarkSlateBlue)"
      />
      <BasicTable
        items={observerUsersWithRole}
        itemsColumns={usersColumns(handleOpenUpdateUserPage)}
        isLoading={isLoading}
      />
    </Box>
  );
});

export default TeamMateTablesUsersLayout;
