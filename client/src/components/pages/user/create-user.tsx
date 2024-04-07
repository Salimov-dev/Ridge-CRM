// libraries
import { Box } from "@mui/material";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
// components
import TitleWithCloseButton from "@common/page-headers/header-with-close-button";
import UserForm from "@forms/user/create-user/user-form";
import SuccessCancelFormButtons from "@components/common/buttons/success-cancel-form-buttons";
import LoaderFullWindow from "@components/common/loader/loader-full-window";
// schema
import { createUserSchema } from "@schemas/user/create-user.schema";
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

  useEffect(() => {
    setValue("city", currentUserData?.city);
  }, [currentUserData]);

  useEffect(() => {
    setValue("curatorId", currentUserId);
  }, [currentUserId]);

  return (
    <Box>
      <TitleWithCloseButton
        title="Добавить участника"
        onClose={onClose}
        background="orange"
      />
      <UserForm
        register={register}
        data={data}
        errors={errors}
        color={color}
        setValue={setValue}
        watch={watch}
        onColorChange={handleColorChange}
      />
      <Instruction />
      <SuccessCancelFormButtons
        successTitle="Добавить"
        onSuccess={handleSubmit(onSubmit)}
        onCancel={onClose}
        disabledRemoveButton={true}
      />
      <LoaderFullWindow isLoading={isLoading} />
    </Box>
  );
});

export default CreateUser;
