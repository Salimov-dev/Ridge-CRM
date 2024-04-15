import { Hidden, styled } from "@mui/material";
import backgroundImage from "@assets/main-background.png";

const BackgroundBottomImage = styled("img")({
  width: "100%",
  height: "auto"
});

const BackgroundBottomImageMainLayout = () => {
  return (
    <Hidden lgUp>
      <BackgroundBottomImage src={backgroundImage} />
    </Hidden>
  );
};

export default BackgroundBottomImageMainLayout;
