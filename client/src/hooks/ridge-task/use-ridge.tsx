import { useEffect } from "react";
import getMonth from "../../utils/calendar/get-month";

const useRidge = (
  data,
  initialState,
  setValue,
  monthIndex,
  setCurrentMonth
) => {
  const objectInitialState = {
    comment: "",
    contacts: "",
    status: "",
    objectActivity: "",
    selectedStatuses: [],
    selectedDistricts: [],
    selectedCities: [],
    selectedMetro: [],
    startDate: null,
    endDate: null,
  };
  const objectData = {
    comment: data.comment,
    contacts: data.contacts,
    status: data.status,
    objectActivity: data.objectActivity,
    selectedStatuses: data.selectedStatuses,
    selectedDistricts: data.selectedDistricts,
    selectedCities: data.selectedCities,
    selectedMetro: data.selectedMetro,
    startDate: data.startDate,
    endDate: data.endDate,
  };
  const isInputObjectEmpty =
    JSON.stringify(objectInitialState) !== JSON.stringify(objectData);

  const taskInitialState = { task: "", result: "", selectedTaskTypes: [] };
  const taskData = {
    task: data.task,
    result: data.result,
    selectedTaskTypes: data.selectedTaskTypes,
  };
  const isInputTaskEmpty =
    JSON.stringify(taskInitialState) !== JSON.stringify(taskData);

  const handleClearObjectForm = () => {
    setValue("comment", "");
    setValue("contacts", "");
    setValue("selectedStatuses", []);
    setValue("selectedDistricts", []);
    setValue("selectedCities", []);
    setValue("selectedMetro", []);
    setValue("startDate", null);
    setValue("endDate", null);
    setValue("objectActivity", "");
  };

  const handleClearTaskForm = () => {
    setValue("task", "");
    setValue("result", "");
    setValue("selectedTaskTypes", []);
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
  return {
    isInputObjectEmpty,
    isInputTaskEmpty,
    handleClearObjectForm,
    handleClearTaskForm,
  };
};

export default useRidge;
