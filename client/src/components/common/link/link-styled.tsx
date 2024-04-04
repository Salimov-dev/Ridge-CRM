import { Link } from "react-router-dom";
import styled from "@emotion/styled";

const Component = styled(Link)({
  width: "100%",
  textDecoration: "none",
  borderBottom: "1px solid transparent",
  transition: "border-bottom-color 0.3s"
});

const LinkStyled = ({ path = "", onClick = () => {}, children }) => {
  return (
    <Component to={path} onClick={onClick}>
      {children}
    </Component>
  );
};

export default LinkStyled;
