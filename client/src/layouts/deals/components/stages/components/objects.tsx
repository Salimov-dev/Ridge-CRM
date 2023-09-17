import { Box, Paper, Typography, styled } from "@mui/material";
import DividerStyled from "../../../../../components/common/divider/divider-styled";
import { FormatDate } from "../../../../../utils/date/format-date";
import {
  setOpenObjectPageId,
  setOpenObjectPageOpenState,
} from "../../../../../store/object/open-object-page.store";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import Footer from "./components/footer";
import ObjectAddress from "./components/object-address";
import { updateDeal } from "../../../../../store/deal/deal.store";
import {
  setUpdateDealId,
  setUpdateDealOpenState,
} from "../../../../../store/deal/update-deal.store";

const ObjectsContainer = styled(Box)`
  width: 265px;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  gap: 4px;
  margin-bottom: 14px;
  overflow-y: scroll;
  padding-right: 4px;
  margin-right: -8px;
`;

const ObjectContainer = styled(Paper)`
  width: 100%;
  color: black;
  background: white;
  padding: 10px;
  border: 1px solid gray;
  cursor: grab;
`;

const Objects = ({
  deals,
  stage,
  getObjectAddress,
  userName,
  draggableStageId,
  setDraggableStageId,
}) => {
  const dispatch = useDispatch();

  const handleUpdateDeal = (dealId) => {
    dispatch(setUpdateDealId(dealId));
    dispatch(setUpdateDealOpenState(true));
  };

  const handleOpenObjectPage = (objectId) => {
    dispatch(setOpenObjectPageId(objectId));
    dispatch(setOpenObjectPageOpenState(true));
  };

  const handleDragEnd = (e, deal, stage) => {
    if (stage?._id !== draggableStageId) {
      const dealId = deal?._id;
      const newDeal = { ...deal, stageId: draggableStageId };

      dispatch(updateDeal(newDeal, dealId)).then(
        toast.success("Сделка успешно перемещена!")
      );
      setDraggableStageId(null);
    } else {
      setDraggableStageId(null);
    }
  };

  return (
    <ObjectsContainer>
      {deals?.map((deal) => {
        const isDeal = deal?.stageId === stage?._id;

        return isDeal ? (
          <ObjectContainer
            key={deal?._id}
            draggable={true}
            onDragEnd={(e) => handleDragEnd(e, deal, stage)}
          >
            <ObjectAddress
              deal={deal}
              onClick={() => handleOpenObjectPage(deal?.objectId)}
              getObjectAddress={getObjectAddress}
            />
            <DividerStyled />
            <Footer
              deal={deal}
              userName={userName}
              onClick={() => handleUpdateDeal(deal?._id)}
            />
          </ObjectContainer>
        ) : null;
      })}
    </ObjectsContainer>
  );
};

export default Objects;
