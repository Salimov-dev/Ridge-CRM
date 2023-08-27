// libraries
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
// MUI
import { Box } from "@mui/material";
// components
import Baloon from "./map/baloon";
import { groupedColumns } from "./table/columns";
import FiltersPanel from "./components/filters-panel";
import BasicTable from "../../components/common/table/basic-table";
import LayoutTitle from "../../components/common/page-titles/layout-title";
import ItemsOnMap from "../../components/common/map/items-on-map/items-on-map";
// store
import {
  getObjectById,
  getObjectsList,
  getObjectsLoadingStatus,
} from "../../store/objects.store";
// hooks
import useSearchObject from "../../hooks/use-search-object";
import AddAndClearFiltersButton from "../../components/common/buttons/add-and-clear-filters-button";

const initialState = {
  address: "",
  phone: "",
  name: "",
  onlyWithPhone: false,
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

  const columns = groupedColumns;
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
    onlyWithPhone: Boolean(localStorageState?.onlyWithPhone),
  };

  const { register, watch, setValue, reset } = useForm({
    defaultValues: Boolean(localStorageState) ? formatedState : initialState,
    mode: "onBlur",
  });

  const data = watch();
  const isInputEmpty = JSON.stringify(initialState) !== JSON.stringify(data);
  const searchedObjects = useSearchObject({
    objects,
    data,
  });

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
    <Box sx={{ width: "100%" }}>
      <LayoutTitle title="Таблица объектов" />
      <AddAndClearFiltersButton
        title="Добавить объект"
        isInputEmpty={isInputEmpty}
        reset={reset}
        initialState={initialState}
        path="create"
      />
      <ItemsOnMap
        items={searchedObjects}
        mapZoom={mapZoom}
        hintContent={(item) =>
          `${item?.location?.city}, ${item?.location?.address}`
        }
        center={center}
        onClick={setSelectedBaloon}
        baloon={<Baloon object={selectedObject} />}
        isLoading={isLoading}
      />

      <FiltersPanel
        data={data}
        register={register}
        objects={objects}
        setValue={setValue}
        isLoading={isLoading}
      />

      <BasicTable
        items={searchedObjects}
        itemsColumns={columns}
        isLoading={isLoading}
      />
    </Box>
  );
};

export default Objects;
