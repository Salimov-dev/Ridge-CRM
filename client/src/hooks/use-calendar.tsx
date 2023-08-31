import { toast } from "react-toastify";
import { capitalizeFirstLetter } from "../utils/data/capitalize-first-letter";
import { useDispatch } from "react-redux";
import { createTask } from "../store/task/tasks.store";

const useCalendar = (
  data,
  setOpenCreateManagerTask,
  setOpenCreateMyTask,
  setValue,
  reset
) => {
  const dispatch = useDispatch();

  const handleopenCreateMyTaskManagerTask = () => {
    setOpenCreateManagerTask(true);
  };

  const handleopenCreateMyTaskMyTask = () => {
    setOpenCreateMyTask(true);
  };

  const handleCloseCreate = () => {
    setOpenCreateMyTask(false);
    setValue("date", null);
    reset();
  };

  const handleCloseCreateManagerTask = () => {
    setOpenCreateManagerTask(false);
    setValue("date", null);
    reset();
  };

  const onSubmitManagerTask = () => {
    const newData = {
      ...data,
      comment: capitalizeFirstLetter(data.comment),
    };
    dispatch(createTask(newData))
      .then(handleCloseCreateManagerTask())
      .then(toast.success("Задача успешно создана!"));
  };

  const onSubmitMyTask = () => {
    const newData = {
      ...data,
      comment: capitalizeFirstLetter(data.comment),
      managerId: null,
    };
    dispatch(createTask(newData))
      .then(handleCloseCreate())
      .then(toast.success("Задача успешно создана!"));
  };

  return {
    onSubmitMyTask,
    onSubmitManagerTask,
    handleCloseCreate,
    handleCloseCreateManagerTask,
    handleopenCreateMyTaskMyTask,
    handleopenCreateMyTaskManagerTask,
  };
};

export default useCalendar;
