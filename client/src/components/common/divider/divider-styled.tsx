import { Divider, styled } from "@mui/material";

const Component = styled(Divider)`
  width: 100%;
  border-style: dashed;
  border-color: gray;
  margin: 6px 0;
`;

const DividerStyled = () => {
  return <Component />;
};

export default DividerStyled;
