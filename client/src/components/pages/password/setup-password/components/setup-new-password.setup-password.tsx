import ButtonStyled from "@components/common/buttons/button-styled.button";
import styled from "@emotion/styled";
import SetupPasswordForm from "@forms/password/setup-password.form";
import { Box, Typography } from "@mui/material";

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

const SetupNewPassword = ({
  data,
  register,
  errors,
  onClick,
  setupPassEmail
}) => {
  return (
    <FormContainer>
      <SetupFormContainer>
        <TitleContainer>
          <Typography>Установите новый пароль</Typography>
          <Typography>для аккаунта: {setupPassEmail}</Typography>
        </TitleContainer>
        <SetupPasswordForm data={data} errors={errors} register={register} />
        <ButtonStyled title="Подвердить" style="SUCCESS" onClick={onClick} />
      </SetupFormContainer>
    </FormContainer>
  );
};

export default SetupNewPassword;
