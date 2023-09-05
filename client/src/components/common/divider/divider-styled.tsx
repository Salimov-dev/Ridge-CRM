import { Divider, styled } from "@mui/material";

const DividerStyled = ({ color = "gray" }) => {
  const Component = styled(Divider)`
    width: 100%;
    border-style: dashed;
    border-color: ${color};
    margin: 6px 0;
  `;

  return <Component />;
};

export default DividerStyled;
