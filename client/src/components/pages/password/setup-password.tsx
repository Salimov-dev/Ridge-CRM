import { Box, Typography, styled } from "@mui/material";
import React, { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import LoaderFullWindow from "@components/common/loader/loader-full-window";
// services
import passwordService from "@services/password/password.service";
// components
import { ContainerStyled } from "@components/common/container/container-styled";
import HeaderLayout from "@components/common/page-headers/header-layout";
import ButtonStyled from "@components/common/buttons/button-styled.button";
// forms
import SetupPasswordForm from "@forms/password/setup-password.form";
// schemas
import { setupPasswordSchema } from "@schemas/password/setup-password.schema";

const SetupFormContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid yellow;
  padding: 50px;
  border-radius: 10px;
`;

const FormContainer = styled(Box)`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const TitleContainer = styled(Box)`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 20px;
`;

const MessageContainer = styled(Box)`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 20px;
  gap: 20px;
`;

const initialState = {
  setupPassword: "",
  confirmSetupPassword: ""
};

const SetupPassword = React.memo(() => {
  const [isLoading, setIsLoading] = useState(false);
  const [successResponse, setSuccessResponse] = useState(false);
  const [redirectTimer, setRedirectTimer] = useState(null);

  const setupLinkId = useParams().link;
  const setupPassEmail = useParams().email;

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: initialState,
    mode: "onSubmit",
    resolver: yupResolver(setupPasswordSchema)
  });

  const data = watch();

  const onSubmit = () => {
    setIsLoading(true);

    const newData = { ...data, setupLinkId, setupPassEmail };

    passwordService
      .setupPassword(newData)
      .then((res) => {
        const { content } = res;
        setSuccessResponse(true);
        toast.success(content?.message);

        setRedirectTimer(
          setTimeout(() => {
            window.location.href = "/";
          }, 3000)
        );
        passwordService.clearSetupPassLink({
          setupLinkId,
          setupPassEmail
        });
      })
      .catch((error) => {
        const errorMessage =
          error.response?.data?.error?.message || "Ошибка при установке пароля";
        toast.error(errorMessage);
        throw errorMessage;
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    return () => {
      clearTimeout(redirectTimer);
    };
  }, []);

  return (
    <ContainerStyled>
      <HeaderLayout title="Установить новый пароль" />
      {!successResponse ? (
        <FormContainer>
          <SetupFormContainer>
            <TitleContainer>
              <Typography>Установите новый пароль</Typography>
              <Typography>для аккаунта: {setupPassEmail}</Typography>
            </TitleContainer>
            <SetupPasswordForm
              data={data}
              errors={errors}
              register={register}
            />
            <ButtonStyled
              title="Подвердить"
              style="SUCCESS"
              onClick={handleSubmit(onSubmit)}
            />
          </SetupFormContainer>
        </FormContainer>
      ) : (
        <MessageContainer>
          <Typography variant="h2" sx={{ textAlign: "center" }}>
            Новый пароль установлен!
          </Typography>
          <Box>
            <Typography variant="h3" sx={{ textAlign: "center" }}>
              Обратитесь к своему Куратору для активации аккаунта,
            </Typography>
            <Typography variant="h3" sx={{ textAlign: "center" }}>
              после этого Вы сможете авторизоваться в Грядке ЦРМ
            </Typography>
          </Box>
        </MessageContainer>
      )}
      <LoaderFullWindow isLoading={isLoading} />
    </ContainerStyled>
  );
});

export default SetupPassword;
