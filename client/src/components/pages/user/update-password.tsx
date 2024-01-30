import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { toast } from "react-toastify";
// components
import TitleWithCloseButton from "@components/common/page-headers/header-with-close-button";
import UserProfileForm from "@components/common/forms/user-profile.form";
import SuccessCancelFormButtons from "@components/common/forms/buttons/success-cancel-form-buttons";
import LoaderFullWindow from "@components/common/loader/loader-full-window";
// schemas
import { userProfileSchema } from "@schemas/user-profile.schema";
// store
import {
  getCurrentUserData,
  updatePassword,
  updateUser,
} from "@store/user/users.store";
import UpdatePasswordForm from "@components/common/forms/update-password-form";
import { passwordUpdateSchema } from "@schemas/password-update.schema";

const initialState = {
  currentPassword: "",
  newPassword: "",
};

const UpdatePassword = ({ onClose }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector(getCurrentUserData());

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: initialState,
    mode: "onChange",
    resolver: yupResolver(passwordUpdateSchema),
  });
  const data = watch();

  const onSubmit = () => {
    setIsLoading(true);
    console.log("data", data);

    dispatch<any>(updatePassword(data))
      .then(() => {
        onClose();
        toast.success("Пароль успешно измененен!");
      })
      .catch((error) => {
        toast.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <TitleWithCloseButton
        title="Изменить пароль"
        background="red"
        color="white"
        onClose={onClose}
      />
      <UpdatePasswordForm data={data} register={register} errors={errors} />
      <SuccessCancelFormButtons
        onSuccess={handleSubmit(onSubmit)}
        onCancel={onClose}
        isUpdate={false}
      />
      <LoaderFullWindow isLoading={isLoading} />
    </>
  );
};

export default UpdatePassword;
