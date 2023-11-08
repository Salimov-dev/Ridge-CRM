import "dayjs/locale/ru";
import { useForm } from "react-hook-form";
import React, { useEffect } from "react";
import { Box, styled } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
// components
import LayoutTitle from "../../components/common/page-titles/layout-title";
import BasicTable from "../../components/common/table/basic-table";
import PieStyled from "../../components/common/chart/pie";
import ChartLine from "../../components/common/chart/chart-line";
import StaticticsFiltersPanel from "../../components/UI/filters-panels/statictics-filters-panel";
// hooks
import useData from "./hooks/use-data";
import useSearchStatictics from "../../hooks/statictics/use-search-statistics";
// columns
import { staticticsColumns } from "../../columns/statictics/statictics-columns";
import { staticticsColumnsCurator } from "../../columns/statictics/statictics-columns-curator";
// utils
import { getUsersWithoutCurrentUser } from "../../utils/user/get-users-without-current-user";
// store
import { getLastContactsList } from "../../store/last-contact/last-contact.store";
import { setStaticticPositions } from "../../store/statictics/statictics-positions.store";
import {
  getObjectsList,
  getObjectsLoadingStatus,
} from "../../store/object/objects.store";
import {
  getCurrentUserId,
  getIsUserCurator,
  getUsersList,
} from "../../store/user/users.store";
import { staticticsColumnsCuratorReverse } from "../../columns/statictics/statictics-columns-curator-reverse";
import { staticticsColumnsCuratorReverse2 } from "../../columns/statictics/statictics-columns-curator-reverse2";
import { staticticsColumnsReverse } from "../../columns/statictics/statictics-columns-reverse";

const ChartsContainer = styled(Box)`
  display: flex;
  height: 420px;
`;

const initialState = {
  selectedUsers: [],
  selectedPositions: [],
  withoutCurator: false,
};

const Statictics = () => {
  const dispatch = useDispatch();
  const localStorageState = JSON.parse(
    localStorage.getItem("search-statictics-data")
  );

  const { register, watch, setValue, reset } = useForm({
    defaultValues: Boolean(localStorageState)
      ? localStorageState
      : initialState,
    mode: "onBlur",
  });

  const data = watch();
  const selectedPositions = watch("selectedPositions");
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
  const isInputEmpty = JSON.stringify(initialState) !== JSON.stringify(data);

  // const columns = isCurator ? staticticsColumnsCurator : staticticsColumns;
  // const columns = isCurator ? staticticsColumnsCuratorReverse : staticticsColumns;
  const columns = isCurator ? staticticsColumnsCuratorReverse2 : staticticsColumnsReverse;

  const { searchedObjects, searchedUsers } = useSearchStatictics(
    objects,
    users,
    data
  );

  const { chartData, pieData, pieDataWithContacts } = useData(
    searchedObjects,
    lastContacts
  );

  useEffect(() => {
    localStorage.setItem("search-statictics-data", JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    dispatch<any>(setStaticticPositions(selectedPositions));
  }, [selectedPositions]);

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
      {isCurator && (
        <StaticticsFiltersPanel
          data={data}
          objects={objects}
          initialState={initialState}
          objectsWithoutCurrentUser={objectsWithoutCurrentUser}
          withoutCurator={withoutCurator}
          register={register}
          reset={reset}
          setValue={setValue}
          isInputEmpty={isInputEmpty}
          isLoading={isObjectsLoading}
        />
      )}

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
