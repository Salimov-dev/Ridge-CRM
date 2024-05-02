import { SetStateAction } from "react";
import { useSelector } from "react-redux";
import { FC, useEffect, useState } from "react";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";
// components
import PresentationsLayoutFiltersPanel from "@components/UI/filters-panels/presentations-layout.filters-panel";
import PresentationBalloon from "@components/UI/maps/presentation-balloon";
import ItemsOnMap from "@components/common/map/items-on-map/items-on-map";
import BasicTable from "@components/common/table/basic-table";
// columns
import { presentationsColumns } from "@columns/presentations.columns";
// hooks
import useSearchPresentation from "@hooks/presentation/use-search-presentation";
// types
import { IObject } from "src/types/object/object.interface";
import { IPresentation } from "src/types/presentation/presentation.interface";
import { IDialogPagesState } from "src/types/dialog-pages/dialog-pages-state.interface";
// store
import { getObjectsList } from "@store/object/objects.store";
import {
  getPresentationsList,
  getPresentationsLoadingStatus
} from "@store/presentation/presentations.store";
import {
  getIsCurrentUserRoleCurator,
  getIsCurrentUserRoleManager
} from "@store/user/users.store";

interface SetStateFunction<T> {
  (value: SetStateAction<T>): void;
}

interface IPresentationsLayoutContent {
  data: IPresentation;
  register: UseFormRegister<IPresentation>;
  setValue: UseFormSetValue<IPresentation>;
  setStateDialogPages: SetStateFunction<IDialogPagesState>;
}

const PresentationsLayoutContent: FC<IPresentationsLayoutContent> = ({
  data,
  register,
  setValue,
  setStateDialogPages
}) => {
  const [presentationsWithLocation, setPresentationsWithLocation] = useState<
    IPresentation[]
  >([]);

  const [selectedPresentationIdBalloon, setSelectedPresentationIdBalloon] =
    useState<string>("");

  const objects = useSelector(getObjectsList());

  const presentationsList = useSelector(getPresentationsList());
  const { searchedPresentations } = useSearchPresentation(
    presentationsList,
    data
  );

  const isLoading = useSelector(getPresentationsLoadingStatus());
  const isCurrentUserRoleManager = useSelector(getIsCurrentUserRoleManager());
  const isCurrentUserRoleCurator = useSelector(getIsCurrentUserRoleCurator());

  const handleSelectPresentationBalloon = (presentationId: string): void => {
    setSelectedPresentationIdBalloon(presentationId);
  };

  useEffect(() => {
    if (searchedPresentations && objects) {
      const presentationsWithLocationData = searchedPresentations.map(
        (presentation: IPresentation) => {
          const matchingObject: IObject | undefined = objects?.find(
            (object: IObject) => object._id === presentation.objectId
          );

          if (matchingObject) {
            const newPres: IPresentation = {
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
        setPresentationsWithLocation(presentationsWithLocationData);
      }
    }
  }, [searchedPresentations, objects]);

  return (
    <>
      <ItemsOnMap
        items={presentationsWithLocation}
        onClick={handleSelectPresentationBalloon}
        isLoading={isLoading}
        baloon={
          <PresentationBalloon
            presentationId={selectedPresentationIdBalloon}
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
    </>
  );
};

export default PresentationsLayoutContent;
