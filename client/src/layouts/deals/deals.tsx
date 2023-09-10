import { Box, Button, Paper, Typography, styled } from "@mui/material";
import LayoutTitle from "../../components/common/page-titles/layout-title";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import { useSelector } from "react-redux";
import { getDealsList } from "../../store/deal/deal.store";
import { getSidebarCollapsState } from "../../store/sidebar-collaps-state.store";
import { useEffect, useState } from "react";

const DealsContainer = styled(Box)`
  display: flex;
  height: 550px;
  justify-content: start;
  gap: 20px;
  overflow-x: scroll;
`;

const Deals = () => {
  const [width, setWidth] = useState();
  const isCollapsedSidebar = useSelector(getSidebarCollapsState());
  const dealsList = useSelector(getDealsList());
  const screenWidth = window.innerWidth;

  const fullWidth = screenWidth - 262;
  const collapseWidth = screenWidth - 122;
  const handleAddObject = () => {};

  useEffect(() => {
    setWidth(isCollapsedSidebar ? collapseWidth : fullWidth);
  }, [isCollapsedSidebar]);

  return (
    <Box
      sx={{
        height: "500px",
        width: width,
      }}
    >
      <LayoutTitle title="Сделки" />
      <DealsContainer>
        {dealsList?.map((deal) => (
          <Paper
            key={deal._id}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "150px",
              color: "black",
              background: "white",
              padding: "20px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
                marginBottom: "20px",
              }}
            >
              <Typography variant="h5">
                <b>{deal.name}</b>
              </Typography>
            </Box>
            <Paper
              elevation={3}
              sx={{
                width: "300px",
                color: "black",
                background: "white",
                marginBottom: "20px",
              }}
            >
              fds
            </Paper>
            <Button
              sx={{
                display: "flex",
                gap: "4px",
                alignItems: "center",
                color: "gray",
              }}
              onClick={handleAddObject}
            >
              <AddBoxOutlinedIcon /> Добавить объект
            </Button>
          </Paper>
        ))}
      </DealsContainer>
    </Box>
  );
};

export default Deals;
