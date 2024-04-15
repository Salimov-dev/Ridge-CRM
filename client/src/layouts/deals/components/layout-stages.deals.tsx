import { useState } from "react";
import { Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { Paper, styled } from "@mui/material";
// components
import Loader from "@components/common/loader/loader";
import DealTitle from "./title.deals";
import DealObjects from "./objects.deals";
// store
import { getObjectsLoadingStatus } from "@store/object/objects.store";

const DealContainer = styled(Paper)`
  display: flex;
  height: 500px;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  color: black;
  background: inherit;
  border: 2px dashed gray;
  padding: 10px;
`;

const DealsLayoutStages = ({ deals, stages, setState }) => {
  const [draggableStageId, setDraggableStageId] = useState(null);
  const isLoading = useSelector(getObjectsLoadingStatus());

  const handleDragOver = (e, stageId) => {
    e.preventDefault();
    setDraggableStageId(stageId);
  };

  return (
    <Grid container spacing={1}>
      {stages?.map((stage) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={stage._id}>
          <DealContainer
            onDragOver={(e) => handleDragOver(e, stage._id)}
            sx={{
              border:
                draggableStageId === stage?._id ? `1px dashed yellow` : null
            }}
          >
            <DealTitle item={stage} deals={deals} />
            {!isLoading ? (
              <DealObjects
                stage={stage}
                deals={deals}
                draggableStageId={draggableStageId}
                setDraggableStageId={setDraggableStageId}
                setState={setState}
              />
            ) : (
              <Loader />
            )}
          </DealContainer>
        </Grid>
      ))}
    </Grid>
  );
};

export default DealsLayoutStages;
