// libraries
import dayjs from "dayjs";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTheme } from "@emotion/react";
import { tokens } from "@theme/theme";
import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
// components
import HeaderWithCloseButton from "@components/common/page-headers/header-with-close-button";
import SuccessCancelFormButtons from "@components/common/forms/buttons/success-cancel-form-buttons";
import LoaderFullWindow from "@components/common/loader/loader-full-window";
import ManagerForm from "@common/forms/manager/manager.form";
// store
import { getUserStatusesList } from "@store/user/user-statuses.store";
import { getUserDataById, updateUser } from "@store/user/users.store";
// schema
import { managerSchema } from "@schemas/manager.schema";

const UpdateManager = ({ userId, onClose }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const user = useSelector(getUserDataById(userId));
  const userStatuses = useSelector(getUserStatusesList());
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const formatedUser = {
    ...user,
    contract: {
      startDate: user?.contract.startDate
        ? dayjs(user?.contract.startDate)
        : null,
      endDate: user?.contract.endDate ? dayjs(user?.contract.endDate) : null,
      trialPeriod: user?.contract.trialPeriod
        ? dayjs(user?.contract.trialPeriod)
        : null,
    },
    birthday: user?.birthday ? dayjs(user?.birthday) : null,
  };

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
  } = useForm({
    defaultValues: formatedUser,
    mode: "onBlur",
    resolver: yupResolver(managerSchema),
  });

  const data = watch();

  const isEditMode = userId ? true : false;

  const isFullValid =
    data.contract.startDate !== null &&
    data.contract.endDate !== null &&
    data.birthday !== null &&
    isValid;

  const onSubmit = (data) => {
    setIsLoading(true);
    dispatch<any>(updateUser(data))
      .then(onClose())
      .catch((error) => {
        toast.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <HeaderWithCloseButton
        title={`Редактировать менеджера: ${user?.name.lastName} ${user?.name.firstName} ${user?.name.surName}`}
        color="black"
        margin="0 0 20px 0"
        background={colors.header["gold"]}
        onClose={onClose}
      />
      <ManagerForm
        data={data}
        register={register}
        onSubmit={onSubmit}
        onClose={onClose}
        handleSubmit={handleSubmit}
        watch={watch}
        errors={errors}
        setValue={setValue}
        isValid={isFullValid}
        isEditMode={isEditMode}
        userStatuses={userStatuses}
      />
      <SuccessCancelFormButtons
        onSuccess={handleSubmit(onSubmit)}
        onCancel={onClose}
        // onRemove={handleClickOpen}
        isUpdate={true}
      />
      <LoaderFullWindow
        color={colors.grey[600]}
        size={75}
        isLoading={isLoading}
      />
    </>
  );
};

export default UpdateManager;
