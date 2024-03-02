import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { toast } from "react-toastify";
// components
import TitleWithCloseButton from "@components/common/page-headers/header-with-close-button";
import SuccessCancelFormButtons from "@components/common/buttons/success-cancel-form-buttons";
import LoaderFullWindow from "@components/common/loader/loader-full-window";
// schemas
import { passwordUpdateSchema } from "@schemas/auth/password-update.schema";
// store
import { updatePassword } from "@store/user/users.store";
// forms
import UpdatePasswordForm from "@forms/user/update-password-form";

const initialState = {
  currentPassword: "",
  newPassword: ""
};

const UpdatePassword = ({ onClose }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: initialState,
    mode: "onChange",
    resolver: yupResolver(passwordUpdateSchema)
  });
  const data = watch();

  const onSubmit = () => {
    setIsLoading(true);

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
