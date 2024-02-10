// libraries
import { Box, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import dayjs from "dayjs";
import config from "@config/config.json";
// components
import TitleWithCloseButton from "@common/page-headers/header-with-close-button";
import SuccessCancelFormButtons from "@components/common/buttons/success-cancel-form-buttons";
import LoaderFullWindow from "@components/common/loader/loader-full-window";
import MakePaymentForm from "@components/common/forms/make-payment.form";
import CostOneLicense from "./components/cost-one-license";
import CurrentLicenseInfo from "./components/current-license-info";
import EnoughLicenseDays from "./components/enough-license-days";
import EnoughLicenseDate from "./components/enough-license-date";
// store
import { getCurrentUserId } from "@store/user/users.store";
import { getUserLicensesByUserId } from "@store/user/user-license.store";
// schema
import { paymentAmounySchema } from "@schemas/payment-amount.schema";
// utils
import { FormatDate } from "@utils/date/format-date";

const initialState = {
  amount: 0
};

const MakePaymentPage = React.memo(({ onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: initialState,
    mode: "onBlur",
    resolver: yupResolver(paymentAmounySchema)
  });

  const data = watch();
  const currentUserId = useSelector(getCurrentUserId());
  const userLicense = useSelector(getUserLicensesByUserId(currentUserId));
  const paymentAmount = watch("amount");

  const managersLength = userLicense?.managers.length;
  const observersLength = userLicense?.observers.length;
  const totalUsersLength = managersLength + observersLength + 1; // 1 добавляю в качестве лицензии текущего пользователя Куратора

  const licenseCost = config.licenseCost;
  const totalLicensesCost = totalUsersLength * licenseCost;

  const currentBalace = userLicense?.balance;
  const newDaysQuantity = Math.floor(paymentAmount / totalLicensesCost);

  const licenseDateEnd = dayjs(userLicense?.dateEnd);
  const newLicenseDate = FormatDate(licenseDateEnd.add(newDaysQuantity, "day"));

  const onSubmit = () => {
    // setIsLoading(true);
    console.log("data", data);

    // const newData = {
    //   ...data,
    //   password: "Qwer1234",
    //   curatorId: currentUserId
    // };

    // dispatch<any>(createNewUser(newData))
    //   .then(() => {
    //     onClose();
    //     toast.success("Новый пользователь успешно создан");
    //   })
    //   .catch((error) => {
    //     toast.error(error);
    //   })
    //   .finally(() => {
    //     setIsLoading(false);
    //   });
  };

  return (
    <Box>
      <TitleWithCloseButton
        title="Пополнить баланс"
        onClose={onClose}
        background="blue"
      />
      <MakePaymentForm register={register} data={data} errors={errors} />
      <CostOneLicense licenseCost={licenseCost} />
      <CurrentLicenseInfo
        currentBalace={currentBalace}
        totalUsersLength={totalUsersLength}
        totalLicensesCost={totalLicensesCost}
      />
      <EnoughLicenseDays newDaysQuantity={newDaysQuantity} />
      <EnoughLicenseDate newLicenseDate={newLicenseDate} />
      <SuccessCancelFormButtons
        successTitle="Добавить"
        onSuccess={handleSubmit(onSubmit)}
        onCancel={onClose}
      />
      <LoaderFullWindow isLoading={isLoading} />
    </Box>
  );
});

export default MakePaymentPage;
