import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Box, Paper, styled } from "@mui/material";
// components
import ObjectAddress from "./components/object-address";
// store
import {
  getObjectsList,
  updateObject,
} from "../../../../../store/object/objects.store";
import {
  setOpenObjectPageId,
  setOpenObjectPageOpenState,
} from "../../../../../store/object/open-object-page.store";
import { dealStagesArray } from "../../../../../mock/deals-stages";

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
  stage,
  getObjectAddress,
  draggableStageId,
  setDraggableStageId,
}) => {
  const dispatch = useDispatch();

  const handleOpenObjectPage = (objectId) => {
    dispatch<any>(setOpenObjectPageId(objectId));
    dispatch<any>(setOpenObjectPageOpenState(true));
  };
  const dealStageList = dealStagesArray;

  const getNewDealStage = (stageId) => {
    const stage = dealStageList.find((deal) => deal?._id === stageId);
    const newObjectStatus = stage?.objectStatusId;
    return newObjectStatus;
  };

  const handleDragEnd = (obj, stage) => {
    if (stage?._id !== draggableStageId) {
      const updatedObject = {
        ...obj,
        status: getNewDealStage(draggableStageId),
      };

      dispatch<any>(updateObject(updatedObject));

      setDraggableStageId(null);
    } else {
      setDraggableStageId(null);
    }
  };

  const objects = useSelector(getObjectsList());
  return (
    <ObjectsContainer>
      {objects?.map((obj) => {
        const isDeal = obj?.status === stage?.objectStatusId;

        return isDeal ? (
          <ObjectContainer
            key={obj?._id}
            draggable={true}
            onDragEnd={(e) => handleDragEnd(obj, stage)}
          >
            <ObjectAddress
              obj={obj}
              onClick={() => handleOpenObjectPage(obj?._id)}
              getObjectAddress={getObjectAddress}
            />
          </ObjectContainer>
        ) : null;
      })}
    </ObjectsContainer>
  );
};

export default Objects;
