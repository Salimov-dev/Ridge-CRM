import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";

const Component = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: -30px;
  margin-bottom: 30px;
`;

const Link = styled.a`
  color: white;
  text-decoration: none;
`;

const LogoMainLayout = () => {
  return (
    <Component>
      <Link href="https://ridge-crm.ru/" rel="noopener noreferrer">
        <Typography
          sx={{
            fontWeight: "700",
            marginBottom: "-10px",
            fontSize: { xs: "40px", sm: "54px", lg: "70px" }
          }}
        >
          Г Р Я Д К А
        </Typography>
        <Typography
          sx={{
            fontSize: { xs: "6px", sm: "9px", lg: "12px", textAlign: "center" }
          }}
        >
          НАША СИСТЕМА АВТОМАТИЗАЦИИ ДЛЯ ОТДЕЛОВ РАЗВИТИЯ
        </Typography>
      </Link>
    </Component>
  );
};

export default LogoMainLayout;
