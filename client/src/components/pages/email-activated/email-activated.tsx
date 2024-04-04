import { Box, Typography, styled } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
// services
import emailActivateService from "@services/email-activate/email-activate.service";
// components
import Loader from "@components/common/loader/loader";
// store
import { getUsersLoadingStatus } from "@store/user/users.store";

const Component = styled(Box)`
  height: 350px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Message = styled(Typography)`
  text-align: center;
`;

const EmailActivated = React.memo(() => {
  const [error, setError] = useState(null);
  const [successResponse, setSuccessResponse] = useState(null);
  const [redirectTimer, setRedirectTimer] = useState(null);

  const activationLink = useParams().link;
  const currentUserLoadingStatus = useSelector(getUsersLoadingStatus());

  const getEmailActivate = () => {
    emailActivateService
      .get(activationLink)
      .then((response) => {
        const { content } = response;
        setSuccessResponse(content.message);

        setRedirectTimer(
          setTimeout(() => {
            window.location.href = "/users";
          }, 1400)
        );
        emailActivateService.clearActivationLink(activationLink);
      })
      .catch((error) => {
        const errorMessage =
          error.response?.data?.error?.message || "Ошибка при активации почты";
        setError(errorMessage);
        throw errorMessage;
      });
  };

  const getScreenMessage = () => {
    if (error) {
      return error;
    }
    if (successResponse) {
      return successResponse;
    }
  };

  useEffect(() => {
    getEmailActivate();
    return () => {
      clearTimeout(redirectTimer);
    };
  }, []);

  return (
    <Component>
      {!currentUserLoadingStatus ? (
        <Message variant="h2">{getScreenMessage()}</Message>
      ) : (
        <Box>
          <Message variant="h2">Проверяем активна ли Ваша почта</Message>
          <Loader size={50} />
        </Box>
      )}
    </Component>
  );
});

export default EmailActivated;
