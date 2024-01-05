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
import HeaderLayout from "../../components/common/page-headers/header-layout";
import PresentationsFiltersPanel from "../../components/UI/filters-panels/presentations-filters-panel";
import ItemsOnMap from "../../components/common/map/items-on-map/items-on-map";
import PresentationBaloon from "../../components/UI/maps/presentation-baloon";
// columns
import { presentationsColumns } from "../../columns/presentations.columns";
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
import DialogStyled from "@components/common/dialog/dialog-styled";
import ObjectPage from "@components/pages/object-page/object-page";
import CreatePresentation from "@components/pages/presentation/create-presentation";
import UpdatePresentation from "@components/pages/presentation/update-presentation";
import UpdateObject from "@components/pages/object/update-object";
import Buttons from "./components/buttons";

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

  const presentationsList = useSelector(getPresentationsList());
  const presentationsStatuses = useSelector(getPresentationStatusList());
  const isLoading = useSelector(getPresentationsLoadingStatus());
  const isInputEmpty = JSON.stringify(initialState) !== JSON.stringify(data);

  const searchedPresentations = useSearchPresentation(presentationsList, data);
  const sortedPresentations = useMemo(() => {
    return orderBy(searchedPresentations, ["created_at"], ["desc"]);
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

  const [state, setState] = useState({
    objectPage: false,
    updateObjectPage: false,
    createPresentationPage: false,
    updatePresentationPage: false,
    objectId: null,
    presentationId: "",
  });

  // обновление стейта при создании презентации
  const handleOpenCreatePresentationPage = () => {
    setState((prevState) => ({
      ...prevState,
      createPresentationPage: true,
    }));
  };
  const handleCloseCreatePresentationPage = () => {
    setState((prevState) => ({
      ...prevState,
      createPresentationPage: false,
    }));
  };

  // обновление стейта при обновлении презентации
  const handleOpenUpdatePresentationPage = (presentationId) => {
    setState((prevState) => ({
      ...prevState,
      updatePresentationPage: true,
      presentationId: presentationId,
    }));
  };
  const handleCloseUpdatePresentationPage = () => {
    setState((prevState) => ({
      ...prevState,
      updatePresentationPage: false,
    }));
  };

  // обновление стейта при открытии страницы объекта
  const handleOpenObjectPage = (objectId) => {
    setState((prevState) => ({
      ...prevState,
      objectPage: true,
      objectId: objectId,
    }));
  };
  const handleCloseObjectPage = () => {
    setState((prevState) => ({
      ...prevState,
      objectPage: false,
      // objectId: null,
    }));
  };

  // обновление стейта при открытии страницы обновления объекта
  const handleOpenUpdateObjectPage = () => {
    setState((prevState) => ({ ...prevState, updateObjectPage: true }));
  };
  const handleCloseUpdateObjectPage = () => {
    setState((prevState) => ({ ...prevState, updateObjectPage: false }));
  };

  const isDialogPage = true;

  return (
    <Box>
      <HeaderLayout title="Презентации" />
      <Buttons
        initialState={initialState}
        reset={reset}
        onOpenCreatePresentationPage={handleOpenCreatePresentationPage}
        isInputEmpty={isInputEmpty}
      />
      <ItemsOnMap
        items={presentationsWithLocation}
        onClick={setSelectedPresentationBaloon}
        baloon={
          <PresentationBaloon
            presentationId={selectedPresentationBaloon}
            onOpenObjectPage={handleOpenObjectPage}
            onOpenUpdatePresentationPage={handleOpenUpdatePresentationPage}
          />
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
        itemsColumns={presentationsColumns(
          handleOpenObjectPage,
          handleOpenUpdatePresentationPage,
          isDialogPage,
          isCurator
        )}
        isLoading={isLoading}
      />

      {confettiActive && <Confetti width={width} height={height} />}

      <DialogStyled
        component={
          <ObjectPage
            onClose={handleCloseObjectPage}
            onEdit={handleOpenUpdateObjectPage}
            objectId={state.objectId}
          />
        }
        onClose={handleCloseObjectPage}
        open={state.objectPage}
      />
      <DialogStyled
        component={
          <UpdateObject
            onClose={handleCloseUpdateObjectPage}
            objectId={state.objectId}
          />
        }
        onClose={handleCloseUpdateObjectPage}
        open={state.updateObjectPage}
      />
      <DialogStyled
        component={
          <CreatePresentation
            onClose={handleCloseCreatePresentationPage}
            setConfettiActive={setConfettiActive}
          />
        }
        onClose={handleCloseCreatePresentationPage}
        open={state.createPresentationPage}
        maxWidth="sm"
      />
      <DialogStyled
        component={
          <UpdatePresentation onClose={handleCloseUpdatePresentationPage} />
        }
        onClose={handleCloseUpdatePresentationPage}
        open={state.updatePresentationPage}
        maxWidth="sm"
      />
    </Box>
  );
});

export default Presentations;
