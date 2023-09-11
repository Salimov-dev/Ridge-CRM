import { Box, Button, Paper, Typography, styled } from "@mui/material";
import LayoutTitle from "../../components/common/page-titles/layout-title";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import { useSelector } from "react-redux";
import { getDealsList } from "../../store/deal/deal.store";
import { getSidebarCollapsState } from "../../store/sidebar-collaps-state.store";
import { useEffect, useState } from "react";
import DividerStyled from "../../components/common/divider/divider-styled";

const DealsContainer = styled(Box)`
  display: flex;
  height: 550px;
  justify-content: start;
  gap: 20px;
  overflow-x: scroll;
`;

const DealContainer = styled(Paper)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 150px;
  color: black;
  background: white;
  padding: 20px;
`;

const DealTitle = styled(Box)`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-bottom: 6px;
`;

const ObjectContainer = styled(Paper)`
  width: 250px;
  color: black;
  background: white;
  margin-bottom: 20px;
`;

const Deals = () => {
  const isCollapsedSidebar = useSelector(getSidebarCollapsState());
  const dealsList = useSelector(getDealsList());
  const screenWidth = window?.innerWidth;

  const fullWidth = screenWidth - 262;
  const collapseWidth = screenWidth - 122;
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setWidth(isCollapsedSidebar ? collapseWidth : fullWidth);
    }, 0);
  }, []);

  useEffect(() => {
    setWidth(isCollapsedSidebar ? collapseWidth : fullWidth);
  }, [isCollapsedSidebar]);

  const handleAddObject = () => {};

  const items = [
    {
      companyId: "companyId",
      users: [
        { userId: "userId", objectsId: ["1", "2", "3"] },
        { userId: "userId", objectsId: ["4", "5", "6"] },
        { userId: "userId", objectsId: ["7", "8", "9"] },
      ],
    },
  ];

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
          <DealContainer key={deal._id}>
            <DealTitle>
              <Typography variant="h5">
                <b>{deal.name}</b>
              </Typography>
            </DealTitle>
            <DividerStyled />
            <ObjectContainer elevation={3}>fds</ObjectContainer>
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
          </DealContainer>
        ))}
      </DealsContainer>
    </Box>
  );
};

export default Deals;
