// libraries
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
// MUI
import { Box, styled, Button, Typography } from "@mui/material";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
// components
import BasicTable from "../../components/common/table/basic-table";
import FiltersPanel from "./components/filters-panel";
import { groupedColumns } from "./table/columns";
import LayoutTitle from "../../components/common/page-titles/layout-title";
// store
import {
  getObjectById,
  getObjectsList,
  getObjectsLoadingStatus,
} from "../../store/objects.store";
// hooks
import useSearchObject from "../../hooks/use-search-object";
import ItemsOnMap from "../../components/common/map/items-on-map/items-on-map";
import Baloon from "./map/baloon";

const ButtonsBlock = styled(Box)`
  display: flex;
  margin-bottom: 10px;
  gap: 4px;
`;

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

  const navigate = useNavigate();

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

      <ButtonsBlock>
        <Button
          variant="contained"
          color="success"
          onClick={() => navigate("create")}
        >
          <Typography>Создать объект</Typography>
        </Button>
        {isInputEmpty && (
          <Button
            variant="outlined"
            color="success"
            onClick={() => reset(initialState)}
            sx={{ display: "flex", alignItems: "center", gap: "3px" }}
          >
            <Typography> Очистить фильтры</Typography>
            <ClearOutlinedIcon />
          </Button>
        )}
      </ButtonsBlock>

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
        register={register}
        objects={objects}
        data={data}
        initialState={initialState}
        setValue={setValue}
        reset={reset}
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
