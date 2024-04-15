import { useDispatch, useSelector } from "react-redux";
import { Box, Paper, styled } from "@mui/material";
// components
import DealObjectAddress from "./object-address.deals-layout";
import UserNameWithAvatar from "@components/common/user/user-name-with-avatar";
// data
import { dealStagesArray } from "@data/deals/deals-stages";
// hooks
import useGetUserAvatar from "@hooks/user/use-get-user-avatar";
import useDialogHandlers from "@hooks/dialog/use-dialog-handlers";
// store
import { updateObject } from "@store/object/objects.store";
import {
  getCurrentUserId,
  getIsCurrentUserRoleManager,
  getUsersList
} from "@store/user/users.store";

const Component = styled(Box)`
  width: 100%;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  gap: 4px;
  margin-bottom: 14px;
  overflow-y: scroll;
`;

const ObjectContainer = styled(Paper)`
  width: 100%;
  color: black;
  background: white;
  padding: 10px;
  border: 1px solid gray;
`;

const DealObjects = ({
  deals,
  stage,
  setState,
  draggableStageId,
  setDraggableStageId
}) => {
  const dispatch = useDispatch();
  const users = useSelector(getUsersList());
  const currentUserId = useSelector(getCurrentUserId());
  const isCurrentUserRoleManager = useSelector(getIsCurrentUserRoleManager());

  const userAvatars = {};
  users.forEach((user) => {
    const { getAvatarSrc, isLoading } = useGetUserAvatar(user._id);
    userAvatars[user._id] = { getAvatarSrc, isLoading };
  });

  const getNewDealStage = (stageId) => {
    const stage = dealStagesArray.find((deal) => deal?._id === stageId);
    const newObjectStatus = stage?.objectStatusId;
    return newObjectStatus;
  };

  const { handleOpenObjectPage } = useDialogHandlers(setState);

  const handleDragEnd = (obj, stage) => {
    if (stage?._id !== draggableStageId) {
      const updatedObject = {
        ...obj,
        status: getNewDealStage(draggableStageId)
      };

      dispatch<any>(updateObject({ newData: updatedObject }));

      setDraggableStageId(null);
    } else {
      setDraggableStageId(null);
    }
  };

  return (
    <Component>
      {deals?.map((obj) => {
        const isDeal = obj?.status === stage?.objectStatusId;
        const user = users?.find((user) => user?._id === obj?.userId);
        const avatarData = userAvatars[obj.userId];
        const isAuthorEntity = obj.userId === currentUserId;

        return isDeal ? (
          <ObjectContainer
            key={obj?._id}
            draggable={isAuthorEntity}
            onDragEnd={() => handleDragEnd(obj, stage)}
            sx={{ cursor: isAuthorEntity ? "grab" : "default" }}
          >
            <DealObjectAddress
              obj={obj}
              onClick={() => handleOpenObjectPage(obj?._id)}
            />
            {!isCurrentUserRoleManager && (
              <UserNameWithAvatar
                userId={user._id}
                color="black"
                avatarSrc={avatarData.getAvatarSrc()}
                fontStyle="italic"
                isLoading={avatarData.isLoading}
              />
            )}
          </ObjectContainer>
        ) : null;
      })}
    </Component>
  );
};

export default DealObjects;
