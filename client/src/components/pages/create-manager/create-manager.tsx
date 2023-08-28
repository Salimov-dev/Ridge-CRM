// libraries
import { Box } from "@mui/material";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
// components
import ManagerForm from "../../common/forms/manager-form/manager-form";
// store
import { getUserStatusesList } from "../../../store/user/user-statuses.store";
import {
  addNewManager,
  getCurrentUserId,
} from "../../../store/user/users.store";
// schema
import { managerSchema } from "../../../schemas/schemas";
import getRandomInt from "../../../utils/get-random-int";
import TitleWithBackButton from "../../common/page-titles/title-with-back-button";

const initialState = {
  email: "",
  password: "",
  status: "",
  birthday: null,
  gender: "",
  name: {
    firstName: "",
    surName: "",
    lastName: "",
  },
  contacts: {
    phone: "",
  },
  contract: {
    startDate: null,
    endDate: null,
    trialPeriod: null,
  },
};

const CreateManager = () => {
  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: initialState,
    mode: "onBlur",
    resolver: yupResolver(managerSchema),
  });

  const data = watch();
  const userStatuses = useSelector(getUserStatusesList());
  const currentUserId = useSelector(getCurrentUserId());
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    const newData = {
      ...data,
      image: `https://randomuser.me/api/portraits/women/${getRandomInt()}.jpg`,
      curatorId: currentUserId,
    };

    dispatch(addNewManager(newData))
      .then(navigate("/users"))
      .then(toast.success("Менеджер успешно добавлен!"));
  };

  return (
    <Box>
      <TitleWithBackButton title="Добавить нового менеджера" path="/users" />

      <ManagerForm
        register={register}
        data={data}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        watch={watch}
        errors={errors}
        setValue={setValue}
        userStatuses={userStatuses}
        isValid={isValid}
      />
    </Box>
  );
};

export default CreateManager;
