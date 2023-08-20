// libraries
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Box } from "@mui/material";
// components
import ManagerForm from "../../common/forms/manager-form";
// store
import { getUserStatusesList } from "../../../store/user-statuses.store";
import { addNewManager, getCurrentUserId } from "../../../store/users.store";
// schema
import { managerSchema } from "../../../schemas/schemas";
import TitleWithBackButton from "../../common/page-titles/title-with-back-button";
import getRandomInt from "../../../utils/get-random-int";

const initialState = {
  email: "",
  password: "",
  status: "",
  birthday: "",
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
    startDate: "",
    endDate: "",
    trialPeriod: "",
  },
};

const CreateManager = () => {
  const userStatuses = useSelector(getUserStatusesList());
  const currentUserId = useSelector(getCurrentUserId());
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        errors={errors}
        setValue={setValue}
        userStatuses={userStatuses}
        isValid={isValid}
      />
    </Box>
  );
};

export default CreateManager;
