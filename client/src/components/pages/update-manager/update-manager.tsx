// libraries
import dayjs from "dayjs";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
// MUI
import { Box } from "@mui/material";
// components
import Header from "./components/header";
import Loader from "../../common/loader/loader";
import ManagerForm from "../../common/forms/manager-form/manager-form";
// store
import { getUserStatusesList } from "../../../store/user/user-statuses.store";
import { getUserDataById, updateUser } from "../../../store/user/users.store";
import { getUpdateManagerId } from "../../../store/user/update-manager.store";
// other
import { managerSchema } from "../../../schemas/schemas";

const UpdateManager = ({ onClose }) => {
  const userId = useSelector(getUpdateManagerId());
  const user = useSelector(getUserDataById(userId));
  const userStatuses = useSelector(getUserStatusesList());

  const dispatch = useDispatch();

  const isEditMode = userId ? true : false;

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

  const isFullValid =
    data.contract.startDate !== null &&
    data.contract.endDate !== null &&
    data.birthday !== null &&
    isValid;

  const onSubmit = (data) => {
    dispatch(updateUser(data))
      .then(onClose())
      .then(toast.success("Менеджер успешно изменен!"));
  };

  return user ? (
    <Box>
      <Header user={user} onClose={onClose} />
      <img
        src={user?.image}
        alt=""
        style={{ width: "100px", borderRadius: "10px" }}
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
    </Box>
  ) : (
    <Loader />
  );
};

export default UpdateManager;
