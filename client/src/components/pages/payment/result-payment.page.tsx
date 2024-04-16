import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
// libraries
import HeaderLayout from "@components/common/page-headers/header-layout";
import LoaderFullWindow from "@components/common/loader/loader-full-window";
import { ContainerStyled } from "@components/common/container/container-styled";
import Loader from "@components/common/loader/loader";
// services
import paymentService from "@services/payment/payment.service";

const ResultPaymentPage = React.memo(() => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("Подождите, проверяем оплату...");
  const [redirectTimer, setRedirectTimer] = useState(null);

  const currentURL = window.location.href;
  const queryString = currentURL.split("?")[1];
  const paramsArray = queryString.split("&");
  const params = {};

  paramsArray.forEach((param) => {
    const [key, value] = param.split("=");
    params[key] = value;
  });
  const isCulturePage = paramsArray[0] === "Culture=ru";

  const outSum = params["OutSum"];
  const invId = params["InvId"];

  useEffect(() => {
    if (outSum && invId) {
      paymentService
        .confirm({ outSum, paymentInvId: invId })
        .then(() => {
          setRedirectTimer(
            setTimeout(() => {
              window.location.href = "/users";
            }, 1400)
          );

          setMessage("Оплата успешно произведена!");
          toast.success("Оплата успешно произведена!");
        })
        .catch((error) => {
          const errorMessage =
            error.response?.data?.message || "Ошибка при попытке оплаты";
          setMessage("Ошибка при попытке оплаты! Попробуйте снова!");
          toast.error(errorMessage);
          throw errorMessage;
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [outSum, invId]);

  useEffect(() => {
    return () => {
      clearTimeout(redirectTimer);
    };
  }, []);

  return (
    <ContainerStyled>
      <HeaderLayout title="Страница оплаты" />
      <Box
        sx={{
          width: " 100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        {!isCulturePage ? (
          <Box>
            <Loader size={50} />
            <Typography variant="h2">{message}</Typography>
          </Box>
        ) : (
          <Typography variant="h2">
            Продолжайте пользоваться Программой
          </Typography>
        )}
      </Box>
      <LoaderFullWindow isLoading={isLoading} />
    </ContainerStyled>
  );
});

export default ResultPaymentPage;
