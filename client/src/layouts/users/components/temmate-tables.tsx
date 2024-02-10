import { useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";
import UsersFiltersPanel from "@components/UI/filters-panels/users-filters-panel";
import TeamTitle from "./team-title";
import BasicTable from "@components/common/table/basic-table";
import { usersColumns } from "@columns/users.columns";
import { getCurrentUserData } from "@store/user/users.store";

const TeamMateTables = ({
  searchedUsers,
  observerUsersWithRole,
  data,
  register,
  setValue,
  isLoading
}) => {
  const currentUserData = useSelector(getCurrentUserData());
  const currentUserName = `${currentUserData?.lastName} ${currentUserData?.firstName} ${currentUserData?.surName}`;
  return (
    <Box sx={{ marginTop: "10px" }}>
      <Box sx={{ marginBottom: "20px" }}>
        <TeamTitle title="Куратор команды" background="red" />
        <Typography variant="h4">{currentUserName}</Typography>
      </Box>

      <TeamTitle title="Мои Наблюдатели" background="blue" />
      <BasicTable
        items={observerUsersWithRole}
        itemsColumns={usersColumns()}
        isLoading={isLoading}
      />

      <TeamTitle title="Мои Менеджеры" background="green" />
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
