import { Box } from "@mui/material";
import { orderBy } from "lodash";
import LayoutTitle from "../../components/common/page-titles/layout-title";
import AddAndClearFiltersButton from "../../components/common/buttons/add-and-clear-filters-button";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import { useForm } from "react-hook-form";
import useSearchObject from "../../hooks/object/use-search-object";
import {
  getRidgeObjectById,
  getRidgeObjectsList,
  getRidgeObjectsLoadingStatus,
} from "../../store/ridge-object/ridge-objects.store";
import { ridgeObjectsColumns } from "../../columns/ridge-columns/ridge-objects-columns";
import ItemsOnMap from "../../components/common/map/items-on-map/items-on-map";
import ObjectBaloon from "../../components/UI/maps/object-baloon";
import BasicTable from "../../components/common/table/basic-table";
import RidgeObjectCreatePageDialog from "../../components/UI/dialogs/ridge-objects/ridge-object-create-page-dialog";
import CreateRidgeObjectButton from "../../components/UI/dialogs/buttons/create-ridge-object-button";
import ObjectCreatePageDialog from "../../components/UI/dialogs/objects/object-create-page-dialog";
import RidgeObjectUpdatePageDialog from "../../components/UI/dialogs/ridge-objects/ridge-object-update-page-dialog";
import RidgeObjectBaloon from "../../components/UI/maps/ridge-object-baloon";
import ObjectFromRidgeCreatePageDialog from "../../components/UI/dialogs/ridge-objects/object-from-ridge-create-page-dialog";

const initialState = {
  address: "",
  phone: "",
  name: "",
  status: "",
  selectedDistricts: [],
  selectedCities: [],
  selectedMetro: [],
  startDate: null,
  endDate: null,
};

const Ridge = () => {
  const [selectedBaloon, setSelectedBaloon] = useState(null);
  const objects = useSelector(getRidgeObjectsList());
  const selectedObject = useSelector(getRidgeObjectById(selectedBaloon));
  const columns = ridgeObjectsColumns;
  const center = [59.930320630519155, 30.32906024941998];
  const mapZoom = 11;
  const isLoading = useSelector(getRidgeObjectsLoadingStatus());

  const localStorageState = JSON.parse(
    localStorage.getItem("search-ridge-data")
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
    const hasLocalStorageData = localStorage.getItem("search-ridge-data");

    if (hasLocalStorageData?.length) {
      localStorage.setItem("search-ridge-data", JSON.stringify(initialState));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("search-ridge-data", JSON.stringify(data));
  }, [data]);
  return (
    <Box sx={{ width: "100%" }}>
      <LayoutTitle title="Грядка объектов" />
      <AddAndClearFiltersButton
        isInputEmpty={isInputEmpty}
        reset={reset}
        initialState={initialState}
        button={<CreateRidgeObjectButton/>}
      />
      <ItemsOnMap
        items={searchedObjects}
        mapZoom={mapZoom}
        hintContent={(item) =>
          `${item?.location?.city}, ${item?.location?.address}`
        }
        center={center}
        onClick={setSelectedBaloon}
        baloon={<RidgeObjectBaloon object={selectedObject} />}
        isLoading={isLoading}
      />

      {/* <ObjectsFiltersPanel
        data={data}
        register={register}
        objects={objects}
        setValue={setValue}
        isLoading={isLoading}
      /> */}

      <BasicTable
        items={sortedObjects}
        itemsColumns={columns}
        isLoading={isLoading}
      />

      <RidgeObjectUpdatePageDialog/>
      <RidgeObjectCreatePageDialog/>
      <ObjectFromRidgeCreatePageDialog />
    </Box>
  );
};

export default Ridge;
