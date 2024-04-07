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
import MakePaymentForm from "@forms/make-payment/make-payment.form";
import CostOneLicense from "./components/cost-one-license";
import CurrentLicenseInfo from "./components/current-license-info";
import EnoughLicenseDays from "./components/enough-license-days";
import EnoughLicenseDate from "./components/enough-license-date";
// store
import { getCurrentUserId } from "@store/user/users.store";
import {
  getUserLicensesByUserId,
  updateUserLicense
} from "@store/user/user-license.store";
// schema
import { paymentAmounySchema } from "@schemas/payment-amount.schema";
import { FormatDate } from "@utils/date/format-date";
import { removeSpacesAndConvertToNumber } from "@utils/data/remove-spaces-and-convert-to-number";
import paymentService from "@services/payment/payment.service";
import { useNavigate } from "react-router-dom";

const initialState = {
  amount: 0
};

const MakePaymentPage = React.memo(({ onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: initialState,
    mode: "onBlur"
    // resolver: yupResolver(paymentAmounySchema)
  });

  const data = watch();
  const currentUserId = useSelector(getCurrentUserId());
  const userLicense = useSelector(getUserLicensesByUserId(currentUserId));

  const paymentAmount = removeSpacesAndConvertToNumber(watch("amount"));

  const managersLength = userLicense?.managers.length;
  const observersLength = userLicense?.observers.length;
  const totalUsersLength = managersLength + observersLength + 1; // 1 добавляю в качестве лицензии текущего пользователя Куратора

  const licenseCost = config.licenseCost;
  const totalLicensesCost = totalUsersLength * licenseCost;

  const currentBalace = userLicense?.balance;
  const newDaysQuantity = Math.floor(paymentAmount / totalLicensesCost);

  const licenseDateEnd = dayjs(userLicense?.dateEnd);
  const newLicenseDate = licenseDateEnd.add(newDaysQuantity, "day");

  const onSubmit = () => {
    // setIsLoading(true);
    console.log("data", data);

    paymentService
      .create({ amount: data.amount })
      .then((res) => {
        const { content } = res;

        const redirectPath = content?.paymentLink;

        if (redirectPath) {
          window.location.href = redirectPath;
        } else {
          throw new Error("Ссылка для оплаты не получена");
        }
        toast.success(content?.message);
      })
      .catch((error) => {
        const errorMessage =
          error.response?.data?.message || "Ошибка при попытке оплаты";
        toast.error(errorMessage);
        throw errorMessage;
      })
      .finally(() => {
        setIsLoading(false);
      });

    // const newData = {
    //   ...userLicense,
    //   balance: Number(paymentAmount),
    //   dateEnd: newLicenseDate
    // };

    // dispatch<any>(updateUserLicense(newData))
    //   .then(() => {
    //     onClose();
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
        successTitle="Оплатить"
        onSuccess={handleSubmit(onSubmit)}
        onCancel={onClose}
        disabledRemoveButton={true}
      />
      <LoaderFullWindow isLoading={isLoading} />
    </Box>
  );
});

export default MakePaymentPage;
