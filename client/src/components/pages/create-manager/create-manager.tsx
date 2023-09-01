// libraries
import { Box } from "@mui/material";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
// components
import ManagerForm from "../../common/forms/manager-form/manager-form";
import TitleWithCloseButton from "../../common/page-titles/title-with-close-button";
// store
import { getUserStatusesList } from "../../../store/user/user-statuses.store";
import {
  addNewManager,
  getCurrentUserId,
} from "../../../store/user/users.store";
// schema
import { managerSchema } from "../../../schemas/schemas";
// utils
import getRandomInt from "../../../utils/other/get-random-int";

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

const CreateManager = ({ onClose }) => {
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

  const onSubmit = (data) => {
    const newData = {
      ...data,
      image: `https://randomuser.me/api/portraits/women/${getRandomInt()}.jpg`,
      curatorId: currentUserId,
    };

    dispatch(addNewManager(newData))
      .then(onClose())
      .then(toast.success("Менеджер успешно добавлен!"));
  };

  return (
    <Box>
      <TitleWithCloseButton
        title="Добавить нового менеджера"
        onClose={onClose}
      />
      <ManagerForm
        register={register}
        data={data}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        onClose={onClose}
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
