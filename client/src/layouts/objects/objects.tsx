// libraries
import dayjs from "dayjs";
import { orderBy } from "lodash";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
// columns
import { objectsColumns } from "../../columns/objects-columns/objects-columns";
import { objectsColumnsCurator } from "../../columns/objects-columns/objects-columns-curator";
// components
import ObjectBaloon from "../../components/UI/maps/object-baloon";
import ObjectsFiltersPanel from "../../components/UI/filters-panels/obects-filters-panel";
import BasicTable from "../../components/common/table/basic-table";
import LayoutTitle from "../../components/common/page-titles/layout-title";
import ItemsOnMap from "../../components/common/map/items-on-map/items-on-map";
import AddAndClearFiltersButton from "../../components/common/buttons/add-and-clear-filters-button";
import ObjectPageDialog from "../../components/UI/dialogs/object-page-dialog/object-page-dialog";
import ObjectUpdatePageDialog from "../../components/UI/dialogs/objects/object-update-page-dialog";
import ObjectCreatePageDialog from "../../components/UI/dialogs/objects/object-create-page-dialog";
import CreateObjectButton from "../../components/UI/dialogs/buttons/create-object-button";
import ExportToExelButton from "../../components/common/buttons/export-to-excel-button";
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

const Objects = () => {
  const [selectedBaloon, setSelectedBaloon] = useState(null);

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
  const sortedObjects = orderBy(searchedObjects, ["created_at"], ["desc"]);
  const modifiedObjectsData = useModifyObjectToExportExel(sortedObjects);

  useEffect(() => {
    const hasLocalStorageData = localStorage.getItem("search-objects-data");

    if (hasLocalStorageData?.length) {
      localStorage.setItem("search-objects-data", JSON.stringify(initialState));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("search-objects-data", JSON.stringify(data));
  }, [data]);

  return (
    <>
      <LayoutTitle title="Таблица объектов" />
      <AddAndClearFiltersButton
        isInputEmpty={isInputEmpty}
        reset={reset}
        initialState={initialState}
        button={<CreateObjectButton />}
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
        items={sortedObjects}
        itemsColumns={columns}
        isLoading={isLoading}
      />
      <ExportToExelButton
        title="Скачать объекты в EXEL"
        data={modifiedObjectsData}
      />

      <ObjectCreatePageDialog />
      <ObjectPageDialog />
      <ObjectUpdatePageDialog />
    </>
  );
};

export default Objects;
