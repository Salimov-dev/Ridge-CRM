import React from "react";
import { Box } from "@mui/material";
// components
import UsersFiltersPanel from "@components/UI/filters-panels/users-filters-panel";
import BasicTable from "@components/common/table/basic-table";
import RowTitle from "@components/common/titles/row-title";
import AccountInfo from "./account-info";
// columns
import { usersColumns } from "@columns/users.columns";

const TeamMateTables = React.memo(
  ({
    searchedUsers,
    observerUsersWithRole,
    data,
    register,
    setValue,
    isLoading,
    onOpenUpdateUserPage
  }) => {
    return (
      <Box sx={{ marginTop: "10px" }}>
        <AccountInfo />

        <RowTitle
          title="Мои Менеджеры"
          background="linear-gradient(to right, orange , darkorange)"
        />
        <UsersFiltersPanel
          data={data}
          register={register}
          setValue={setValue}
          isLoading={isLoading}
        />
        <BasicTable
          items={searchedUsers}
          itemsColumns={usersColumns(onOpenUpdateUserPage)}
          isLoading={isLoading}
        />
        <RowTitle
          title="Мои Наблюдатели"
          background="linear-gradient(to right, SteelBlue , DarkSlateBlue)"
        />
        <BasicTable
          items={observerUsersWithRole}
          itemsColumns={usersColumns(onOpenUpdateUserPage)}
          isLoading={isLoading}
        />
      </Box>
    );
  }
);

export default TeamMateTables;
