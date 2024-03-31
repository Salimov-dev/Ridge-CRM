// components
import HeaderLayout from "@components/common/page-headers/header-layout";
import { ContainerStyled } from "@components/common/container/container-styled";
import { Typography } from "@mui/material";

const Callback = () => {
  return (
    <ContainerStyled>
      <HeaderLayout title="Связаться с разработчиком" />
      <Typography variant="h3">Напишите на почту: ridge-crm@mail.ru</Typography>
      <Typography variant="h3">Свяжитесь в ТГ: @ridge_crm</Typography>
    </ContainerStyled>
  );
};

export default Callback;
