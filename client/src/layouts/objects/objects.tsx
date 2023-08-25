// libraries
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
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
import Map from "./components/map";
import Loader from "../../components/common/loader/loader";
// store
import {
  getObjectsList,
  getObjectsLoadingStatus,
} from "../../store/objects.store";
// hooks
import useSearchObject from "../../hooks/use-search-object";

const MapContainer = styled(Box)`
  width: 100%;
  height: 250px;
  margin-bottom: 10px;
  background-color: gray;
`;

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
  const objects = useSelector(getObjectsList());
  const columns = groupedColumns;
  const isLoading = useSelector(getObjectsLoadingStatus());
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
    <Box sx={{width: "100%"}}>
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

      <MapContainer>
        {!isLoading ? <Map searchedObjects={searchedObjects} /> : <Loader />}
      </MapContainer>

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
