// libraries
import { Box, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import dayjs from "dayjs";
import config from "@config/config.json";
// components
import TitleWithCloseButton from "@common/page-headers/header-with-close-button";
import SuccessCancelFormButtons from "@components/common/buttons/success-cancel-form-buttons";
import MakePaymentForm from "@forms/make-payment/make-payment.form";
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
import { removeSpacesAndConvertToNumber } from "@utils/data/remove-spaces-and-convert-to-number";
// services
import paymentService from "@services/payment/payment.service";

const initialState = {
  amount: 0
};

const MakePaymentPage = React.memo(({ onClose }) => {
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

  const trialLicenseTypeId = "71pbfi4954itj045tloop001";
  const data = watch();
  const currentUserId = useSelector(getCurrentUserId());
  const userLicense = useSelector(getUserLicensesByUserId(currentUserId));
  const currentLicenseTypeId = userLicense?.accountType;

  const paymentAmount = removeSpacesAndConvertToNumber(watch("amount"));

  const activeUsersQuantity = userLicense?.activeUsersQuantity;

  const licenseCost = config.licenseCost;
  const totalLicensesCost = activeUsersQuantity * licenseCost;

  const currentBalace = userLicense?.balance;
  const newDaysQuantity = Math.floor(paymentAmount / totalLicensesCost);

  const currentDate = dayjs();
  const currentLicenseStartDate = dayjs(userLicense.dateStart);
  const licenseDateEnd = dayjs(userLicense?.dateEnd);

  const newLicenseDate = (
    currentLicenseTypeId === trialLicenseTypeId ? currentDate : licenseDateEnd
  ).add(newDaysQuantity, "day");

  const onSubmit = () => {
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
      .finally(() => {});
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
        totalUsersLength={activeUsersQuantity}
        totalLicensesCost={totalLicensesCost}
      />
      <EnoughLicenseDays
        newDaysQuantity={newDaysQuantity}
        userLicense={userLicense}
      />
      <EnoughLicenseDate
        newLicenseDate={newLicenseDate}
        userLicense={userLicense}
      />
      <Box
        sx={{ background: "firebrick", padding: "10px", margin: "20px 0 0 0" }}
      >
        <Typography variant="h4" sx={{ textAlign: "center" }}>
          Не закрывайте страницу оплаты до автоматического возрата в Грядку ЦРМ
          после оплаты!
        </Typography>
      </Box>
      <SuccessCancelFormButtons
        successTitle="Оплатить"
        onSuccess={handleSubmit(onSubmit)}
        onCancel={onClose}
        disabledRemoveButton={true}
      />
    </Box>
  );
});

export default MakePaymentPage;
