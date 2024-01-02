import Confetti from "react-confetti";
import dayjs from "dayjs";
import { useForm } from "react-hook-form";
import React, { useEffect, useMemo, useState } from "react";
import { Box } from "@mui/material";
import { orderBy } from "lodash";
import { useSelector } from "react-redux";
import { useWindowSize } from "@react-hook/window-size";
// components
import BasicTable from "../../components/common/table/basic-table";
import LayoutTitle from "../../components/common/page-titles/layout-title";
import CreatePresentationButton from "../../components/UI/dialogs/buttons/create-presentation-button";
import PresentationCreatePageDialog from "../../components/UI/dialogs/presentations/presentation-create-page-dialog";
import ObjectUpdatePageDialog from "../../components/UI/dialogs/objects/object-update-page-dialog";
import ObjectPageDialog from "../../components/UI/dialogs/object-page-dialog/object-page-dialog";
import PresentationsFiltersPanel from "../../components/UI/filters-panels/presentations-filters-panel";
import PresentationUpdateDialog from "../../components/UI/dialogs/presentations/presentation-update-dialog";
import AddAndClearFiltersButton from "../../components/common/buttons/add-and-clear-filters-button";
import ItemsOnMap from "../../components/common/map/items-on-map/items-on-map";
import PresentationBaloon from "../../components/UI/maps/presentation-baloon";
// columns
import { presentationsColumns } from "../../columns/presentations-columns/presentations-columns";
import { presentationsCuratorColumns } from "../../columns/presentations-columns/presentations-columns-curator";
// map images
import target from "../../assets/map/target-presentation.png";
import targetCluster from "../../assets/map/target-presentation-cluster.png";
// hooks
import useSearchPresentation from "../../hooks/presentation/use-search-presentation";
// store
import { getObjectsList } from "../../store/object/objects.store";
import {
  getPresentationsList,
  getPresentationsLoadingStatus,
} from "../../store/presentation/presentations.store";
import {
  getCurrentUserId,
  getIsUserCurator,
} from "../../store/user/users.store";
import { getPresentationStatusList } from "../../store/presentation/presentation-status.store";

const initialState = {
  objectAddress: "",
  curatorComment: "",
  selectedStatuses: [],
  selectedUsers: [],
  startDate: null,
  endDate: null,
};

const Presentations = React.memo(() => {
  const { width, height } = useWindowSize();
  const [confettiActive, setConfettiActive] = useState(false);
  const [selectedPresentationBaloon, setSelectedPresentationBaloon] =
    useState(null);
  const [presentationsWithLocation, setPresentationsWithLocation] = useState(
    []
  );

  const localStorageState = JSON.parse(
    localStorage.getItem("search-presentations-data")
  );

  const formatedState = {
    ...localStorageState,
    startDate: localStorageState?.startDate
      ? dayjs(localStorageState?.startDate)
      : null,
    endDate: localStorageState?.endDate
      ? dayjs(localStorageState?.endDate)
      : null,
  };

  const { register, watch, setValue, reset } = useForm({
    defaultValues: Boolean(localStorageState) ? formatedState : initialState,
    mode: "onBlur",
  });

  const data = watch();
  const objects = useSelector(getObjectsList());
  const currentUserId = useSelector(getCurrentUserId());
  const isCurator = useSelector(getIsUserCurator(currentUserId));
  const columns = isCurator
    ? presentationsCuratorColumns
    : presentationsColumns;

  const presentationsList = useSelector(getPresentationsList());
  const presentationsStatuses = useSelector(getPresentationStatusList());
  const isLoading = useSelector(getPresentationsLoadingStatus());
  const isInputEmpty = JSON.stringify(initialState) !== JSON.stringify(data);

  const searchedPresentations = useSearchPresentation(presentationsList, data);
  const sortedPresentations = useMemo(() => {
    return orderBy(searchedPresentations, ["created_at"], ["asc"]);
  }, [searchedPresentations]);

  useEffect(() => {
    localStorage.setItem("search-presentations-data", JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    const hasLocalStorageData = localStorage.getItem(
      "search-presentations-data"
    );

    if (hasLocalStorageData?.length) {
      localStorage.setItem(
        "search-presentations-data",
        JSON.stringify(initialState)
      );
    }
  }, []);

  useEffect(() => {
    if (presentationsList && objects) {
      const presentationsWithLocationData = presentationsList.map(
        (presentation) => {
          const matchingObject = objects?.find(
            (object) => object._id === presentation.objectId
          );

          if (matchingObject) {
            return {
              ...presentation,
              location: {
                city: matchingObject?.location.city,
                address: matchingObject?.location.address,
                latitude: matchingObject?.location.latitude,
                longitude: matchingObject?.location.longitude,
              },
            };
          } else {
            return presentation;
          }
        }
      );

      setPresentationsWithLocation(presentationsWithLocationData);
    }
  }, [presentationsList, objects]);

  useEffect(() => {
    setTimeout(() => {
      setConfettiActive(false);
    }, 4000);
  }, [confettiActive]);

  return (
    <Box>
      <LayoutTitle title="Презентации" />
      <AddAndClearFiltersButton
        reset={reset}
        isInputEmpty={isInputEmpty}
        initialState={initialState}
        button={<CreatePresentationButton />}
      />

      <ItemsOnMap
        items={presentationsWithLocation}
        onClick={setSelectedPresentationBaloon}
        baloon={
          <PresentationBaloon presentationId={selectedPresentationBaloon} />
        }
        isLoading={isLoading}
        target={target}
        targetCluster={targetCluster}
      />

      <PresentationsFiltersPanel
        data={data}
        presentations={presentationsList}
        statuses={presentationsStatuses}
        register={register}
        setValue={setValue}
        isCurator={isCurator}
        isLoading={isLoading}
      />

      <BasicTable
        items={sortedPresentations}
        itemsColumns={columns}
        isLoading={isLoading}
      />

      {confettiActive && <Confetti width={width} height={height} />}

      <PresentationCreatePageDialog setConfettiActive={setConfettiActive} />
      <PresentationUpdateDialog />
      <ObjectPageDialog />
      <ObjectUpdatePageDialog />
    </Box>
  );
});

export default Presentations;
