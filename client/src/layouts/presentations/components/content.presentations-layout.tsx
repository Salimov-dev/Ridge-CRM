import { Dispatch, SetStateAction } from "react";
import { useSelector } from "react-redux";
import { FC, useState } from "react";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";
// components
import PresentationsLayoutFiltersPanel from "@components/UI/filters-panels/presentations-layout.filters-panel";
import PresentationBalloon from "@components/UI/maps/presentation-balloon/presentation-balloon";
import ItemsOnMap from "@components/common/map/items-on-map/items-on-map";
import BasicTable from "@components/common/table/basic-table";
// columns
import { presentationsColumns } from "@columns/presentations.columns";
// hooks
import useSearchPresentation from "@hooks/presentation/use-search-presentation";
import usePresentationsWithLocation from "@hooks/presentation/use-presentations-with-location";
// interfaces
import { IDialogPagesState } from "@interfaces/state/dialog-pages-state.interface";
// store
import { getPresentationsLoadingStatus } from "@store/presentation/presentations.store";
import {
  getIsCurrentUserRoleCurator,
  getIsCurrentUserRoleManager
} from "@store/user/users.store";

type IData = Record<string, string | string[] | null>;

interface IPresentationsLayoutContent {
  data: IData;
  register: UseFormRegister<IData>;
  setValue: UseFormSetValue<IData>;
  setStateDialogPages: Dispatch<SetStateAction<IDialogPagesState>>;
}

const PresentationsLayoutContent: FC<IPresentationsLayoutContent> = ({
  data,
  register,
  setValue,
  setStateDialogPages
}): JSX.Element => {
  const [selectedPresentationId, setSelectedPresentationId] = useState("");

  const { searchedPresentations } = useSearchPresentation({
    data
  });

  const { presentationsWithLocation } = usePresentationsWithLocation({
    presentations: searchedPresentations
  });

  const isLoading = useSelector(getPresentationsLoadingStatus());
  const isCurrentUserRoleManager = useSelector(getIsCurrentUserRoleManager());
  const isCurrentUserRoleCurator = useSelector(getIsCurrentUserRoleCurator());

  const handleSelectPresentationBalloon = (presentationId: string): void => {
    setSelectedPresentationId(presentationId);
  };

  return (
    <>
      <ItemsOnMap
        items={presentationsWithLocation}
        onClick={handleSelectPresentationBalloon}
        isLoading={isLoading}
        baloon={
          <PresentationBalloon
            presentationId={selectedPresentationId}
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
        itemsColumns={presentationsColumns({
          setState: setStateDialogPages,
          isCurrentUserRoleCurator: isCurrentUserRoleCurator,
          isCurrentUserRoleManager: isCurrentUserRoleManager
        })}
        isLoading={isLoading}
      />
    </>
  );
};

export default PresentationsLayoutContent;
