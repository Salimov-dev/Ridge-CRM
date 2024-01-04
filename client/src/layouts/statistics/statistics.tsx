import "dayjs/locale/ru";
import { useForm } from "react-hook-form";
import React, { useEffect } from "react";
import { Box, styled } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
// components
import HeaderLayout from "../../components/common/page-headers/header-layout";
import BasicTable from "../../components/common/table/basic-table";
import PieStyled from "../../components/common/chart/pie";
import ChartLine from "../../components/common/chart/chart-line";
import StaticticsFiltersPanel from "../../components/UI/filters-panels/statictics-filters-panel";
// hooks
import useData from "./hooks/use-data";
import useSearchStatictics from "../../hooks/statictics/use-search-statistics";
// columns
import { staticticsColumnsCurator } from "../../columns/statictics-columns/statictics-columns-curator";
import { staticticsColumns } from "../../columns/statictics-columns/statictics-columns";
// utils
import { getUsersWithoutCurrentUser } from "../../utils/user/get-users-without-current-user";
// store
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

const Component = styled(Box)`
  margin-bottom: 150px;
`;

const ChartsContainer = styled(Box)`
  display: flex;
  height: 420px;
`;

const initialState = {
  selectedUsers: [],
  selectedPositions: [],
  withoutCurator: false,
};

const Statictics = React.memo(() => {
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

  const isObjectsLoading = useSelector(getObjectsLoadingStatus());
  const isInputEmpty = JSON.stringify(initialState) !== JSON.stringify(data);

  const columns = isCurator ? staticticsColumnsCurator : staticticsColumns;

  const { searchedObjects, searchedUsers } = useSearchStatictics(
    objects,
    users,
    data
  );

  const { chartData, pieData } = useData(searchedObjects);

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
    <Component>
      <HeaderLayout title="Статистика" />
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
        <PieStyled data={pieData} />
      </ChartsContainer>

      <BasicTable
        items={searchedUsers}
        itemsColumns={columns}
        hasFooter={isCurator && true}
        isLoading={isObjectsLoading}
        isPaginate={false}
      />
    </Component>
  );
});

export default Statictics;
