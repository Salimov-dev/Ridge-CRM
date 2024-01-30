import TitleWithCloseButton from "@components/common/page-headers/header-with-close-button";
import SuccessCancelFormButtons from "@components/common/forms/buttons/success-cancel-form-buttons";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUserData, getCurrentUserId } from "@store/user/users.store";
import { getUserAvatarsLoadingStatus } from "@store/avatar/avatar.store";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { toast } from "react-toastify";
import UserProfileForm from "@components/common/forms/user-profile.form";
import { userProfileSchema } from "@schemas/user-profile.schema";

const UpdateProfile = ({ onClose }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector(getCurrentUserData());
  console.log("user", user);

  const isUserLoading = useSelector(getUserAvatarsLoadingStatus());
  const currentUserId = useSelector(getCurrentUserId());
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: user,
    mode: "onChange",
    resolver: yupResolver(userProfileSchema),
  });
  const data = watch();
  console.log("errors", errors);

  const onSubmit = () => {
    // setIsLoading(true);
    console.log("data", data);

    // dispatch<any>(updateMeeting(newData))
    //   .then(() => {
    //     onClose();
    //     toast.success("Данные профиля успешно изменены!");
    //   })
    //   .catch((error) => {
    //     toast.error(error);
    //   })
    //   .finally(() => {
    //     setIsLoading(false);
    //   });
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
    </>
  );
};

export default UpdateProfile;
