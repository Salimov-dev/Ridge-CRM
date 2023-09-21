import { useState } from "react";
import { Box } from "@mui/material";
import { orderBy } from "lodash";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import { useForm } from "react-hook-form";
// components
import LayoutTitle from "../../components/common/page-titles/layout-title";
import AddAndClearFiltersButton from "../../components/common/buttons/add-and-clear-filters-button";
import ItemsOnMap from "../../components/common/map/items-on-map/items-on-map";
import BasicTable from "../../components/common/table/basic-table";
import CreateRidgeObjectButton from "../../components/UI/dialogs/buttons/create-ridge-object-button";
import RidgeObjectBaloon from "../../components/UI/maps/ridge-object-baloon";
import RidgeObjectsFiltersPanel from "../../components/UI/filters-panels/ridge-objects-filters-panel";
import CalendarBody from "../../components/common/calendar/calendar-body/calendar-body";
import Header from "../../components/common/calendar/header/header";
import CreateRidgeTasksButtons from "./components/create-ridge-tasks-buttons/create-ridge-tasks-buttons";
import Dialogs from "./components/dialogs/dialogs";
import TasksTable from "../../components/common/tasks/tasks-table";
// hooks
import useSearchRidgeObject from "../../hooks/ridge/use-search-ridge-object";
import useSearchTask from "../../hooks/task/use-search-task";
import useRidge from "../../hooks/ridge/use-ridge";
// utils
import getMonth from "../../utils/calendar/get-month";
// columns
import { ridgeObjectsColumns } from "../../columns/ridge-columns/ridge-objects-columns";
import { ridgeTasksColumns } from "../../columns/ridge-tasks-columns/ridge-tasks-columns";
// store
import { getMonthIndexState } from "../../store/month-index.store";
import { getRidgeTasksList } from "../../store/ridge-task/ridge-tasks.store";
import {
  getRidgeObjectById,
  getRidgeObjectsList,
  getRidgeObjectsLoadingStatus,
} from "../../store/ridge-object/ridge-objects.store";

const initialState = {
  address: "",
  comment: "",
  phone: "",
  status: "",
  selectedStatuses: [],
  selectedDistricts: [],
  selectedCities: [],
  selectedMetro: [],
  startDate: null,
  endDate: null,
  task: "",
  result: "",
  selectedTaskTypes: [],
  objectActivity: "",
};

const Ridge = () => {
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const [dateCreate, setDateCreate] = useState(null);
  const [selectedBaloon, setSelectedBaloon] = useState(null);
  const monthIndex = useSelector(getMonthIndexState());

  const tasksColumn = ridgeTasksColumns;
  const tasksList = useSelector(getRidgeTasksList());

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

  const { register, watch, reset, setValue } = useForm({
    defaultValues: Boolean(localStorageState) ? formatedState : initialState,
    mode: "onBlur",
  });

  const data = watch();

  const {
    isInputObjectEmpty,
    isInputTaskEmpty,
    handleClearObjectForm,
    handleClearTaskForm,
  } = useRidge(data, initialState, setValue, monthIndex, setCurrentMonth);

  const searchedTasks = useSearchTask(tasksList, data);
  const sortedTasks = orderBy(searchedTasks, ["date"], ["asc"]);

  const searchedObjects = useSearchRidgeObject(objects, data);
  const sortedObjects = orderBy(searchedObjects, ["created_at"], ["desc"]);

  const getTask = (day) => {
    const currentTasks = tasksList?.filter((task) => {
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

  return (
    <Box sx={{ width: "100%" }}>
      <LayoutTitle title="Грядка объектов" />
      <AddAndClearFiltersButton
        isInputEmpty={isInputObjectEmpty}
        reset={handleClearObjectForm}
        initialState={initialState}
        button={<CreateRidgeObjectButton />}
      />
      <ItemsOnMap
        items={sortedObjects}
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
        tasks={getTask}
        currentMonth={currentMonth}
        setDateCreate={setDateCreate}
        background="darkGreen"
      />
      <TasksTable
        register={register}
        data={data}
        tasks={sortedTasks}
        columns={tasksColumn}
        setValue={setValue}
        isRidgeObject={true}
        isInputEmpty={isInputTaskEmpty}
        reset={handleClearTaskForm}
        initialState={initialState}
      />

      <Dialogs
        objects={sortedObjects}
        dateCreate={dateCreate}
        setDateCreate={setDateCreate}
      />
    </Box>
  );
};

export default Ridge;
