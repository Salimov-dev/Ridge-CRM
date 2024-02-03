import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { toast } from "react-toastify";
// components
import TitleWithCloseButton from "@components/common/page-headers/header-with-close-button";
import UserProfileForm from "@components/common/forms/user-profile.form";
import SuccessCancelFormButtons from "@components/common/buttons/success-cancel-form-buttons";
import LoaderFullWindow from "@components/common/loader/loader-full-window";
// schemas
import { userProfileSchema } from "@schemas/user-profile.schema";
// store
import { getCurrentUserData, updateUser } from "@store/user/users.store";

const UpdateProfile = ({ onClose }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector(getCurrentUserData());

  const formatedUserData = {
    ...user,
    birthday: user?.birthday ? dayjs(user?.birthday) : null
  };

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm({
    defaultValues: formatedUserData,
    mode: "onChange",
    resolver: yupResolver(userProfileSchema)
  });
  const data = watch();

  const onSubmit = () => {
    setIsLoading(true);

    dispatch<any>(updateUser(data))
      .then(() => {
        onClose();
        toast.success("Данные профиля успешно изменены!");
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
        title="Обновить данные профиля"
        background="red"
        color="white"
        onClose={onClose}
      />
      <UserProfileForm
        data={data}
        register={register}
        errors={errors}
        setValue={setValue}
      />
      <SuccessCancelFormButtons
        onSuccess={handleSubmit(onSubmit)}
        onCancel={onClose}
        isUpdate={false}
      />
      <LoaderFullWindow isLoading={isLoading} />
    </>
  );
};

export default UpdateProfile;
