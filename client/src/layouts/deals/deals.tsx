import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
// components
import Stages from "./components/stages/stages";
import HeaderLayout from "@components/common/page-headers/header-layout";
import DealsFiltersPanel from "@components/UI/filters-panels/deals-filters-panel";
import PageDialogs from "@components/common/dialog/page-dialogs";
// data
import { allowedStatuses, dealStagesArray } from "@data/deals/deals-stages";
// hooks
import useSearchDeals from "@hooks/deals/use-search-deals";
// store
import {
  getObjectsList,
  getObjectsLoadingStatus,
} from "@store/object/objects.store";
import { getCurrentUserId, getIsUserCurator } from "@store/user/users.store";

const initialState = {
  selectedUsers: [],
};

const Deals = React.memo(() => {
  const [state, setState] = useState({
    objectPage: false,
    updatePage: false,
    objectId: null,
  });

  const localStorageState = JSON.parse(
    localStorage.getItem("search-deals-data")
  );

  const { register, watch, setValue, reset } = useForm({
    defaultValues: Boolean(localStorageState)
      ? localStorageState
      : initialState,
    mode: "onChange",
  });

  const data = watch();
  const currentUserId = useSelector(getCurrentUserId());

  const isCurator = useSelector(getIsUserCurator(currentUserId));
  const isLoading = useSelector(getObjectsLoadingStatus());
  const isInputEmpty = JSON.stringify(initialState) !== JSON.stringify(data);

  const objects = useSelector(getObjectsList());
  const objectsInDeals = objects?.filter((obj) => {
    if (obj && allowedStatuses.includes(obj.status)) {
      return obj;
    }
  });
  const searchedDeals = useSearchDeals(objectsInDeals, data);

  useEffect(() => {
    localStorage.setItem("search-deals-data", JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    const hasLocalStorageData = localStorage.getItem("search-deals-data");

    if (hasLocalStorageData?.length) {
      localStorage.setItem("search-deals-data", JSON.stringify(initialState));
    }
  }, []);

  return (
    <Box>
      <HeaderLayout title="Сделки" />
      {isCurator && (
        <DealsFiltersPanel
          data={data}
          deals={objectsInDeals}
          register={register}
          initialState={initialState}
          reset={reset}
          setValue={setValue}
          isInputEmpty={isInputEmpty}
          isLoading={isLoading}
        />
      )}
      <Stages
        objects={searchedDeals}
        setState={setState}
        stages={dealStagesArray}
        isCurator={isCurator}
      />
      <PageDialogs state={state} setState={setState} />
    </Box>
  );
});

export default Deals;
