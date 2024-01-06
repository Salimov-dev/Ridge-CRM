// libraries
import { Box } from "@mui/material";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import dayjs from "dayjs";
// components
import ManagerForm from "../../common/forms/manager/manager.form";
import TitleWithCloseButton from "../../common/page-headers/header-with-close-button";
// store
import { getUserStatusesList } from "../../../store/user-params/user-statuses.store";
import {
  createNewUser,
  getCurrentUserId,
} from "../../../store/user/users.store";
// schema
import { managerSchema } from "../../../schemas/manager.schema";
import React from "react";

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
  isActive: true,
  image: "",
};

const CreateManager = React.memo(({ onClose }) => {
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

  const transformedStartDate = dayjs(data?.contract?.startDate).format(
    "YYYY-MM-DDTHH:mm:ss.SSSZ"
  );
  const transformedEndDate = dayjs(data?.contract?.endDate).format(
    "YYYY-MM-DDTHH:mm:ss.SSSZ"
  );
  const transformedTrialPeriod = data?.contract?.trialPeriod
    ? dayjs(data?.contract?.trialPeriod).format("YYYY-MM-DDTHH:mm:ss.SSSZ")
    : "";

  const onSubmit = (data) => {
    const newData = {
      ...data,
      contract: {
        startDate: transformedStartDate,
        endDate: transformedEndDate,
        trialPeriod: transformedTrialPeriod,
      },
      curatorId: currentUserId,
    };

    dispatch<any>(createNewUser(newData)).then(onClose());
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
});

export default CreateManager;
