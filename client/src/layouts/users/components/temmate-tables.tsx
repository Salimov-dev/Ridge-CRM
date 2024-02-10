import UsersFiltersPanel from "@components/UI/filters-panels/users-filters-panel";
import { Box, Typography } from "@mui/material";
import TeamTitle from "./team-title";
import BasicTable from "@components/common/table/basic-table";
import { usersColumns } from "@columns/users.columns";
import { useSelector } from "react-redux";
import { getCurrentUserData } from "@store/user/users.store";
import Buttons from "./buttons";

const TeamMateTables = ({
  searchedUsers,
  observerUsersWithRole,
  data,
  initialState,
  register,
  reset,
  setValue,
  isLoading,
  isInputEmpty,
  onOpenCreateUserPage
}) => {
  const currentUserData = useSelector(getCurrentUserData());
  const currentUserName = `${currentUserData?.lastName} ${currentUserData?.firstName} ${currentUserData?.surName}`;
  return (
    <Box sx={{ marginTop: "20px" }}>
      <Buttons
        initialState={initialState}
        reset={reset}
        onOpenCreateUserPage={onOpenCreateUserPage}
        isInputEmpty={isInputEmpty}
      />
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
};

export default TeamMateTables;
