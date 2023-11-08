// libraries
import dayjs from "dayjs";
import { orderBy } from "lodash";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import React, { useEffect, useMemo, useState } from "react";
// columns
import { objectsColumns } from "../../columns/objects-columns/objects-columns";
import { objectsColumnsCurator } from "../../columns/objects-columns/objects-columns-curator";
// components
import ObjectBaloon from "../../components/UI/maps/object-baloon";
import ObjectsFiltersPanel from "../../components/UI/filters-panels/objects-filters-panel";
import BasicTable from "../../components/common/table/basic-table";
import LayoutTitle from "../../components/common/page-titles/layout-title";
import ItemsOnMap from "../../components/common/map/items-on-map/items-on-map";
import AddAndClearFiltersButton from "../../components/common/buttons/add-and-clear-filters-button";
import ObjectPageDialog from "../../components/UI/dialogs/object-page-dialog/object-page-dialog";
import ObjectUpdatePageDialog from "../../components/UI/dialogs/objects/object-update-page-dialog";
import ObjectCreatePageDialog from "../../components/UI/dialogs/objects/object-create-page-dialog";
import CreateObjectButton from "../../components/UI/dialogs/buttons/create-object-button";
import ExportToExelButton from "../../components/common/buttons/export-to-excel-button";
import TransferObjectToAnotherManagerButton from "../../components/UI/dialogs/buttons/transfer-object-to-another-manager-button";
import TransferObjectToAnotherManagerDialog from "../../components/UI/dialogs/objects/transfer-object-to-another-manager-dialog";
// hooks
import useSearchObject from "../../hooks/object/use-search-object";
import useModifyObjectToExportExel from "../../hooks/object/use-modify-object-to-export-exel";
// store
import {
  getCurrentUserId,
  getIsUserCurator,
} from "../../store/user/users.store";
import {
  getObjectById,
  getObjectsList,
  getObjectsLoadingStatus,
} from "../../store/object/objects.store";
import { getObjectsStatusList } from "../../store/object-params/object-status.store";
import PresentationCreatePageDialog from "../../components/UI/dialogs/presentations/presentation-create-page-dialog";

const initialState = {
  address: "",
  phone: "",
  name: "",
  cadastralNumber: "",
  fullDescription: "",
  objectActivity: "",
  startDate: null,
  endDate: null,
  selectedDistricts: [],
  selectedCities: [],
  selectedUsers: [],
  selectedStatuses: [],
  selectedCurrentRenters: [],
  selectedEstateTypes: [],
  selectedObjectTypes: [],
  selectedMetro: [],
};

const Objects = React.memo(() => {
  const [selectedBaloon, setSelectedBaloon] = useState(null);
  const [rowSelection, setRowSelection] = useState([]);
  const [selectedObjects, setSelectedObjects] = useState([]);

  const localStorageState = JSON.parse(
    localStorage.getItem("search-objects-data")
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
  const isInputEmpty = JSON.stringify(initialState) !== JSON.stringify(data);

  const objects = useSelector(getObjectsList());
  const objectsSatuses = useSelector(getObjectsStatusList());
  const isLoading = useSelector(getObjectsLoadingStatus());
  const selectedObject = useSelector(getObjectById(selectedBaloon));

  const currentUserId = useSelector(getCurrentUserId());
  const isCurator = useSelector(getIsUserCurator(currentUserId));
  const columns = isCurator ? objectsColumnsCurator : objectsColumns;

  const searchedObjects = useSearchObject(objects, data);
  const sortedObjects = useMemo(() => {
    return orderBy(searchedObjects, ["created_at"], ["desc"]);
  }, [searchedObjects]);
  const modifiedObjectsData = useModifyObjectToExportExel(sortedObjects);

  useEffect(() => {
    localStorage.setItem("search-objects-data", JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    const hasLocalStorageData = localStorage.getItem("search-objects-data");

    if (hasLocalStorageData?.length) {
      localStorage.setItem("search-objects-data", JSON.stringify(initialState));
    }
  }, []);

  useEffect(() => {
    const getObjectsIdFromRowSelection = () => {
      return Object.keys(rowSelection)
        .map((index) => {
          const objectIndex = parseInt(index, 10);
          if (
            !isNaN(objectIndex) &&
            objectIndex >= 0 &&
            objectIndex < sortedObjects.length
          ) {
            return sortedObjects[objectIndex]._id;
          }
          return null;
        })
        .filter((objectId) => objectId !== null);
    };

    setSelectedObjects(getObjectsIdFromRowSelection());
  }, [rowSelection]);

  return (
    <>
      <LayoutTitle title="Таблица объектов" />
      <AddAndClearFiltersButton
        isInputEmpty={isInputEmpty}
        reset={reset}
        initialState={initialState}
        button={
          <>
            <CreateObjectButton />
            {isCurator && <TransferObjectToAnotherManagerButton />}
          </>
        }
      />

      <ItemsOnMap
        items={searchedObjects}
        onClick={setSelectedBaloon}
        baloon={<ObjectBaloon object={selectedObject} />}
        isLoading={isLoading}
      />
      <ObjectsFiltersPanel
        data={data}
        objects={objects}
        statuses={objectsSatuses}
        register={register}
        setValue={setValue}
        isCurator={isCurator}
        isLoading={isLoading}
      />
      <BasicTable
        rowSelection={rowSelection}
        setRowSelection={setRowSelection}
        items={sortedObjects}
        itemsColumns={columns}
        isLoading={isLoading}
      />
      {isCurator && <ExportToExelButton
        title="Скачать объекты в EXEL"
        data={modifiedObjectsData}
      />}

      <ObjectCreatePageDialog />
      <ObjectPageDialog />
      <ObjectUpdatePageDialog />
      <PresentationCreatePageDialog/>
      <TransferObjectToAnotherManagerDialog
        objectsToTransfer={selectedObjects}
        setRowSelection={setRowSelection}
      />
    </>
  );
});

export default Objects;
