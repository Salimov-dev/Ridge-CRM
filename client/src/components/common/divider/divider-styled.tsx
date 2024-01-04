import { Divider, styled } from "@mui/material";

const DividerStyled = ({ color = "gray", margin = "6px 0" }) => {
  const Component = styled(Divider)`
    width: 100%;
    border-style: dashed;
    border-color: ${color};
    margin: ${margin};
  `;

  return <Component />;
};

export default DividerStyled;
