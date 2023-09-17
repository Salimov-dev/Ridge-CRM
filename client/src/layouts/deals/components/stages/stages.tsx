import { useState } from "react";
import { Box, Paper, styled } from "@mui/material";
import Title from "./components/title";
import Objects from "./components/objects";
import CreateDealButton from "./components/create-deal-button";
import DividerStyled from "../../../../components/common/divider/divider-styled";

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
  border: 2px dashed gray;
  padding: 20px;
`;

const Stages = ({ deals, stages, userName, onOpen, getObjectAddress }) => {
  const [draggableStageId, setDraggableStageId] = useState(null);

  const handleDragOver = (e, stageId) => {
    e.preventDefault();
    setDraggableStageId(stageId);
  };

  return (
    <DealsContainer>
      {stages?.map((stage) => (
        <DealContainer
          key={stage._id}
          onDragOver={(e) => handleDragOver(e, stage._id)}
          sx={{
            border:
              draggableStageId === stage?._id ? `1px dashed yellow` : null,
          }}
        >
          <Title item={stage} />
          <DividerStyled
            margin="20px 0 20px 0"
            color={draggableStageId === stage?._id ? "yellow" : "inherit"}
          />
          <Objects
            deals={deals}
            stage={stage}
            userName={userName}
            draggableStageId={draggableStageId}
            getObjectAddress={getObjectAddress}
            setDraggableStageId={setDraggableStageId}
          />
          <CreateDealButton stage={stage} onOpen={onOpen} />
        </DealContainer>
      ))}
    </DealsContainer>
  );
};

export default Stages;
