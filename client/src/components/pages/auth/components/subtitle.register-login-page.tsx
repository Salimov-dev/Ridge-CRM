import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";

const Component = styled(Box)`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SubtitleRegisterLoginPage = ({ title, backgroundColor, onClick }) => {
  return (
    <Component>
      <Typography
        sx={{
          backgroundColor: backgroundColor,
          width: "100%",
          padding: "10px 30px",
          textAlign: "center",
          cursor: "pointer",
          "&:hover": {
            textDecoration: "underline"
          }
        }}
        onClick={onClick}
      >
        {title}
      </Typography>
    </Component>
  );
};

export default SubtitleRegisterLoginPage;
