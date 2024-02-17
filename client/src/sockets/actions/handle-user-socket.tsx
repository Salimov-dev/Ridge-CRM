import { useDispatch } from "react-redux";
import { updateUserUpdate } from "@store/user/users.store";

const handleUserSocket = (socket) => {
  const dispatch = useDispatch();

  socket.on("updateUser", async (updatedUser) => {
    dispatch<any>(updateUserUpdate(updatedUser));
  });
};

export default handleUserSocket;
