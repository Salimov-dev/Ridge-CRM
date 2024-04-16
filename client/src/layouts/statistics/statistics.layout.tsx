import "dayjs/locale/ru";
import { useForm } from "react-hook-form";
import React, { useEffect } from "react";
import { Box, styled } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
// components
import HeaderLayout from "@components/common/page-headers/header-layout";
import BasicTable from "@components/common/table/basic-table";
import PieStyled from "@components/common/chart/pie";
import ChartLine from "@components/common/chart/chart-line";
import { ContainerStyled } from "@components/common/container/container-styled";
import StaticticsLayoutFiltersPanel from "@components/UI/filters-panels/statictics-layout.filters-panel";
// initial-states
import { statisticsLayoutInitialState } from "@initial-states/layouts/statistics-layout.initial-state";
// hooks
import useSearchStatictics from "@hooks/statictics/use-search-statistics";
import useChartsStatisticsData from "@hooks/statictics/use-charts-statistics-data";
// columns
import { staticticsColumnsCurator } from "@columns/statictics-columns/statictics-columns-curator";
import { staticticsColumns } from "@columns/statictics-columns/statictics-columns";
// utils
import { getUsersWithoutCurrentUser } from "@utils/user/get-users-without-current-user";
import { getActualUsersList } from "@utils/actual-items/get-actual-users-list";
// store
import { setStaticticPositions } from "@store/statictics/statictics-positions.store";
import {
  getObjectsList,
  getObjectsLoadingStatus
} from "@store/object/objects.store";
import {
  getCurrentUserData,
  getCurrentUserId,
  getIsCurrentUserRoleCurator,
  getUsersList
} from "@store/user/users.store";

const ChartsContainer = styled(Box)`
  display: flex;
  height: 420px;
`;

const StaticticsLayout = React.memo(() => {
  const dispatch = useDispatch();
  const localStorageState = JSON.parse(
    localStorage.getItem("search-statictics-data")
  );

  const { watch, setValue, reset } = useForm({
    defaultValues: Boolean(localStorageState)
      ? localStorageState
      : statisticsLayoutInitialState,
    mode: "onBlur"
  });

  const data = watch();
  const selectedPositions = watch("selectedPositions");
  const withoutCuratorSwitch = watch("withoutCuratorSwitch");

  const currentUserId = useSelector(getCurrentUserId());
  const isCurrentUserRoleCurator = useSelector(getIsCurrentUserRoleCurator());
  const isObjectsLoading = useSelector(getObjectsLoadingStatus());

  const objectsList = useSelector(getObjectsList());
  const objectsWithoutCurrentUser = objectsList?.filter(
    (obj) => obj?.userId !== currentUserId
  );
  const objects = withoutCuratorSwitch
    ? objectsWithoutCurrentUser
    : objectsList;

  const usersList = useSelector(getUsersList());
  const usersWithoutCurrentUser = getUsersWithoutCurrentUser();
  const currentUserData = useSelector(getCurrentUserData());
  const users = isCurrentUserRoleCurator
    ? withoutCuratorSwitch
      ? usersWithoutCurrentUser
      : usersList
    : usersWithoutCurrentUser;
  const actualUsersList = getActualUsersList(
    withoutCuratorSwitch ? objectsWithoutCurrentUser : objects
  );

  const columns = isCurrentUserRoleCurator
    ? staticticsColumnsCurator
    : staticticsColumns;

  const { searchedObjects, searchedUsers } = useSearchStatictics(
    objects,
    users,
    data
  );

  const { chartData, pieData } = useChartsStatisticsData(searchedObjects);

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
        JSON.stringify(statisticsLayoutInitialState)
      );
    }
  }, []);

  return (
    <ContainerStyled>
      <HeaderLayout title="Статистика" />
      <StaticticsLayoutFiltersPanel
        data={data}
        usersList={actualUsersList}
        reset={reset}
        setValue={setValue}
      />
      <ChartsContainer>
        <ChartLine data={chartData} />
        <PieStyled data={pieData} />
      </ChartsContainer>
      <BasicTable
        items={isCurrentUserRoleCurator ? searchedUsers : [currentUserData]}
        itemsColumns={columns}
        hasFooter={isCurrentUserRoleCurator && true}
        isLoading={isObjectsLoading}
        isPaginate={false}
      />
    </ContainerStyled>
  );
});

export default StaticticsLayout;
