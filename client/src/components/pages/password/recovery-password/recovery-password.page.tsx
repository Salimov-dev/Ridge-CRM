import { Box, styled } from "@mui/material";
import React, { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
// services
import passwordService from "@services/password/password.service";
// components
import LoaderFullWindow from "@components/common/loader/loader-full-window";
import { ContainerStyled } from "@components/common/container/container-styled";
import HeaderLayout from "@components/common/page-headers/header-layout";
import ButtonStyled from "@components/common/buttons/button-styled.button";
// forms
import RecoveryPasswordForm from "@forms/password/recovery-password.form";
// schemas
import { recoveryPasswordSchema } from "@schemas/password/recovery-password.schema";
// initial-states
import { recoveryPasswordInitialState } from "@initial-states/password/password-recovery-create.initial-state";

const RecoveryFormContainer = styled(Box)`
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

const RecoveryPassword = React.memo(() => {
  const [isLoading, setIsLoading] = useState(false);
  const [redirectTimer, setRedirectTimer] = useState(null);

  const recoveryId = useParams().link;

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: recoveryPasswordInitialState,
    mode: "onSubmit",
    resolver: yupResolver(recoveryPasswordSchema)
  });

  const data = watch();

  const onSubmit = () => {
    const newData = { ...data, recoveryId: recoveryId };

    setIsLoading(true);
    passwordService
      .confirm(newData)
      .then((res) => {
        const { content } = res;
        toast.success(content?.message);

        setRedirectTimer(
          setTimeout(() => {
            window.location.href = "/";
          }, 1000)
        );
        passwordService.clearConfirmLink({
          recoveryId: recoveryId,
          email: data.email
        });
      })
      .catch((error) => {
        const errorMessage =
          error.response?.data?.error?.message ||
          "Ошибка при восстановлении пароля";
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
      <HeaderLayout title="Восстановление пароля" />
      <FormContainer>
        <RecoveryFormContainer>
          <RecoveryPasswordForm
            data={data}
            errors={errors}
            register={register}
          />
          <ButtonStyled
            title="Подвердить"
            style="SUCCESS"
            onClick={handleSubmit(onSubmit)}
          />
        </RecoveryFormContainer>
      </FormContainer>
      <LoaderFullWindow isLoading={isLoading} />
    </ContainerStyled>
  );
});

export default RecoveryPassword;
