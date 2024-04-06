// libraries
import { useTheme } from "@emotion/react";
import { tokens } from "@theme/theme";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
// components
import SuccessCancelFormButtons from "@components/common/buttons/success-cancel-form-buttons";
import LoaderFullWindow from "@components/common/loader/loader-full-window";
import HeaderWithCloseButton from "@components/common/page-headers/header-with-close-button";
import Message from "./components/message";
import DialogConfirm from "@components/common/dialog/dialog-confirm";
// schemas
import { updateUserSchema } from "@schemas/user/update-user.schema";
// forms
import UserForm from "@forms/user/create-user/user-form";
// store
import { getUserDataById, updateTeammate } from "@store/user/users.store";

const UpdateUser = React.memo(({ userId, onClose }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const user = useSelector(getUserDataById(userId));

  const transformedUser = { ...user, role: user?.role[0] };

  const [open, setOpen] = useState(false);
  const [color, setColor] = useState(user?.color);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm({
    defaultValues: transformedUser,
    mode: "onChange",
    resolver: yupResolver(updateUserSchema)
  });

  const data = watch();

  const onSubmit = () => {
    setIsLoading(true);

    dispatch<any>(updateTeammate(data))
      .then(() => {
        onClose();
        toast.success("Пользователь успешно изменен!");
      })
      .catch((error) => {
        console.log("error", error);

        toast.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleColorChange = (color) => {
    setColor(color);
    setValue("color", color?.hex);
  };

  const handleRemoveUser = (userId) => {
    // dispatch<any>(removeUser(userId)).then(onClose());
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <HeaderWithCloseButton
        title="Править члена команды"
        background={data?.isActive ? "green" : "crimson"}
        margin="0 0 20px 0"
        onClose={onClose}
      />
      <UserForm
        register={register}
        data={data}
        errors={errors}
        color={color}
        setValue={setValue}
        watch={watch}
        onColorChange={handleColorChange}
        isUpdatePage={true}
      />
      {data?.isActive ? (
        <Message
          title="Пользователь активирован, доступ к Грядке открыт, взымается плата"
          background="green"
        />
      ) : (
        <Message
          title="Пользователь отключен, доступ к Грядке закрыт, плата не взымается"
          background="crimson"
        />
      )}
      <SuccessCancelFormButtons
        onSuccess={handleSubmit(onSubmit)}
        onCancel={onClose}
        onRemove={handleClickOpen}
        isUpdate={true}
        disabledRemoveButton={true}
      />
      <LoaderFullWindow
        color={colors.grey[600]}
        size={75}
        isLoading={isLoading}
      />
      <DialogConfirm
        question="Вы уверены, что хотите удалить безвозвратно?"
        open={open}
        onClose={handleClose}
        onSuccessClick={() => handleRemoveUser(userId)}
      />
    </>
  );
});

export default UpdateUser;
