import { Box } from "@mui/material";
import { orderBy } from "lodash";
import LayoutTitle from "../../components/common/page-titles/layout-title";
import AddAndClearFiltersButton from "../../components/common/buttons/add-and-clear-filters-button";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import { useForm } from "react-hook-form";
import {
  getRidgeObjectById,
  getRidgeObjectsList,
  getRidgeObjectsLoadingStatus,
} from "../../store/ridge-object/ridge-objects.store";
import { ridgeObjectsColumns } from "../../columns/ridge-columns/ridge-objects-columns";
import ItemsOnMap from "../../components/common/map/items-on-map/items-on-map";
import BasicTable from "../../components/common/table/basic-table";
import CreateRidgeObjectButton from "../../components/UI/dialogs/buttons/create-ridge-object-button";
import RidgeObjectBaloon from "../../components/UI/maps/ridge-object-baloon";
import RidgeObjectsFiltersPanel from "../../components/UI/filters-panels/ridge-objects-filters-panel";
import useSearchRidgeObject from "../../hooks/ridge-object/use-search-ridge-object";
import CalendarBody from "../../components/common/calendar/calendar-body/calendar-body";
import getMonth from "../../utils/calendar/get-month";
import { getMonthIndexState } from "../../store/month-index.store";
import Header from "../../components/common/calendar/header/header";
import CreateRidgeTasksButtons from "./components/create-ridge-tasks-buttons/create-ridge-tasks-buttons";
import RidgeTaskCreateDialog from "../../components/UI/dialogs/ridge-tasks/ridge-task-create-dialog";
import { getRidgeTasksList } from "../../store/ridge-task/ridge-tasks.store";
import Dialogs from "./components/dialogs/dialogs";

const initialState = {
  comment: "",
  contacts: "",
  status: "",
  selectedDistricts: [],
  selectedCities: [],
  selectedMetro: [],
  startDate: null,
  endDate: null,
};

const Ridge = () => {
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const [dateCreate, setDateCreate] = useState(null);
  const [selectedBaloon, setSelectedBaloon] = useState(null);

  const monthIndex = useSelector(getMonthIndexState());
  const tasks = useSelector(getRidgeTasksList());

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
  const searchedObjects = useSearchRidgeObject(objects, data);
  const sortedObjects = orderBy(searchedObjects, ["created_at"], ["desc"]);
  const isInputEmpty = JSON.stringify(initialState) !== JSON.stringify(data);

  const getTask = (day) => {
    const currentTasks = tasks?.filter((task) => {
      const taskDate = dayjs(task?.date);
      const targetDate = dayjs(day);
      return (
        taskDate.format("YYYY-MM-DD") === targetDate.format("YYYY-MM-DD") &&
        taskDate.isSame(targetDate, "day")
      );
    });

    const sortedTasks = orderBy(
      currentTasks,
      [(task) => dayjs(task.time)],
      ["asc"]
    );
    return sortedTasks;
  };

  useEffect(() => {
    const hasLocalStorageData = localStorage.getItem("search-ridge-data");

    if (hasLocalStorageData?.length) {
      localStorage.setItem("search-ridge-data", JSON.stringify(initialState));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("search-ridge-data", JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  return (
    <Box sx={{ width: "100%" }}>
      <LayoutTitle title="Грядка объектов" />
      <AddAndClearFiltersButton
        isInputEmpty={isInputEmpty}
        reset={reset}
        initialState={initialState}
        button={<CreateRidgeObjectButton />}
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
      <RidgeObjectsFiltersPanel
        data={data}
        objects={objects}
        register={register}
        setValue={setValue}
        isLoading={isLoading}
      />
      <BasicTable
        items={sortedObjects}
        itemsColumns={columns}
        isLoading={isLoading}
      />
      <Header buttons={<CreateRidgeTasksButtons />} />
      <CalendarBody
        currentMonth={currentMonth}
        setDateCreate={setDateCreate}
        tasks={getTask}
      />

      <RidgeTaskCreateDialog
        dateCreate={dateCreate}
        objects={sortedObjects}
        setDateCreate={setDateCreate}
      />

      <Dialogs />
    </Box>
  );
};

export default Ridge;
