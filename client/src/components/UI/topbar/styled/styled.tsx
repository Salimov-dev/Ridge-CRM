import { Box, InputBase, styled } from "@mui/material";

export const Component = styled(Box)`
  display: flex;
  justify-content: space-between;
  padding: 17px 0 0 0;
  margin-bottom: 6px;
`;

export const LeftSide = styled(Box)`
  display: flex;
  border-radius: 3px;
  padding: 4px;
`;

export const SearchField = styled(InputBase)`
  flex: 1;
  margin-left: 1px;
`;

export const RightSide = styled(Box)`
  display: flex;
`;
