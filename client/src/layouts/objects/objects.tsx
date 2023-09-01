// libraries
import dayjs from "dayjs";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
// MUI
import { Box } from "@mui/material";
// components
import Baloon from "./map/baloon";
import { objectsColumns } from "./table/objects-columns";
import FilterPanel from "./components/filters-panel";
import BasicTable from "../../components/common/table/basic-table";
import LayoutTitle from "../../components/common/page-titles/layout-title";
import ItemsOnMap from "../../components/common/map/items-on-map/items-on-map";
import DialogStyled from "../../components/common/dialog/dialog-styled";
import AddAndClearFiltersButton from "../../components/common/buttons/add-and-clear-filters-button";
import UpdateObject from "../../components/pages/update-object/update-object";
import CreateObject from "../../components/pages/create-object/create-object";
// hooks
import useObjects from "../../hooks/use-objects";
import useSearchObject from "../../hooks/use-search-object";
// store
import {
  getObjectById,
  getObjectsList,
  getObjectsLoadingStatus,
} from "../../store/object/objects.store";
import {
  loadUpdateObjectOpenState,
  setUpdateObjectOpenState,
} from "../../store/object/update-object.store";

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
  const [openCreate, setOpenCreate] = useState(false);
  const objects = useSelector(getObjectsList());
  const columns = objectsColumns;

  const selectedObject = useSelector(getObjectById(selectedBaloon));
  const isOpenUpdate = useSelector(loadUpdateObjectOpenState());
  const isLoading = useSelector(getObjectsLoadingStatus());

  const {
    center,
    mapZoom,
    handleOpenCreate,
    handleCloseCreate,
    handleCloseUpdate,
  } = useObjects(setOpenCreate, setUpdateObjectOpenState);

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
        onOpen={handleOpenCreate}
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

      <FilterPanel
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

      <DialogStyled
        component={<CreateObject onClose={handleCloseCreate} />}
        onClose={handleCloseCreate}
        open={openCreate}
        maxWidth="lg"
      />

      <DialogStyled
        component={<UpdateObject onClose={handleCloseUpdate} />}
        onClose={handleCloseUpdate}
        open={isOpenUpdate}
        maxWidth="lg"
      />
    </Box>
  );
};

export default Objects;
