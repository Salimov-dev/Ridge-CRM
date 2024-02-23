import { useDispatch } from "react-redux";
import {
  createPresentationUpdate,
  removePresentationUpdate,
  updatePresentationUpdate
} from "@store/presentation/presentations.store";

const handlePresentationSocket = (socket) => {
  const dispatch = useDispatch();

  socket.on("createPresentation", async (newPresentation) => {
    dispatch<any>(createPresentationUpdate(newPresentation));
  });
  socket.on("updatePresentation", async (updatedPresentation) => {
    dispatch<any>(updatePresentationUpdate(updatedPresentation));
  });
  socket.on("deletePresentation", async (PresentationId) => {
    dispatch<any>(removePresentationUpdate(PresentationId));
  });
};

export default handlePresentationSocket;
