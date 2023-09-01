import { Box, styled } from "@mui/material";

export const Form = styled(`form`)({
  display: "flex",
  width: "100%",
  alignItems: "center",
  flexDirection: "column",
  marginBottom: "10px",
  gap: "12px",
});

export const FieldsContainer = styled(Box)`
  width: 100%;
  display: flex;
  gap: 4px;
`;
