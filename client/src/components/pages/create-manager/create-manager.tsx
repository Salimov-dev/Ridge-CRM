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
import { managerSchema } from "../../../schemas/manager-schema";
// utils
import getRandomInt from "../../../utils/other/get-random-int";
import dayjs from "dayjs";

const initialState = {
  email: "",
  password: "",
  status: "",
  birthday: null,
  gender: "",
  curatorId: "",
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

  const transformedStartDate = dayjs(data?.contract?.startDate).format("YYYY-MM-DDTHH:mm:ss.SSSZ");
  const transformedEndDate = dayjs(data?.contract?.endDate).format("YYYY-MM-DDTHH:mm:ss.SSSZ");
  const transformedTrialPeriod = dayjs(data?.contract?.trialPeriod).format("YYYY-MM-DDTHH:mm:ss.SSSZ");

  const onSubmit = (data) => {
    const newData = {
      ...data,
      contract: {
        startDate: transformedStartDate,
        endDate: transformedEndDate,
        trialPeriod: transformedTrialPeriod,
      },
      image: `https://randomuser.me/api/portraits/women/${getRandomInt()}.jpg`,
      curatorId: currentUserId,
    };

    dispatch<any>(addNewManager(newData))
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
        isValid={!isValid}
      />
    </Box>
  );
};

export default CreateManager;
