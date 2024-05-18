import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
// components
import Stages from "./components/layout-stages.deals-layout";
import HeaderForLayout from "@components/common/headers/header-for-layout";
import { ContainerStyled } from "@components/common/container/container-styled";
import DealsLayoutFiltersPanel from "@components/UI/filters-panels/deals-layout.filters-panel";
import DialogPages from "@dialogs/dialog-pages";
// initial-states
import { dealsLayoutInitialState } from "@initial-states/layouts/deals-layout.initial-state";
import { dialogePagesState } from "@initial-states/dialog-pages-state/dialog-pages.state";
// data
import { allowedStatuses, dealStagesArray } from "@data/deals/deals-stages";
// hooks
import useSearchDeals from "@hooks/deals/use-search-deals";
// store
import { getObjectsList } from "@store/object/objects.store";
// interfaces
import { IDialogPagesState } from "@interfaces/state/dialog-pages-state.interface";
// utils
import getLocalStorageFiltersState from "@utils/local-storage/get-local-storage-filters-state";
import setLocalStorageFiltersState from "@utils/local-storage/set-local-storage-filters-state";

const DealsLayout = React.memo(() => {
  const [stateDialogPages, setStateDialogPages] =
    useState<IDialogPagesState>(dialogePagesState);

  const { localStorageData, formatedState } = getLocalStorageFiltersState({
    title: "search-deals-data"
  });

  const { watch, setValue, reset } = useForm({
    defaultValues: localStorageData ? formatedState : dealsLayoutInitialState,
    mode: "onChange"
  });

  const data = watch();

  const objects = useSelector(getObjectsList());
  const dealsObjects = objects?.filter((obj) => {
    if (obj && allowedStatuses.includes(obj.status)) {
      return obj;
    }
  });
  const searchedDeals = useSearchDeals(dealsObjects, data);

  setLocalStorageFiltersState({
    title: "search-deals-data",
    data: data
  });

  return (
    <ContainerStyled>
      <HeaderForLayout title="Сделки" />
      <DealsLayoutFiltersPanel
        data={data}
        deals={dealsObjects}
        reset={reset}
        setValue={setValue}
      />
      <Stages
        deals={searchedDeals}
        setState={setStateDialogPages}
        stages={dealStagesArray}
      />
      <DialogPages state={stateDialogPages} setState={setStateDialogPages} />
    </ContainerStyled>
  );
});

export default DealsLayout;
