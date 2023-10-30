// libraries
import dayjs from "dayjs";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
// components
import TitleWithCloseButton from "../../common/page-titles/title-with-close-button";
import ManagerTaskForm from "../../common/forms/manager-task-form/manager-task-form";
import FooterButtons from "../../common/forms/footer-buttons/footer-buttons";
// store
import { createTask } from "../../../store/task/tasks.store";
// utils
import { capitalizeFirstLetter } from "../../../utils/data/capitalize-first-letter";
// schema
import { taskManagerSchema } from "../../../schemas/task-manager-shema";
import {
  getObjectById,
  getObjectsList,
} from "../../../store/object/objects.store";
import {
  getCurrentUserId,
  getIsUserCurator,
} from "../../../store/user/users.store";
import {
  getOpenObjectPageId,
  loadOpenObjectPageOpenState,
} from "../../../store/object/open-object-page.store";
import IsLoadingDialog from "../../common/dialog/is-loading-dialog";
import { toast } from "react-toastify";

const initialState = {
  comment: "",
  date: null,
  time: null,
  objectId: "",
  managerId: "",
  result: "",
  isDone: false,
};

const CreateManagerTask = ({ users, title, dateCreate, onClose }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: initialState,
    mode: "onBlur",
    resolver: yupResolver(taskManagerSchema),
  });
  const data = watch();
  const watchDate = watch<any>("date", null);
  const watchTime = watch<any>("time", null);
  const watchManagerId = watch("managerId", null);
  const isFullValid =
    isValid &&
    Boolean(watchDate) &&
    Boolean(watchTime) &&
    Boolean(watchManagerId);

  const currentUserId = useSelector(getCurrentUserId());
  const isCurator = useSelector(getIsUserCurator(currentUserId));

  const objects = useSelector(getObjectsList());
  const isObjectPage = useSelector(loadOpenObjectPageOpenState());
  const objectPageId = useSelector(getOpenObjectPageId());
  const currentObject = useSelector(getObjectById(objectPageId));
  const managerId = currentObject?.userId;

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

  const onSubmit = () => {
    setIsLoading(true);

    const newData = {
      ...data,
      comment: capitalizeFirstLetter(data.comment),
    };
    dispatch<any>(createTask(newData))
      .then(() => {
        setIsLoading(false);
        onClose();
        toast.success("Задача менеджеру успешно создана!");
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error);
      });
  };

  useEffect(() => {
    if (isObjectPage) {
      setValue<any>("objectId", objectPageId);
      setValue<any>("managerId", managerId);
    }
  }, [objectPageId]);

  useEffect(() => {
    if (dateCreate !== null) {
      setValue<any>("date", dateCreate);
    } else {
      setValue<any>("date", dayjs());
    }
  }, [dateCreate]);

  return isLoading ? (
    <IsLoadingDialog
      text="Немного подождите, создаем `Новую задачу менеджеру`"
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
        errors={errors}
        watch={watch}
        setValue={setValue}
        isCurator={isCurator}
        isObjectPage={isObjectPage}
      />
      <FooterButtons
        onCreate={handleSubmit(onSubmit)}
        onClose={onClose}
        isValid={isFullValid}
      />
    </>
  );
};

export default CreateManagerTask;
