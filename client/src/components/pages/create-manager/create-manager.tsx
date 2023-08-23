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

  const data = watch()
  console.log("data", data);
  const watchGender = watch("gender", "")
  const watchStatus = watch("status", "")
  const watchStartDate = watch("contract.startDate", null)
  

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
      data={data}
        register={register}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        errors={errors}
        setValue={setValue}
        userStatuses={userStatuses}
        isValid={isValid}
        watchGender={watchGender}
        watchStatus={watchStatus}
        watchStartDate={watchStartDate}
      />
    </Box>
  );
};

export default CreateManager;
