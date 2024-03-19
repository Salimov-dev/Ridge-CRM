import { useDispatch, useSelector } from "react-redux";
import {
  createPresentationUpdate,
  removePresentationUpdate,
  updatePresentationUpdate
} from "@store/presentation/presentations.store";
import { getCurrentUserId, getIsUserManager } from "@store/user/users.store";

const handlePresentationSocket = (socket) => {
  const dispatch = useDispatch();
  const currentUserId = useSelector(getCurrentUserId());
  const isManager = useSelector(getIsUserManager(currentUserId));

  socket.on("createPresentation", async (newPresentation) => {
    const presentationUserId = newPresentation?.userId;

    if (
      isManager === undefined ||
      (isManager && presentationUserId !== currentUserId)
    ) {
      return null;
    } else {
      dispatch<any>(createPresentationUpdate(newPresentation));
    }
  });
  socket.on("updatePresentation", async (updatedPresentation) => {
    dispatch<any>(updatePresentationUpdate(updatedPresentation));
  });
  socket.on("deletePresentation", async (PresentationId) => {
    dispatch<any>(removePresentationUpdate(PresentationId));
  });
};

export default handlePresentationSocket;
