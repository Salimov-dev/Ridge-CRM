import "dayjs/locale/ru";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { Box, styled } from "@mui/material";
import { useSelector } from "react-redux";
// components
import LayoutTitle from "../../components/common/page-titles/layout-title";
import BasicTable from "../../components/common/table/basic-table";
import PieStyled from "../../components/common/chart/pie";
import ChartLine from "../../components/common/chart/chart-line";
import StaticticsFiltersPanel from "../../components/UI/filters-panels/statictics-filters-panel";
// hooks
import useData from "./hooks/use-data";
import useSearchStatictics from "../../hooks/statictics/use-search-statistics";
// store
import {
  getObjectsList,
  getObjectsLoadingStatus,
} from "../../store/object/objects.store";
import {
  getCurrentUserId,
  getIsUserCurator,
  getUsersList,
} from "../../store/user/users.store";
import { getLastContactsList } from "../../store/last-contact/last-contact.store";
// columns
import { resultMyColumnsCurator } from "../../columns/result-my-columns/result-my-columns-curator";
import { resultMyColumns } from "../../columns/result-my-columns/result-my-columns";
// utils
import { getUsersWithoutCurrentUser } from "../../utils/user/get-users-without-current-user";

const ChartsContainer = styled(Box)`
  display: flex;
  height: 420px;
`;

const initialState = {
  selectedUsers: [],
  withoutCurator: false,
};

const Statictics = () => {
  const localStorageState = JSON.parse(
    localStorage.getItem("search-statictics-data")
  );

  const { register, watch, setValue } = useForm({
    defaultValues: Boolean(localStorageState)
      ? localStorageState
      : initialState,
    mode: "onBlur",
  });

  const data = watch();
  const withoutCurator = watch("withoutCurator");

  const usersList = useSelector(getUsersList());
  const usersWithoutCurrentUser = getUsersWithoutCurrentUser();

  const currentUserId = useSelector(getCurrentUserId());
  const isCurator = useSelector(getIsUserCurator(currentUserId));

  const users = isCurator
    ? withoutCurator
      ? usersWithoutCurrentUser
      : usersList
    : usersWithoutCurrentUser;

  const objectsList = useSelector(getObjectsList());
  const objectsWithoutCurrentUser = objectsList?.filter(
    (obj) => obj?.userId !== currentUserId
  );
  const objects = withoutCurator ? objectsWithoutCurrentUser : objectsList;

  const lastContacts = useSelector(getLastContactsList());
  const isObjectsLoading = useSelector(getObjectsLoadingStatus());

  const columns = isCurator ? resultMyColumnsCurator : resultMyColumns;

  const {searchedObjects, searchedUsers} = useSearchStatictics(objects, users, data);

  const { chartData, pieData, pieDataWithContacts } = useData(
    searchedObjects,
    lastContacts
  );

  useEffect(() => {
    localStorage.setItem("search-statictics-data", JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    const hasLocalStorageData = localStorage.getItem("search-statictics-data");

    if (hasLocalStorageData?.length) {
      localStorage.setItem(
        "search-statictics-data",
        JSON.stringify(initialState)
      );
    }
  }, []);

  return (
    <>
      <LayoutTitle title="Статистика" />
      <StaticticsFiltersPanel
        data={data}
        objects={objects}
        objectsWithoutCurrentUser={objectsWithoutCurrentUser}
        withoutCurator={withoutCurator}
        register={register}
        setValue={setValue}
        isCurator={isCurator}
        isLoading={isObjectsLoading}
      />

      <ChartsContainer>
        <ChartLine data={chartData} />
        <PieStyled data={pieDataWithContacts} />
        <PieStyled data={pieData} />
      </ChartsContainer>

      <Box>
        <BasicTable
          items={searchedUsers}
          itemsColumns={columns}
          isLoading={isObjectsLoading}
          isPaginate={false}
        />
      </Box>
    </>
  );
};

export default Statictics;
