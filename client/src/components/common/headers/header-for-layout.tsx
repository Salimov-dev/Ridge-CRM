import { Box, Typography, styled } from "@mui/material";
import { FC } from "react";

interface HeaderForLayoutProps {
  title: string;
  background?: string;
  color?: string;
  margin?: string;
  justifyContent?: string;
  width?: string;
}

interface StyledProps {
  background?: string;
  color?: string;
  margin?: string;
  justifyContent?: string;
  width?: string;
}

const Component = styled(Box)(({ margin, justifyContent }: StyledProps) => ({
  margin: margin,
  justifyContent: justifyContent,
  display: "flex",
  alignItems: "center",
  gap: "8px",
  marginBottom: "20px",
  marginRight: "50px"
}));

const Title = styled(Typography)(
  ({ width, background, color }: StyledProps) => ({
    color: color,
    background: background,
    width: width,
    padding: "0px 8px",
    textAlign: "center",
    borderRadius: "4px"
  })
);

const HeaderForLayout: FC<HeaderForLayoutProps> = ({
  title,
  background = "linear-gradient(to right, DarkOrange , OrangeRed)",
  color = "white",
  margin = "0",
  justifyContent = "start",
  width = "inherit"
}): JSX.Element => {
  return (
    <Component margin={margin} justifyContent={justifyContent}>
      <Title variant="h2" width={width} background={background} color={color}>
        {title}
      </Title>
    </Component>
  );
};

export default HeaderForLayout;
