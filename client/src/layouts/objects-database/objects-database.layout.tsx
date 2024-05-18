// libraries
import { useForm } from "react-hook-form";
import React, { useState } from "react";
import { useSelector } from "react-redux";
// components
import DialogPages from "@dialogs/dialog-pages";
import HeaderForLayout from "@components/common/headers/header-for-layout";
import BasicTable from "@components/common/table/basic-table";
import { ContainerStyled } from "@components/common/container/container-styled";
import ObjectsDatabaseLayoutFiltersPanel from "@components/UI/filters-panels/objects-database-layout.filters-panel";
import TitleObjectsQuantityObjectsDatabaseLayout from "./components/title-objects-quantity.objects-database-layout";
import NoCallsControlPanelObjectsDatabase from "./components/no-calls-control-panel.objects-database-layout";
import NeedToCallsControlPanelObjectsDatabase from "./components/need-to-calls-control-panel.objects-database-layout";
// initial-states
import { objectsDatabaseLayoutInitialState } from "@initial-states/layouts/objects-database-layout.initial-state";
import { dialogePagesState } from "@initial-states/dialog-pages-state/dialog-pages.state";
// columns
import { objectsDatabaseColumns } from "@columns/objects-database.columns";
// hooks
import useSearchObjectDatabase from "@hooks/objects-database/use-search-object-database";
// store
import { getIsCurrentUserRoleManager } from "@store/user/users.store";
import {
  getObjectsList,
  getObjectsLoadingStatus
} from "@store/object/objects.store";
// interfaces
import { IDialogPagesState } from "@interfaces/state/dialog-pages-state.interface";
// utils
import getLocalStorageFiltersState from "@utils/local-storage/get-local-storage-filters-state";
import setLocalStorageFiltersState from "@utils/local-storage/set-local-storage-filters-state";

const ObjectsDatabaseLayout = React.memo(() => {
  const [period, setPeriod] = useState("fromOneMonthToTwo");
  const [stateDialogPages, setStateDialogPages] =
    useState<IDialogPagesState>(dialogePagesState);

  const { localStorageData, formatedState } = getLocalStorageFiltersState({
    title: "search-objectsdatabase-data"
  });

  const { watch, reset, setValue } = useForm({
    defaultValues: localStorageData
      ? formatedState
      : objectsDatabaseLayoutInitialState,
    mode: "onBlur"
  });

  const data = watch();
  const objects = useSelector(getObjectsList());

  const isLoading = useSelector(getObjectsLoadingStatus());
  const isCurrentUserRoleManager = useSelector(getIsCurrentUserRoleManager());

  const { searchedObjects, filteredObjects } = useSearchObjectDatabase(
    objects,
    data,
    period
  );

  setLocalStorageFiltersState({
    title: "search-objectsdatabase-data",
    data: data
  });

  return (
    <ContainerStyled>
      <HeaderForLayout title="Проработка базы объектов" />
      <TitleObjectsQuantityObjectsDatabaseLayout objects={searchedObjects} />
      <ObjectsDatabaseLayoutFiltersPanel
        data={data}
        objects={searchedObjects}
        reset={reset}
        setValue={setValue}
      />
      <NoCallsControlPanelObjectsDatabase
        period={period}
        setPeriod={setPeriod}
      />
      <NeedToCallsControlPanelObjectsDatabase
        period={period}
        setPeriod={setPeriod}
      />
      <BasicTable
        items={filteredObjects}
        itemsColumns={objectsDatabaseColumns(
          stateDialogPages,
          isCurrentUserRoleManager
        )}
        isLoading={isLoading}
      />
      <DialogPages state={stateDialogPages} setState={setStateDialogPages} />
    </ContainerStyled>
  );
});

export default ObjectsDatabaseLayout;
