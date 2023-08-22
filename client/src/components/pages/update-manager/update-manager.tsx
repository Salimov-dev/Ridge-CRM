// libraries
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import dayjs from "dayjs";
// MUI
import { Box } from "@mui/material";
// components
import Header from "./components/header";
import ManagerForm from "../../common/forms/manager-form";
// store
import { getUserDataById, updateUser } from "../../../store/users.store";
import { getUserStatusesList } from "../../../store/user-statuses.store";
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
  const watchGender = watch("gender", "");
  const watchStatus = watch("status", "");

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
        watch={watch}
        register={register}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        errors={errors}
        setValue={setValue}
        isValid={isValid}
        isEditMode={isEditMode}
        userStatuses={userStatuses}
        watchGender={watchGender}
        watchStatus={watchStatus}
      />
    </Box>
  );
};

export default UpdateManager;
