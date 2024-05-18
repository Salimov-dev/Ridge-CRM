// libraries
import { Box } from "@mui/material";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
// styled
import "@styled/styles-app-main.css";
import "react-toastify/dist/ReactToastify.css";
import styled from "@emotion/styled";
// components
import SidebarUI from "@components/UI/sidebar/sidebar.ui";
import Footer from "@components/UI/footer/footer";
import TopBarUI from "@components/UI/topbar/topbar.ui";
// image
import grassImage from "@assets/grass.png";
// routes
import AppRoutes from "@routes/routes";
// store
import { getIsLoggedIn } from "@store/user/users.store";

export const Component = styled(Box)(() => ({
  display: "flex",
  minHeight: "100vh"
}));

export const RightSide = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  width: "100%",
  backgroundImage: `url(${grassImage})`,
  backgroundRepeat: "repeat-x",
  backgroundSize: "auto 35px",
  backgroundPosition: "bottom"
});

const AppStyled = () => {
  const location = useLocation();

  const currentPath = location.pathname;
  const isHomePage = currentPath === "/";
  const isLoggedIn = useSelector(getIsLoggedIn());

  return (
    <Component sx={{ minWidth: isLoggedIn ? "1400px" : "100%" }}>
      <SidebarUI />
      <RightSide
        sx={{
          padding: isHomePage
            ? isLoggedIn
              ? "0 20px 50px 20px"
              : "0"
            : "0 20px 50px 20px"
        }}
      >
        <TopBarUI />
        <AppRoutes />
        <Footer />
      </RightSide>
    </Component>
  );
};

export default AppStyled;
