// libraries
import { useEffect } from "react";
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
  const isEditMode = userId ? true : false;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const localStorageUser = JSON.parse(localStorage.getItem("editingUser"));
  
  const formatedState = {
    ...localStorageUser,
    contract: {
      startDate: localStorageUser?.contract.startDate
        ? dayjs(localStorageUser?.contract.startDate)
        : null,
      endDate: localStorageUser?.contract.endDate
        ? dayjs(localStorageUser?.contract.endDate)
        : null,
      trialPeriod: localStorageUser?.contract.trialPeriod
        ? dayjs(localStorageUser?.contract.trialPeriod)
        : null,
    },
    birthday: localStorageUser?.birthday
      ? dayjs(localStorageUser?.birthday)
      : null,
  };

  const formatedUser = {
    ...user,
    contract: {
      startDate: user?.contract.startDate
        ? dayjs(user?.contract.startDate)
        : null,
      endDate: user?.contract.endDate
        ? dayjs(user?.contract.endDate)
        : null,
      trialPeriod: user?.contract.trialPeriod
        ? dayjs(user?.contract.trialPeriod)
        : null,
    },
    birthday: user?.birthday
      ? dayjs(user?.birthday)
      : null,
  };


  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
  } = useForm({
    defaultValues: user?._id === userId ? formatedUser : formatedState,
    mode: "onBlur",
    resolver: yupResolver(managerSchema),
  });

  const data = watch();
 

  const onSubmit = (data) => {
    dispatch(updateUser(data))
      .then(navigate(-1))
      .then(toast.success("Менеджер успешно изменен!"));
  };

  useEffect(() => {
    if (user !== undefined) {
      localStorage.setItem("editingUser", JSON.stringify(user));
    } else {
      return;
    }
  }, []);

  useEffect(() => {
    if (user !== undefined) {
      localStorage.setItem("editingUser", JSON.stringify(user));
    } else {
      return;
    }
  }, [localStorageUser]);

  return (
    <Box>
      <Header user={user} />
      <img src={user?.image} alt="" style={{width: '100px', borderRadius: '10px'}}/>
      <ManagerForm
        data={data}
        register={register}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        errors={errors}
        setValue={setValue}
        isValid={isValid}
        isEditMode={isEditMode}
        userStatuses={userStatuses}
      />
    </Box>
  );
};

export default UpdateManager;
