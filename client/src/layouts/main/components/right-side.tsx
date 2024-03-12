import styled from "@emotion/styled";
import backgroundImage from "@assets/main-background.png";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";

const Component = styled(Box)`
  margin: 20px 0 0 0;
  display: flex;
  background-size: auto 100%;
  background-repeat: no-repeat;
  background-position: left top;
`;

const RightSide = () => {
  const [imageHeight, setImageHeight] = useState(0);

  useEffect(() => {
    const img = new Image();
    img.src = backgroundImage;
    img.onload = () => {
      setImageHeight(img.height);
    };
  }, []);
  return (
    <Component
      sx={{
        backgroundImage: `url(${backgroundImage})`,
        width: { xs: "100%", md: "100%", lg: " 50%" },
        height: {
          xs: "140px",
          sm: "300px",
          md: "650px", // Условное выражение для настройки высоты
          lg: "calc(100% - 20px)"
        },
        backgroundSize: { xs: "100%", md: "100%", lg: "auto 100%" }
      }}
    ></Component>
  );
};

export default RightSide;
