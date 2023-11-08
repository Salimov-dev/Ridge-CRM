// libraries
import { orderBy } from "lodash";
import { useForm } from "react-hook-form";
import React, { useMemo, useState } from "react";
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
import { objectsColumnsCurator } from "../../columns/objects-columns/objects-columns-curator";
// hooks
import useSearchObjectDatabase from "../../hooks/objects-database/use-search-object-database";
// store
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
};

const ObjectsDatabase = () => {
  const localStorageState = JSON.parse(
    localStorage.getItem("search-objectsdatabase-data")
  );

  const { register, watch, setValue } = useForm({
    defaultValues: Boolean(localStorageState)
      ? localStorageState
      : initialState,
    mode: "onBlur",
  });

  const data = watch();
  const [period, setPeriod] = useState("fromOneMonthToTwo");
  const objects = useSelector(getObjectsList());
  const isLoading = useSelector(getObjectsLoadingStatus());

  const currentUserId = useSelector(getCurrentUserId());
  const isCurator = useSelector(getIsUserCurator(currentUserId));
  const columns = isCurator ? objectsColumnsCurator : objectsColumns;

  const searchedObjects = useSearchObjectDatabase(objects, data, period);
  const sortedObjects = useMemo(() => {
    return orderBy(searchedObjects, ["created_at"], ["desc"]);
  }, [searchedObjects]);

  const handleChangePeriod = (newPeriod) => {
    setPeriod(newPeriod);
  };

  return (
    <Box>
      <LayoutTitle title="Проработка базы объектов" />
      <ChangePeriodsContainer>
        {isCurator && (
          <ObjectsDatabaseFiltersPanel
            data={data}
            objects={objects}
            register={register}
            setValue={setValue}
            isCurator={isCurator}
            isLoading={isLoading}
          />
        )}

        <ChangePeriodButton
          minWidth="320px"
          text="Не звонили от 1мес до 2мес"
          background="DarkGreen"
          backgroundHover="ForestGreen"
          onClick={() => handleChangePeriod("fromOneMonthToTwo")}
        />
        <ChangePeriodButton
          minWidth="320px"
          text="Не звонили от 2мес до 3мес"
          background="DarkOrange"
          backgroundHover="Tomato"
          onClick={() => handleChangePeriod("fromTwoMonthToThree")}
        />
        <ChangePeriodButton
          minWidth="320px"
          text="Не звонили более 3мес"
          background="FireBrick"
          backgroundHover="Crimson"
          onClick={() => handleChangePeriod("fromThreeMonthAndMore")}
        />
      </ChangePeriodsContainer>

      <BasicTable
        items={sortedObjects}
        itemsColumns={columns}
        isLoading={isLoading}
      />

      <ObjectCreatePageDialog />
      <ObjectPageDialog />
      <ObjectUpdatePageDialog />
    </Box>
  );
};

export default ObjectsDatabase;
