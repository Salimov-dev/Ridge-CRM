// libraries
import { orderBy } from "lodash";
import { useForm } from "react-hook-form";
import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Box, styled } from "@mui/material";
// components
import LayoutTitle from "../../components/common/page-titles/layout-title";
import BasicTable from "../../components/common/table/basic-table";
import ObjectCreatePageDialog from "../../components/UI/dialogs/objects/object-create-page-dialog";
import ObjectPageDialog from "../../components/UI/dialogs/object-page-dialog/object-page-dialog";
import ObjectUpdatePageDialog from "../../components/UI/dialogs/objects/object-update-page-dialog";
import ChangePeriodButton from "./components/change-period-button";
import ObjectsDatabaseFiltersPanel from "../../components/UI/filters-panels/objectsdatabase-filters-panel";
// columns
import { objectsColumns } from "../../columns/objects-columns/objects-columns";
import { objectsColumnsCuratorSimple } from "../../columns/objects-columns/objects-columns-curator-simple";
// hooks
import useSearchObjectDatabase from "../../hooks/objects-database/use-search-object-database";
// store
import { getObjectsStatusList } from "../../store/object-params/object-status.store";
import {
  getObjectsList,
  getObjectsLoadingStatus,
} from "../../store/object/objects.store";
import {
  getCurrentUserId,
  getIsUserCurator,
} from "../../store/user/users.store";

const ChangePeriodsContainer = styled(Box)`
  width: 100%;
  margin-bottom: 10px;
  display: flex;
  gap: 6px;
  align-items: top;
  justify-content: space-between;
`;

const initialState = {
  selectedUsers: [],
  selectedStatuses: [],
};

const ObjectsDatabase = React.memo(() => {
  const localStorageState = JSON.parse(
    localStorage.getItem("search-objectsdatabase-data")
  );

  const { register, watch, reset, setValue } = useForm({
    defaultValues: Boolean(localStorageState)
      ? localStorageState
      : initialState,
    mode: "onBlur",
  });

  const data = watch();
  const [period, setPeriod] = useState("fromOneMonthToTwo");
  const objects = useSelector(getObjectsList());
  const objectStatuses = useSelector(getObjectsStatusList());
  const isLoading = useSelector(getObjectsLoadingStatus());
  const isInputEmpty = JSON.stringify(initialState) !== JSON.stringify(data);

  const currentUserId = useSelector(getCurrentUserId());
  const isCurator = useSelector(getIsUserCurator(currentUserId));
  const columns = isCurator ? objectsColumnsCuratorSimple : objectsColumns;

  const searchedObjects = useSearchObjectDatabase(objects, data, period);
  const sortedObjects = useMemo(() => {
    return orderBy(searchedObjects, ["created_at"], ["desc"]);
  }, [searchedObjects]);

  let filteredObjects = sortedObjects;
  if (data.selectedUsers?.length) {
    filteredObjects = filteredObjects?.filter((obj) => data.selectedUsers.includes(obj.userId));
  }
  if (data.selectedStatuses?.length) {
    filteredObjects = filteredObjects?.filter((obj) =>
      data.selectedStatuses.includes(obj.status)
    );
  }

  const handleChangePeriod = (newPeriod) => {
    setPeriod(newPeriod);
  };

  useEffect(() => {
    localStorage.setItem("search-objectsdatabase-data", JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    const hasLocalStorageData = localStorage.getItem(
      "search-objectsdatabase-data"
    );

    if (hasLocalStorageData?.length) {
      localStorage.setItem(
        "search-objectsdatabase-data",
        JSON.stringify(initialState)
      );
    }
  }, []);

  return (
    <Box>
      <LayoutTitle title="Проработка базы объектов" />
      <ObjectsDatabaseFiltersPanel
        data={data}
        objects={sortedObjects}
        statuses={objectStatuses}
        register={register}
        reset={reset}
        setValue={setValue}
        initialState={initialState}
        isCurator={isCurator}
        isLoading={isLoading}
        isInputEmpty={isInputEmpty}
      />
      <ChangePeriodsContainer>
        <ChangePeriodButton
          minWidth="320px"
          text="Не звонили от 1мес до 2мес"
          background="DarkGreen"
          backgroundHover="ForestGreen"
          border={
            period === "fromOneMonthToTwo" ? "3px solid yellow" : "inherit"
          }
          onClick={() => handleChangePeriod("fromOneMonthToTwo")}
        />
        <ChangePeriodButton
          minWidth="320px"
          text="Не звонили от 2мес до 3мес"
          background="OrangeRed"
          backgroundHover="Tomato"
          border={
            period === "fromTwoMonthToThree" ? "3px solid yellow" : "inherit"
          }
          onClick={() => handleChangePeriod("fromTwoMonthToThree")}
        />
        <ChangePeriodButton
          minWidth="320px"
          text="Не звонили более 3мес"
          background="FireBrick"
          backgroundHover="Crimson"
          border={
            period === "fromThreeMonthAndMore" ? "3px solid yellow" : "inherit"
          }
          onClick={() => handleChangePeriod("fromThreeMonthAndMore")}
        />
      </ChangePeriodsContainer>

      <BasicTable
        items={filteredObjects}
        itemsColumns={columns}
        isLoading={isLoading}
      />

      <ObjectCreatePageDialog />
      <ObjectPageDialog />
      <ObjectUpdatePageDialog />
    </Box>
  );
});

export default ObjectsDatabase;
