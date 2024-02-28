import HeaderWithCloseButton from "@components/common/page-headers/header-with-close-button";
import styled from "@emotion/styled";
import { Paper, Typography } from "@mui/material";
import React from "react";

const AgreementText = styled(Paper)`
  padding: 20px;
  background: white;
  color: black;
`;

const Agreement = React.memo(({ onClose }) => {
  return (
    <>
      <HeaderWithCloseButton
        title="Лицензионное соглашение"
        color="white"
        margin="0 0 20px 0"
        onClose={onClose}
        background="RoyalBlue"
      />
      <AgreementText variant="elevation">
        <Typography>
          ВАЖНО! Перед началом любого использования указанных ниже Программ для
          ЭВМ внимательно ознакомьтесь с условиями ее использования,
          содержащимися в настоящем Соглашении. Установка, запуск или иное
          начало использования Программы означает надлежащее заключение
          настоящего Соглашения и Ваше полное согласие со всеми его условиями.
          Если Вы не согласны безоговорочно принять условия настоящего
          Соглашения, Вы не имеете права использовать Программу.
        </Typography>
      </AgreementText>
    </>
  );
});

export default Agreement;
