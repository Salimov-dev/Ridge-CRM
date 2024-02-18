import { useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";
import UsersFiltersPanel from "@components/UI/filters-panels/users-filters-panel";
import BasicTable from "@components/common/table/basic-table";
import { usersColumns } from "@columns/users.columns";
import { getCurrentUserData } from "@store/user/users.store";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import React from "react";
import RowTitle from "@components/common/titles/row-title";

const StyledLink = styled(Link)({
  textDecoration: "none",
  color: "inherit",
  borderBottom: "1px solid transparent",
  transition: "border-bottom-color 0.3s",

  // Добавляем подчеркивание при наведении на ссылку
  "&:hover": {
    borderBottomColor: "#000", // Цвет подчеркивания при наведении
    color: "yellow",
    textDecoration: "underline"
  }
});

const TeamMateTables = React.memo(
  ({
    searchedUsers,
    observerUsersWithRole,
    data,
    register,
    setValue,
    isLoading
  }) => {
    const currentUserData = useSelector(getCurrentUserData());
    const currentUserName = `${currentUserData?.lastName} ${currentUserData?.firstName} ${currentUserData?.surName}`;
    const isUserNameFilledUp = currentUserName?.includes(null);

    return (
      <Box sx={{ marginTop: "10px" }}>
        <Box sx={{ marginBottom: "20px" }}>
          <RowTitle title="Куратор команды" background="red" />

          {!isUserNameFilledUp ? (
            <Typography variant="h4">{currentUserName}</Typography>
          ) : (
            <Box sx={{ width: "fit-content" }}>
              <StyledLink to="/profile">
                <Typography variant="h4">Заполните свой Профиль</Typography>
              </StyledLink>
            </Box>
          )}
        </Box>

        <RowTitle title="Мои Наблюдатели" background="blue" />
        <BasicTable
          items={observerUsersWithRole}
          itemsColumns={usersColumns()}
          isLoading={isLoading}
        />

        <RowTitle title="Мои Менеджеры" background="green" />
        <UsersFiltersPanel
          data={data}
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
    );
  }
);

export default TeamMateTables;
