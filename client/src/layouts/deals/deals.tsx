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
import { dealStagesArray } from "../../mock/deals-stages";
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

  const allowedStatuses = [
    "64c140880e87d7e4532f79d5",
    "64ecf9f34284e591a86bec2f",
    "651af4fb687b71e04dde43ce",
    "64de0da4063bb018afc97f0e",
    "651af512687b71e04dde43cf",
    "64c140880e87d7e4532f79d6",
    "651af52f687b71e04dde43d0",
  ];

  const objects = useSelector(getObjectsList());
  const objectsInDeals = objects?.filter((obj) => {
    if (obj && allowedStatuses.includes(obj.status)) {
      return obj;
    }
  });

  const searchedDeals = useSearchDeals(objectsInDeals, data);

  const isLoading = useSelector(getObjectsLoadingStatus());
  const dealStages = dealStagesArray;

  const currentUserId = useSelector(getCurrentUserId());
  const isCurator = useSelector(getIsUserCurator(currentUserId));
  const currentUserObjects = objects?.filter(
    (obj) => obj?.userId === currentUserId
  );

  let transformObjects = [];
  currentUserObjects?.forEach((obj) => {
    transformObjects?.push({ _id: obj._id, name: obj.location.address });
  });

  const getObjectAddress = (id) => {
    const object = objects?.find((obj) => obj?._id === id);
    const address = `${object?.location?.city}, ${object?.location?.address}`;
    return address;
  };

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
        stages={dealStages}
        isCurator={isCurator}
        getObjectAddress={getObjectAddress}
      />

      <ObjectPageDialog />
      <ObjectUpdatePageDialog />
    </Box>
  );
};

export default Deals;
