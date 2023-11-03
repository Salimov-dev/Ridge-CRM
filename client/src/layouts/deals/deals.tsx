import { Box } from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
// components
import Stages from "./components/stages/stages";
import LayoutTitle from "../../components/common/page-titles/layout-title";
import ObjectPageDialog from "../../components/UI/dialogs/object-page-dialog/object-page-dialog";
import ObjectUpdatePageDialog from "../../components/UI/dialogs/objects/object-update-page-dialog";
import DealsFiltersPanel from "../../components/UI/filters-panels/deals-filters-panel";
// store
import {
  getObjectsList,
  getObjectsLoadingStatus,
} from "../../store/object/objects.store";
import {
  getCurrentUserId,
  getIsUserCurator,
} from "../../store/user/users.store";
// mock
import {
  allowedStatuses,
  dealStagesArray,
} from "../../mock/deals/deals-stages";
// hooks
import useSearchDeals from "../../hooks/deals/use-search-deals";

const initialState = {
  selectedUsers: [],
};

const Deals = () => {
  const localStorageState = JSON.parse(
    localStorage.getItem("search-deals-data")
  );

  const { register, watch, setValue } = useForm({
    defaultValues: Boolean(localStorageState)
      ? localStorageState
      : initialState,
    mode: "onBlur",
  });

  const data = watch();
  const currentUserId = useSelector(getCurrentUserId());
  const isCurator = useSelector(getIsUserCurator(currentUserId));
  const objects = useSelector(getObjectsList());
  const isLoading = useSelector(getObjectsLoadingStatus());

  const objectsInDeals = objects?.filter((obj) => {
    if (obj && allowedStatuses.includes(obj.status)) {
      return obj;
    }
  });

  const currentUserObjects = objects?.filter(
    (obj) => obj?.userId === currentUserId
  );

  const searchedDeals = useSearchDeals(objectsInDeals, data);

  let transformObjects = [];
  currentUserObjects?.forEach((obj) => {
    transformObjects?.push({ _id: obj._id, name: obj.location.address });
  });

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
      <LayoutTitle title="Сделки" />
      <DealsFiltersPanel
        data={data}
        deals={objectsInDeals}
        register={register}
        setValue={setValue}
        isCurator={isCurator}
        isLoading={isLoading}
      />
      <Stages
        objects={searchedDeals}
        stages={dealStagesArray}
        isCurator={isCurator}
      />

      <ObjectPageDialog />
      <ObjectUpdatePageDialog />
    </Box>
  );
};

export default Deals;
