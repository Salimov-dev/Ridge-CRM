import dayjs from "dayjs";
import { useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// common
import BasicTable from "@common/table/basic-table";
import HeaderForLayout from "@components/common/headers/header-for-layout";
import ItemsOnMap from "@common/map/items-on-map/items-on-map";
import PageDialogs from "@common/dialog/page-dialogs";
import { ContainerStyled } from "@common/container/container-styled";
// columns
import { presentationsColumns } from "@columns/presentations.columns";
// hooks
import useSearchPresentation from "@hooks/presentation/use-search-presentation";
// initial-states
import { presentationsLayoutInitialState } from "@initial-states/layouts/presentations-layout.initial-state";
// UI
import PresentationBalloon from "@UI/maps/presentation-balloon";
import ButtonsPresentationsLayout from "@UI/layout-buttons/buttons.presentations-layout";
import PresentationsLayoutFiltersPanel from "@UI/filters-panels/presentations-layout.filters-panel";
// store
import { getObjectsList } from "@store/object/objects.store";
import {
  getIsCurrentUserRoleCurator,
  getIsCurrentUserRoleManager
} from "@store/user/users.store";
import {
  getPresentationsList,
  getPresentationsLoadingStatus
} from "@store/presentation/presentations.store";

const PresentationsLayout = React.memo(() => {
  const [presentationsWithLocation, setPresentationsWithLocation] = useState(
    []
  );
  const [selectedPresentationBaloon, setSelectedPresentationBaloon] =
    useState("");

  const [stateDialogPages, setStateDialogPages] = useState({
    objectPage: false,
    updateObjectPage: false,
    createPresentationPage: false,
    updatePresentationPage: false,
    objectId: null,
    presentationId: "",
    videoPlayerPage: false
  });

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
      : null
  };

  const { register, watch, setValue, reset } = useForm({
    defaultValues: !!localStorageState
      ? formatedState
      : presentationsLayoutInitialState,
    mode: "onChange"
  });

  const data = watch();
  const objects = useSelector(getObjectsList());

  const presentationsList = useSelector(getPresentationsList());
  const { searchedPresentations } = useSearchPresentation(
    presentationsList,
    data
  );

  const isLoading = useSelector(getPresentationsLoadingStatus());
  const isCurrentUserRoleManager = useSelector(getIsCurrentUserRoleManager());
  const isCurrentUserRoleCurator = useSelector(getIsCurrentUserRoleCurator());

  const handleSelectPresentationBaloon = (presentationId: string) => {
    setSelectedPresentationBaloon(presentationId);
  };

  const handleSetPresentationsWithLocation = (location) => {
    setPresentationsWithLocation(location);
  };

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
        JSON.stringify(presentationsLayoutInitialState)
      );
    }
  }, []);

  useEffect(() => {
    if (searchedPresentations && objects) {
      const presentationsWithLocationData = searchedPresentations.map(
        (presentation) => {
          const matchingObject = objects?.find(
            (object) => object._id === presentation.objectId
          );

          if (matchingObject) {
            const newPres = {
              ...presentation,
              city: matchingObject?.city,
              address: matchingObject?.address,
              latitude: matchingObject?.latitude,
              longitude: matchingObject?.longitude
            };

            return newPres;
          } else {
            return presentation;
          }
        }
      );

      if (
        JSON.stringify(presentationsWithLocationData) !==
        JSON.stringify(presentationsWithLocation)
      ) {
        handleSetPresentationsWithLocation(presentationsWithLocationData);
      }
    }
  }, [searchedPresentations, objects]);

  return (
    <ContainerStyled>
      <HeaderForLayout title="Презентации" />
      <ButtonsPresentationsLayout
        data={data}
        reset={reset}
        setState={setStateDialogPages}
      />
      <ItemsOnMap
        items={presentationsWithLocation}
        onClick={handleSelectPresentationBaloon}
        isLoading={isLoading}
        baloon={
          <PresentationBalloon
            presentationId={selectedPresentationBaloon}
            setState={setStateDialogPages}
          />
        }
      />
      <PresentationsLayoutFiltersPanel
        data={data}
        register={register}
        setValue={setValue}
      />
      <BasicTable
        items={searchedPresentations}
        itemsColumns={presentationsColumns(
          setStateDialogPages,
          isCurrentUserRoleCurator,
          isCurrentUserRoleManager
        )}
        isLoading={isLoading}
      />
      <PageDialogs
        state={stateDialogPages}
        setState={setStateDialogPages}
        videoTitle="Как пользоваться страницей с Презентациями"
        videoSrc="https://www.youtube.com/embed/J6Hlb3M7TdM"
      />
    </ContainerStyled>
  );
});

export default PresentationsLayout;
