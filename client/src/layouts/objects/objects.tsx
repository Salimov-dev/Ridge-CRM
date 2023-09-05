// libraries
import dayjs from "dayjs";
import { orderBy } from "lodash";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
// MUI
import { Box } from "@mui/material";
// components
import ObjectBaloon from "../../components/UI/maps/object-baloon";
import { objectsColumns } from "../../columns/objects-columns/objects-columns";
import ObjectsFiltersPanel from "../../components/UI/filters-panels/obects-filters-panel";
import BasicTable from "../../components/common/table/basic-table";
import LayoutTitle from "../../components/common/page-titles/layout-title";
import ItemsOnMap from "../../components/common/map/items-on-map/items-on-map";
import DialogStyled from "../../components/common/dialog/dialog-styled";
import AddAndClearFiltersButton from "../../components/common/buttons/add-and-clear-filters-button";
import ObjectPageDialog from "../../components/UI/dialogs/object-page-dialog/object-page-dialog";
import ObjectUpdatePageDialog from "../../components/UI/dialogs/objects/object-update-page";
import CreateObject from "../../components/pages/create-object/create-object";
// hooks
import useSearchObject from "../../hooks/object/use-search-object";
// store
import {
  getObjectById,
  getObjectsList,
  getObjectsLoadingStatus,
} from "../../store/object/objects.store";

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
  selectedObjectActivity: []
};

const Objects = () => {
  const [selectedBaloon, setSelectedBaloon] = useState(null);
  const [openCreate, setOpenCreate] = useState(false);
  const objects = useSelector(getObjectsList());
  const selectedObject = useSelector(getObjectById(selectedBaloon));
  const columns = objectsColumns;
  const center = [59.930320630519155, 30.32906024941998];
  const mapZoom = 11;
  const isLoading = useSelector(getObjectsLoadingStatus());

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
  const searchedObjects = useSearchObject(objects, data);
  const sortedObjects = orderBy(searchedObjects, ["created_at"], ["desc"]);
  const isInputEmpty = JSON.stringify(initialState) !== JSON.stringify(data);

  const handleOpenCreate = () => {
    setOpenCreate(true);
  };

  const handleCloseCreate = () => {
    setOpenCreate(false);
  };

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
        disabled={isLoading}
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
        register={register}
        objects={objects}
        setValue={setValue}
        isLoading={isLoading}
      />

      <BasicTable
        items={sortedObjects}
        itemsColumns={columns}
        isLoading={isLoading}
      />

      <DialogStyled
        component={<CreateObject onClose={handleCloseCreate} />}
        onClose={handleCloseCreate}
        open={openCreate}
        maxWidth="xl"
      />

      <ObjectPageDialog />
      <ObjectUpdatePageDialog />
    </Box>
  );
};

export default Objects;
