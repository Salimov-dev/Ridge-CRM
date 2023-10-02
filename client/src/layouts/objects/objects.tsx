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
// hooks
import useSearchObject from "../../hooks/object/use-search-object";
// store
import { getIsUserCurator } from "../../store/user/users.store";
import {
  getObjectById,
  getObjectsList,
  getObjectsLoadingStatus,
} from "../../store/object/objects.store";

const initialState = {
  address: "",
  phone: "",
  name: "",
  cadastralNumber: "",
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
  const objects = useSelector(getObjectsList());
  const selectedObject = useSelector(getObjectById(selectedBaloon));
  const isLoading = useSelector(getObjectsLoadingStatus());
  const isCurator = useSelector(getIsUserCurator());

  const columns = isCurator ? objectsColumnsCurator : objectsColumns;

  const center = [59.930320630519155, 30.32906024941998];
  const mapZoom = 11;

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
  const searchedObjects = useSearchObject(objects, data);
  const sortedObjects = orderBy(searchedObjects, ["created_at"], ["desc"]);
  const isInputEmpty = JSON.stringify(initialState) !== JSON.stringify(data);

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
        mapZoom={mapZoom}
        hintContent={(item) =>
          `${item?.location?.city}, ${item?.location?.address}`
        }
        center={center}
        onClick={setSelectedBaloon}
        baloon={<ObjectBaloon object={selectedObject} />}
        isLoading={isLoading}
      />

      <ObjectsFiltersPanel
        data={data}
        objects={objects}
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

      <ObjectCreatePageDialog />
      <ObjectPageDialog />
      <ObjectUpdatePageDialog />
    </>
  );
};

export default Objects;
