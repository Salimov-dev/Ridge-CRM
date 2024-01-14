// libraries
import { orderBy } from "lodash";
import { useForm } from "react-hook-form";
import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Box, Typography, styled } from "@mui/material";
// components
import Loader from "@components/common/loader/loader";
import HeaderLayout from "@components/common/page-headers/header-layout";
import BasicTable from "@components/common/table/basic-table";
import ChangePeriodButton from "./components/change-period-button";
import ObjectsDatabaseFiltersPanel from "@components/UI/filters-panels/objectsdatabase-filters-panel";
import PageDialogs from "@components/common/dialog/page-dialogs";
// columns
import { objectsColumns } from "@columns/objects.columns";
// hooks
import useSearchObjectDatabase from "@hooks/objects-database/use-search-object-database";
import useDialogHandlers from "@hooks/dialog/use-dialog-handlers";
// store
import { getObjectsStatusList } from "@store/object-params/object-status.store";
import { getCurrentUserId, getIsUserCurator } from "@store/user/users.store";
import {
  getObjectsList,
  getObjectsLoadingStatus,
} from "@store/object/objects.store";

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
  const [state, setState] = useState({
    objectPage: false,
    createPage: false,
    updatePage: false,
    objectId: null,
  });

  const { handleOpenObjectPage } = useDialogHandlers(setState);

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

  const { searchedObjects, filteredObjects } = useSearchObjectDatabase(
    objects,
    data,
    period
  );
  const sortedObjects = useMemo(() => {
    return orderBy(searchedObjects, ["created_at"], ["asc"]);
  }, [searchedObjects]);

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
    <>
      <HeaderLayout title="Проработка базы объектов" />
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
        <Box sx={{ display: "flex", alignItems: "center", minWidth: "200px" }}>
          <Typography>Не было звонков (месяцев):</Typography>
        </Box>
        <ChangePeriodButton
          text="от 1 до 2"
          period={period}
          selectedPeriod="fromOneMonthToTwo"
          onChangePeriod={handleChangePeriod}
        />
        <ChangePeriodButton
          text="от 2 до 3"
          period={period}
          selectedPeriod="fromTwoMonthToThree"
          onChangePeriod={handleChangePeriod}
        />
        <ChangePeriodButton
          text="более 3"
          period={period}
          selectedPeriod="fromThreeMonthAndMore"
          onChangePeriod={handleChangePeriod}
        />
      </ChangePeriodsContainer>

      <ChangePeriodsContainer>
        <Box sx={{ display: "flex", alignItems: "center", minWidth: "200px" }}>
          <Typography>Надо позвонить (месяцев):</Typography>
        </Box>
        <ChangePeriodButton
          text="До одного месяца"
          period={period}
          selectedPeriod="beforeOneMonth"
          onChangePeriod={handleChangePeriod}
        />
        <ChangePeriodButton
          text="через 1 и до 2"
          period={period}
          selectedPeriod="afterOneMonthUpToTwo"
          onChangePeriod={handleChangePeriod}
        />
        <ChangePeriodButton
          text="через 2 и до 3"
          period={period}
          selectedPeriod="afterTwoMonthUpToThree"
          onChangePeriod={handleChangePeriod}
        />
        <ChangePeriodButton
          text="через 3 и более"
          period={period}
          selectedPeriod="afterThreeMonthAndMore"
          onChangePeriod={handleChangePeriod}
        />
        <ChangePeriodButton
          text="без следующего звонка"
          period={period}
          selectedPeriod="withouNextCall"
          onChangePeriod={handleChangePeriod}
        />
      </ChangePeriodsContainer>

      {!isLoading ? (
        <BasicTable
          items={filteredObjects}
          itemsColumns={objectsColumns(handleOpenObjectPage, isCurator)}
          isLoading={isLoading}
        />
      ) : (
        <Loader height="300px" />
      )}

      <PageDialogs state={state} setState={setState} />
    </>
  );
});

export default ObjectsDatabase;
