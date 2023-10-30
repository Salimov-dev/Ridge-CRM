// liraries
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
// components
import TitleWithCloseButton from "../../common/page-titles/title-with-close-button";
import ManagerTaskForm from "../../common/forms/manager-task-form/manager-task-form";
// store
import {
  getCurrentUserId,
  getIsUserAuthorThisEntity,
  getIsUserCurator,
} from "../../../store/user/users.store";
import { getUpdateManagerTaskId } from "../../../store/task/update-manager-task.store";
import {
  getTaskById,
  getTaskLoadingStatus,
  removeTask,
  updateMyTask,
} from "../../../store/task/tasks.store";
// schema
import { taskSchema } from "../../../schemas/task-shema";
import FooterButtons from "../../common/forms/footer-buttons/footer-buttons";
import ConfirmRemoveDialog from "../../common/dialog/confirm-remove-dialog";
import { getObjectsList } from "../../../store/object/objects.store";
import { loadOpenObjectPageOpenState } from "../../../store/object/open-object-page.store";
import { toast } from "react-toastify";
import IsLoadingDialog from "../../common/dialog/is-loading-dialog";

const UpdateManagerTask = ({ title, onClose, users }) => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const taskId = useSelector(getUpdateManagerTaskId());
  const task = useSelector(getTaskById(taskId));
  const isTasksLoading = useSelector(getTaskLoadingStatus());

  const formatedTask = {
    ...task,
    date: task?.date ? dayjs(task?.date) : null,
    time: task?.time ? dayjs(task?.time) : null,
  };

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
  } = useForm({
    defaultValues: formatedTask,
    mode: "onBlur",
    resolver: yupResolver(taskSchema),
  });

  const data = watch();
  const watchDate = watch("date", null);
  const watchTime = watch("time", null);
  const watchManagerId = watch("managerId", null);
  const isFullValid = isValid && watchDate && watchTime;
  const isEditMode = taskId ? true : false;

  const objectId = task?.objectId;
  const currentUserId = useSelector(getCurrentUserId());
  const isAuthorEntity = useSelector(
    getIsUserAuthorThisEntity(currentUserId, task)
  );

  const isObjectPage = useSelector(loadOpenObjectPageOpenState());

  const isCurator = useSelector(getIsUserCurator(currentUserId));

  const objects = useSelector(getObjectsList());
  let addressCounts = {}; // Создаем объект для отслеживания количества объектов с одинаковыми адресами
  let transformObjects = [];
  const selectedManagerObjects = objects?.filter(
    (obj) => obj?.userId === watchManagerId
  );

  selectedManagerObjects.forEach((obj) => {
    const address = obj.location.address;

    // Если это адрес уже встречался, увеличиваем счетчик и добавляем индекс
    if (addressCounts[address]) {
      addressCounts[address]++;
      transformObjects.push({
        _id: obj._id,
        name: `${address} (${addressCounts[address]})`,
      });
    } else {
      // Иначе, просто добавляем адрес и устанавливаем счетчик в 1
      addressCounts[address] = 1;
      transformObjects.push({ _id: obj._id, name: address });
    }
  });

  const onSubmit = (data) => {
    setIsLoading(true);

    const transformedDate = dayjs(data.date).format("YYYY-MM-DDTHH:mm:ss.SSSZ");
    const transformedTime = dayjs(data.time).format("YYYY-MM-DDTHH:mm:ss.SSSZ");
    const newData = { ...data, date: transformedDate, time: transformedTime };

    dispatch<any>(updateMyTask(newData))
      .then(() => {
        setIsLoading(false);
        onClose();
        toast.success("Задача менеджеру успешно изменена!");
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error);
      });
  };

  const handleRemoveTask = (taskId) => {
    dispatch<any>(removeTask(taskId)).then(onClose());
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (objectId) {
      setValue("objectId", objectId);
    }
  }, [objectId]);

  return isLoading ? (
    <IsLoadingDialog
      text="Немного подождите, изменяем `Задачу задачу менеджеру`"
      isLoading={isLoading}
    />
  ) : (
    <>
      <TitleWithCloseButton
        title={title}
        background="Crimson"
        color="white"
        onClose={onClose}
      />
      <ManagerTaskForm
        data={data}
        objects={transformObjects}
        users={users}
        register={register}
        watch={watch}
        errors={errors}
        setValue={setValue}
        isCurator={isCurator}
        isAuthorEntity={isAuthorEntity}
        isEditMode={isEditMode}
        isTasksLoading={isTasksLoading}
        isObjectPage={isObjectPage}
      />
      <FooterButtons
        onUpdate={handleSubmit(onSubmit)}
        onClose={onClose}
        onRemove={handleClickOpen}
        isEditMode={isEditMode}
        isValid={isFullValid}
      />
      <ConfirmRemoveDialog
        removeId={taskId}
        open={open}
        onClose={handleClose}
        onRemove={handleRemoveTask}
      />
    </>
  );
};

export default UpdateManagerTask;
