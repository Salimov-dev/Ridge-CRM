// libraries
import dayjs from "dayjs";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
// MUI
import { Box } from "@mui/material";
// components
import Header from "./components/header";
import ManagerForm from "../../common/forms/manager-form/manager-form";
// store
import { getUserStatusesList } from "../../../store/user-statuses.store";
import { getUserDataById, updateUser } from "../../../store/users.store";
// other
import { managerSchema } from "../../../schemas/schemas";

const UpdateManager = () => {
  const { userId } = useParams();
  const user = useSelector(getUserDataById(userId));
  const userStatuses = useSelector(getUserStatusesList());

  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      .then(navigate(-1))
      .then(toast.success("Менеджер успешно изменен!"));
  };

  return (
    <Box>
      <Header user={user} />
      <img
        src={user?.image}
        alt=""
        style={{ width: "100px", borderRadius: "10px" }}
      />
      <ManagerForm
        data={formatedUser}
        register={register}
        onSubmit={onSubmit}
        handleSubmit={handleSubmit}
        watch={watch}
        errors={errors}
        setValue={setValue}
        isValid={isFullValid}
        isEditMode={isEditMode}
        userStatuses={userStatuses}
      />
    </Box>
  );
};

export default UpdateManager;
