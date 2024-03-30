// libraries
import { useTheme } from "@emotion/react";
import { tokens } from "@theme/theme";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
// components
import HeaderWithCloseButton from "@components/common/page-headers/header-with-close-button";
import SuccessCancelFormButtons from "@components/common/buttons/success-cancel-form-buttons";
import LoaderFullWindow from "@components/common/loader/loader-full-window";
// schema
import { taskManagerSchema } from "@schemas/task/task-manager.shema";
// utils
import { capitalizeFirstLetter } from "@utils/data/capitalize-first-letter";
// forms
import ManagerTaskForm from "@forms/tasks/manager-task.form";
// store
import { createTask } from "@store/task/tasks.store";
import { getObjectById, getObjectsList } from "@store/object/objects.store";
import { getCurrentUserId, getUsersList } from "@store/user/users.store";

const initialState = {
  comment: "",
  date: null,
  time: null,
  objectId: "",
  managerId: "",
  result: "",
  isDone: false,
  isCallTask: true
};

const CreateManagerTask = React.memo(
  ({ title, dateCreate, onClose, objectId, isObjectPage }) => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [isLoading, setIsLoading] = useState(false);

    const {
      register,
      watch,
      handleSubmit,
      setValue,
      formState: { errors }
    } = useForm({
      defaultValues: initialState,
      mode: "onChange",
      resolver: yupResolver(taskManagerSchema)
    });
    const data = watch();
    const watchManagerId = watch("managerId");

    const users = useSelector(getUsersList());
    const currentUserId = useSelector(getCurrentUserId());

    const usersWithoutCurrentUser = users?.filter(
      (user) => user?._id !== currentUserId
    );
    const userRoleManager = "69gfoep3944jgjdso345002";
    const managerUsersWithRole = usersWithoutCurrentUser?.filter(
      (user) => user?.role && user?.role.includes(userRoleManager)
    );
    const actualUsersArray = managerUsersWithRole?.map((user) => {
      const lastName = user?.lastName;
      const firstName = user?.firstName;

      return {
        _id: user._id,
        name: `${lastName ? lastName : "Без"} ${
          firstName ? firstName : "имени"
        }`
      };
    });

    const objectManagerId = watch("managerId");
    const objects = useSelector(getObjectsList());
    const managerObjects = objects?.filter(
      (obj) => obj.userId === objectManagerId
    );
    const currentObject = useSelector(getObjectById(objectId));
    const managerId = currentObject?.userId;

    const onSubmit = () => {
      setIsLoading(true);

      const newData = {
        ...data,
        comment: capitalizeFirstLetter(data.comment)
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
      setValue<any>("objectId", objectId);
      setValue<any>("managerId", managerId);
    }, []);

    useEffect(() => {
      if (dateCreate !== null) {
        setValue<any>("date", dateCreate);
      } else {
        setValue<any>("date", null);
      }
    }, [dateCreate]);

    useEffect(() => {
      setValue("objectId", null);
    }, [watchManagerId]);

    return (
      <>
        <HeaderWithCloseButton
          title={title}
          background={colors.task["managerTask"]}
          onClose={onClose}
          margin="0 0 20px 0"
        />
        <ManagerTaskForm
          data={data}
          objects={managerObjects}
          register={register}
          setValue={setValue}
          watch={watch}
          errors={errors}
          users={actualUsersArray}
          isObjectPage={isObjectPage}
        />
        <SuccessCancelFormButtons
          onSuccess={handleSubmit(onSubmit)}
          onCancel={onClose}
        />
        <LoaderFullWindow isLoading={isLoading} />
      </>
    );
  }
);

export default CreateManagerTask;
