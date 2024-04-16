import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Typography, styled } from "@mui/material";
import { toast } from "react-toastify";
// components
import ButtonStyled from "@components/common/buttons/button-styled.button";
import LinkStyled from "@components/common/link/link-styled";
import LoaderFullWindow from "@components/common/loader/loader-full-window";
// forms
import ForgotPasswordForm from "@forms/password/forgot-password.form";
// schemas
import { forgotPasswordSchema } from "@schemas/password/forgot-password.schema";
// services
import passwordService from "@services/password/password.service";

const Component = styled(Box)`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid yellow;
  border-radius: 10px;
  padding: 10px;
`;

const Message = styled(Typography)`
  text-align: center;
  color: white;
  margin: 6px 0 16px 0;
`;

const initialState = {
  email: ""
};

const ForgotPasswordUI = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [forgotPass, setForgotPass] = useState(false);

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: initialState,
    mode: "onSubmit",
    resolver: yupResolver(forgotPasswordSchema)
  });

  const data = watch();

  const handleClickForgotPassword = () => {
    setForgotPass((prevState) => !prevState);
  };

  const onSubmit = () => {
    setIsLoading(true);

    passwordService
      .forgot(data.email)
      .then((res) => {
        const { content } = res;
        toast.success(content?.message);
        setForgotPass(false);
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

  return (
    <>
      <LinkStyled onClick={handleClickForgotPassword}>
        <Typography
          variant="h5"
          sx={{
            textAlign: "center",
            color: forgotPass ? "yellow" : "DeepSkyBlue",
            "&:hover": {
              color: forgotPass ? "orange" : "MediumSlateBlue",
              textDecoration: "underline"
            }
          }}
        >
          {forgotPass ? "Восстановить пароль" : "Забыли пароль?"}
        </Typography>
      </LinkStyled>
      {forgotPass && (
        <Component>
          <ForgotPasswordForm data={data} errors={errors} register={register} />
          <Message>
            Письмо с ссылкой для восстановления пароля придёт на почту,
            указанную при регистрации
          </Message>
          <ButtonStyled
            title="Восстановить"
            style="MANAGER_TASK"
            onClick={handleSubmit(onSubmit)}
          />
          <LoaderFullWindow isLoading={isLoading} />
        </Component>
      )}
    </>
  );
};

export default ForgotPasswordUI;
