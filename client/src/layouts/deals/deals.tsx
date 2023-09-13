import { Box, Button, Paper, Typography, styled } from "@mui/material";
import LayoutTitle from "../../components/common/page-titles/layout-title";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import { useDispatch, useSelector } from "react-redux";
import { getDealsList } from "../../store/deal/deal.store";
import { getSidebarCollapsState } from "../../store/sidebar-collaps-state.store";
import { useEffect, useState } from "react";
import DividerStyled from "../../components/common/divider/divider-styled";
import AddObjectToDealDialog from "../../components/UI/dialogs/deals/add-object-to-deal-dialog";
import {
  getAddObjectToDealOpenState,
  setAddObjectToDealOpenState,
} from "../../store/deal/add-object-to-deal.store";
import { getCurrentUserId } from "../../store/user/users.store";
import {
  getObjectAddressById,
  getObjectById,
  getObjectsList,
} from "../../store/object/objects.store";
import { getDealStagesList } from "../../store/deal/deal-stages.store";

const DealsContainer = styled(Box)`
  display: flex;
  height: 550px;
  justify-content: start;
  gap: 20px;
  overflow-x: scroll;
  padding-bottom: 20px;
`;

const DealContainer = styled(Paper)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  color: black;
  background: inherit;
  border: 1px solid white;
  padding: 20px;
`;

const DealTitle = styled(Box)`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-bottom: 6px;
`;

const ObjectsContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  gap: 12px;
`;

const ObjectContainer = styled(Paper)`
  color: black;
  background: white;
  padding: 10px;
`;

const Deals = () => {
  const dispatch = useDispatch();
  const dealStages = useSelector(getDealStagesList());
  console.log("dealStages", dealStages);

  const objects = useSelector(getObjectsList());
  const currentUserId = useSelector(getCurrentUserId());
  const currentUserObjects = objects?.filter(
    (obj) => obj?.userId === currentUserId
  );

  let transformDealsStages = [];
  dealStages?.forEach((deal) => {
    transformDealsStages?.push({ _id: deal?._id, name: deal?.name });
  });

  let transformObjects = [];
  currentUserObjects?.forEach((obj) => {
    transformObjects?.push({ _id: obj._id, name: obj.location.address });
  });

  const handleCloseAddObjectToDeal = () => {
    dispatch(setAddObjectToDealOpenState(false));
  };

  const handleAddObject = () => {
    // updateDeal
    dispatch(setAddObjectToDealOpenState(true));
  };

  // разобраться с шириной компонента, глючит
  const isCollapsedSidebar = useSelector(getSidebarCollapsState());
  const screenWidth = window?.innerWidth;
  const fullWidth = screenWidth - 262;
  const collapseWidth = screenWidth - 122;
  const [width, setWidth] = useState(0);
  useEffect(() => {
    setWidth(isCollapsedSidebar ? collapseWidth : fullWidth);
  }, [isCollapsedSidebar]);
  useEffect(() => {
    setTimeout(() => {
      setWidth(isCollapsedSidebar ? collapseWidth : fullWidth);
    }, 0);
  }, []);

  return (
    <Box
      sx={{
        height: "500px",
        width: width,
      }}
    >
      <LayoutTitle title="Сделки" />
      <DealsContainer>
        {dealStages?.map((deal) => (
          <DealContainer key={deal._id}>
            <DealTitle>
              <Typography variant="h5" sx={{ color: "white" }}>
                <b>{deal.name}</b>
              </Typography>
            </DealTitle>
            <DividerStyled margin="12px 0 20px 0" />
            <Box sx={{ width: "230px" }}>
              <Typography>Тут будет сделка</Typography>
            </Box>
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
      <AddObjectToDealDialog
        objects={transformObjects}
        stages={transformDealsStages}
      />
    </Box>
  );
};

export default Deals;
