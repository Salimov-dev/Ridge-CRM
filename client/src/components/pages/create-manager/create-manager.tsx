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
import Header from "./components/header";

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

  const watchTrialStatus = watch("status");
  const isTrialStatusSelected = watchTrialStatus === "64da643f547d1cfcd04b1dc8";

  function getRandomInt() {
    return Math.round(Math.random() * 98 + 1);
  }

  const onSubmit = (data) => {
    const newData = {
      ...data,
      image: `https://randomuser.me/api/portraits/women/${getRandomInt()}.jpg`,
      curatorId: currentUserId,
    };
    console.log("newData", newData);
    dispatch(addNewManager(newData))
      .then(navigate("/users"))
      .then(toast.success("Менеджер успешно добавлен!"));
  };

  return (
    <Box>
      <Header />

      <ManagerForm
        register={register}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        errors={errors}
        setValue={setValue}
        isTrialStatusSelected={isTrialStatusSelected}
        userStatuses={userStatuses}
        isValid={isValid}
      />
    </Box>
  );
};

export default CreateManager;
