// libraries
import { Box } from "@mui/material";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
// components
import TitleWithCloseButton from "@common/page-headers/header-with-close-button";
import CreateUserForm from "@forms/user/create-user/create-user-form";
import SuccessCancelFormButtons from "@components/common/buttons/success-cancel-form-buttons";
import LoaderFullWindow from "@components/common/loader/loader-full-window";
// schema
import { createUserSchema } from "@schemas/create-user.schema";
// forms
import Instruction from "@forms/user/create-user/components/instruction";
// store
import {
  createNewUser,
  getCurrentUserData,
  getCurrentUserId
} from "@store/user/users.store";

const initialState = {
  email: "",
  password: null,
  curatorId: null,
  role: null,
  color: null,
  city: null
};

const CreateUser = React.memo(({ onClose }) => {
  const [color, setColor] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const currentUserId = useSelector(getCurrentUserId());
  const currentUserData = useSelector(getCurrentUserData());

  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({
    defaultValues: initialState,
    mode: "onBlur",
    resolver: yupResolver(createUserSchema)
  });

  const data = watch();

  const handleColorChange = (color) => {
    setColor(color);
    setValue("color", color?.hex);
    setValue("city", currentUserData?.city);
    setValue("password", "Qwer1234");
    setValue("curatorId", currentUserId);
  };

  const onSubmit = () => {
    setIsLoading(true);

    dispatch<any>(createNewUser(data))
      .then(() => {
        onClose();
        toast.success("Новый пользователь успешно создан");
      })
      .catch((error) => {
        toast.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Box>
      <TitleWithCloseButton
        title="Добавить участника"
        onClose={onClose}
        background="orange"
      />
      <CreateUserForm
        register={register}
        data={data}
        errors={errors}
        color={color}
        onColorChange={handleColorChange}
      />
      <Instruction />
      <SuccessCancelFormButtons
        successTitle="Добавить"
        onSuccess={handleSubmit(onSubmit)}
        onCancel={onClose}
      />
      <LoaderFullWindow isLoading={isLoading} />
    </Box>
  );
});

export default CreateUser;
