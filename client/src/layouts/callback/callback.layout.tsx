import { Typography } from "@mui/material";
// components
import HeaderForLayout from "@components/common/headers/header-for-layout";
import { ContainerStyled } from "@components/common/container/container-styled";

const CallbackLayout = () => {
  return (
    <ContainerStyled>
      <HeaderForLayout title="Связаться с разработчиком" />
      <Typography variant="h4" sx={{ marginBottom: "20px" }}>
        Есть пожелания или предложения?
      </Typography>
      <Typography variant="h4">Напишите на почту: ridge-crm@mail.ru</Typography>
      <Typography variant="h4">Свяжитесь в ТГ: @ridge_crm</Typography>
    </ContainerStyled>
  );
};

export default CallbackLayout;
