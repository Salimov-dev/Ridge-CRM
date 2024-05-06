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
import HeaderWithCloseButtonForPage from "@components/common/headers/header-with-close-button.page";
import DialogConfirm from "@components/common/dialog/dialog-confirm";
import MessageUpdateUser from "./components/message.update-user";
// schemas
import { updateUserSchema } from "@schemas/user/update-user.schema";
// forms
import UserForm from "@forms/user/user-form";
// store
import { getUserDataById, updateTeammate } from "@store/user/users.store";

const UpdateUser = React.memo(({ userId, onClose }) => {
  const dispatch: any = useDispatch();
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

  const handleOpenConfirm = () => {
    setOpen(true);
  };

  const handleCloseConfirm = () => {
    setOpen(false);
  };

  const onSubmit = () => {
    setIsLoading(true);

    console.log("data", data);

    dispatch(updateTeammate(data))
      .then(() => {
        handleCloseConfirm();
        onClose();
        toast.success("Пользователь успешно изменен!");
      })
      .catch((error: string) => {
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

  return (
    <>
      <HeaderWithCloseButtonForPage
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
        onColorChange={handleColorChange}
        isUpdatePage={true}
      />
      {data?.isActive ? (
        <MessageUpdateUser
          title="Пользователь активирован, доступ к Грядке открыт, взымается плата"
          background="green"
        />
      ) : (
        <MessageUpdateUser
          title="Пользователь отключен, доступ к Грядке закрыт, плата не взымается"
          background="crimson"
        />
      )}
      <SuccessCancelFormButtons
        onSuccess={handleOpenConfirm}
        onCancel={onClose}
        disabledRemoveButton={true}
      />
      <LoaderFullWindow
        color={colors.grey[600]}
        size={75}
        isLoading={isLoading}
      />
      <DialogConfirm
        question="Любое изменение пользователя (статус, цвет, город и тп) воспринимается Программой как работа с Пользователем и за этот день произойдет списание платы за Подписку"
        open={open}
        onClose={handleCloseConfirm}
        onSuccessClick={handleSubmit(onSubmit)}
      />
    </>
  );
});

export default UpdateUser;
