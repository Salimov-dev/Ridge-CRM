import { Typography, Tooltip, Box, Button } from "@mui/material";
import { orderBy } from "lodash";
import LayoutTitle from "../../components/common/page-titles/layout-title";
import CreatePresentationButton from "../../components/UI/dialogs/buttons/create-presentation-button";
import PresentationCreatePageDialog from "../../components/UI/dialogs/presentations/presentation-create-page-dialog";
import { useSelector } from "react-redux";
import {
  getPresentationsList,
  getPresentationsLoadingStatus,
} from "../../store/presentation/presentations.store";
import BasicTable from "../../components/common/table/basic-table";
import { presentationsColumns } from "../../columns/presentations-columns/presentations-columns";
import ObjectUpdatePageDialog from "../../components/UI/dialogs/objects/object-update-page-dialog";
import ObjectPageDialog from "../../components/UI/dialogs/object-page-dialog/object-page-dialog";
import PresentationsFiltersPanel from "../../components/UI/filters-panels/presentations-filters-panel";
import dayjs from "dayjs";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import AddAndClearFiltersButton from "../../components/common/buttons/add-and-clear-filters-button";
import useSearchMeeting from "../../hooks/meeting/use-search-meeting";
import ItemsOnMap from "../../components/common/map/items-on-map/items-on-map";
import MeetingBaloon from "../../components/UI/maps/meeting-baloon";
import target from "../../assets/map/target-presentation.png";
import targetCluster from "../../assets/map/targeMeeting_cluster.png";
import { getMeetingsList } from "../../store/meeting/meetings.store";
import { getObjectsList } from "../../store/object/objects.store";
import PresentationBaloon from "../../components/UI/maps/presentation-baloon";

const initialState = {
  objectAddress: "",
  result: "",
  selectedStatuses: [],
  selectedUsers: [],
  startDate: null,
  endDate: null,
};

const Presentations = () => {
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

  const objects = useSelector(getObjectsList());
  const presentationsList = useSelector(getPresentationsList());
  const isLoading = useSelector(getPresentationsLoadingStatus());

  const center = [59.930320630519155, 30.32906024941998];
  const mapZoom = 11;

  const data = watch();
  // const searchedPresentations = useSearchMeeting(meetings, data);
  const searchedPresentations = presentationsList;
  const sortedPresentations = orderBy(
    searchedPresentations,
    ["created_at"],
    ["asc"]
  );
  const isInputEmpty = JSON.stringify(initialState) !== JSON.stringify(data);

  useEffect(() => {
    localStorage.setItem("search-meetings-data", JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    const hasLocalStorageData = localStorage.getItem("search-meetings-data");

    if (hasLocalStorageData?.length) {
      localStorage.setItem(
        "search-meetings-data",
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
        mapZoom={mapZoom}
        hintContent={(item) =>
          `${item?.location?.city}, ${item?.location?.address}`
        }
        center={center}
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
        register={register}
        setValue={setValue}
        isLoading={isLoading}
      />

      <BasicTable
        items={sortedPresentations}
        itemsColumns={presentationsColumns}
        isLoading={isLoading}
      />

      <PresentationCreatePageDialog />
      <ObjectPageDialog />
      <ObjectUpdatePageDialog />
    </Box>
  );
};

export default Presentations;
