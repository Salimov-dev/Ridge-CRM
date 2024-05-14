import { Dispatch, FC, SetStateAction, useState } from "react";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";
import { useSelector } from "react-redux";
// columns
import { objectsColumns } from "@columns/objects.columns";
// components
import ObjectsLayoutFiltersPanel from "@components/UI/filters-panels/objects-layout.filters-panel";
import ObjectBalloon from "@components/UI/maps/object-balloon/object-balloon";
import ItemsOnMap from "@components/common/map/items-on-map/items-on-map";
import BasicTable from "@components/common/table/basic-table";
// interfaces
import { IDataProps } from "@interfaces/data/data-props.type";
import { IObject } from "@interfaces/object/object.interface";
import { IDialogPagesState } from "@interfaces/state/dialog-pages-state.interface";
import { RowSelection } from "@interfaces/table/row-selection.type";
// store
import { getObjectsLoadingStatus } from "@store/object/objects.store";
import {
  getIsCurrentUserRoleCurator,
  getIsCurrentUserRoleManager
} from "@store/user/users.store";

interface IObjectsLayoutContentContent {
  data: IDataProps;
  rowSelection: RowSelection;
  setRowSelection: UseFormSetValue<RowSelection>;
  objects: IObject[];
  register: UseFormRegister<IDataProps>;
  setValue: UseFormSetValue<IDataProps>;
  setStateDialogPages: Dispatch<SetStateAction<IDialogPagesState>>;
}

const ObjectsLayoutContent: FC<IObjectsLayoutContentContent> = ({
  data,
  register,
  setValue,
  setStateDialogPages,
  rowSelection,
  setRowSelection,
  objects
}): JSX.Element => {
  const [selectedObjectId, setSelectedObjectId] = useState("");

  const isLoading = useSelector(getObjectsLoadingStatus());
  const isCurrentUserRoleManager = useSelector(getIsCurrentUserRoleManager());
  const isCurrentUserRoleCurator = useSelector(getIsCurrentUserRoleCurator());

  const handleSelectBalloon = (item: string): void => {
    setSelectedObjectId(item);
  };
  return (
    <>
      <ItemsOnMap
        items={objects}
        onClick={handleSelectBalloon}
        isLoading={isLoading}
        baloon={
          <ObjectBalloon
            objectId={selectedObjectId}
            setState={setStateDialogPages}
          />
        }
      />
      <ObjectsLayoutFiltersPanel
        data={data}
        register={register}
        setValue={setValue}
      />
      <BasicTable
        rowSelection={rowSelection}
        setRowSelection={setRowSelection}
        items={objects}
        itemsColumns={objectsColumns({
          setState: setStateDialogPages,
          isCurrentUserRoleManager: isCurrentUserRoleManager,
          isCurrentUserRoleCurator: isCurrentUserRoleCurator
        })}
        isLoading={isLoading}
      />
    </>
  );
};

export default ObjectsLayoutContent;
