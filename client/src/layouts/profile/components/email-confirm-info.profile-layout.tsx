import styled from "@emotion/styled";
import { Typography, Box } from "@mui/material";
import { toast } from "react-toastify";
import { useState } from "react";
// components
import ButtonStyled from "@components/common/buttons/button-styled.button";
import LoaderFullWindow from "@components/common/loader/loader-full-window";
// icons
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
// services
import emailActivateService from "@services/email-activate/email-activate.service";

const Container = styled(Box)`
  display: flex;
  align-items: center;
  gap: 4px;
  margin: 0 0 10px 0;
`;

const EmailConfirmInfoProfileLayout = ({ user }) => {
  const activationLink = user?.activationLink;

  const [isLoading, setIsLoading] = useState(false);

  const handleConfirmEmail = () => {
    setIsLoading(true);

    emailActivateService
      .sendConfirmMail(activationLink)
      .then((res) => {
        const { content } = res;
        toast.success(content?.message);
      })
      .catch((error) => {
        const errorMessage =
          error.response?.data?.error?.message || "Ошибка при активации почты";
        toast.error(errorMessage);
        throw errorMessage;
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const isUserActivated = user?.isEmailActived;
  return isUserActivated ? (
    <Container>
      <CheckCircleOutlineOutlinedIcon
        sx={{ width: "30px", height: "30px", color: "green" }}
      />
      <Typography variant="h4">Почта подтверждена</Typography>
    </Container>
  ) : (
    <Container>
      <CancelOutlinedIcon
        sx={{ width: "30px", height: "30px", color: "red" }}
      />
      <Typography variant="h4">Почта не подтверждена</Typography>
      <ButtonStyled
        title="Подтвердить"
        style="MANAGER_TASK"
        variant="contained"
        disabled={isLoading}
        onClick={handleConfirmEmail}
      />
      <LoaderFullWindow color="grey" size={75} isLoading={isLoading} />
    </Container>
  );
};

export default EmailConfirmInfoProfileLayout;
