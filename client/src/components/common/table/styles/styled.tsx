import { Box, Button, styled } from "@mui/material";

export const PaginationContainer = styled(Box)`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
`;

export const SearchedRows = styled(Box)`
  display: flex;
  gap: 8px;
  align-items: center;
`;

export const PaginationBlock = styled(Box)`
  display: flex;
  gap: 14px;
  align-items: center;
`;

export const PaginationPageNavigation = styled(Box)`
  display: flex;
  gap: 6px;
`;

export const PageBlock = styled(Box)`
  display: flex;
`;

export const ButtonStyled = styled(Button)`
  color: inherit;
  border-color: inherit;
`;
