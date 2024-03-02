import { updateTeammateUpdate } from "@store/user/users.store";
import { useDispatch } from "react-redux";

const handleTeammateSocket = (socket) => {
  const dispatch = useDispatch();

  socket.on("updateTeammate", async (updatedTeammate) => {
    dispatch<any>(updateTeammateUpdate(updatedTeammate));
  });
};

export default handleTeammateSocket;
