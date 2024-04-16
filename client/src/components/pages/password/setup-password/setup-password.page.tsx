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
import HeaderForLayout from "@components/common/headers/header-for-layout";
import SuccessMessageSetupPassword from "./components/success-message.setup-password";
import SetupNewPassword from "./components/setup-new-password.setup-password";
// schemas
import { setupPasswordSchema } from "@schemas/password/setup-password.schema";
// initial-states
import { setupPasswordInitialState } from "@initial-states/password/password-setup-create.initial-state";

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
    defaultValues: setupPasswordInitialState,
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
      <HeaderForLayout title="Установить новый пароль" />
      {!successResponse ? (
        <SetupNewPassword
          data={data}
          register={register}
          errors={errors}
          onClick={handleSubmit(onSubmit)}
          setupPassEmail={setupPassEmail}
        />
      ) : (
        <SuccessMessageSetupPassword />
      )}
      <LoaderFullWindow isLoading={isLoading} />
    </ContainerStyled>
  );
});

export default SetupPassword;
