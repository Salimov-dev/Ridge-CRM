import { useDispatch } from "react-redux";
import { createNewUserUpdate, updateUserUpdate } from "../../store/user/users.store";


const handleUserSocket = (socket) => {
  const dispatch = useDispatch();

  socket.on("createUser", async (newUser) => {
    dispatch<any>(createNewUserUpdate(newUser));
  });
  socket.on("updateUser", async (updatedUser) => {
    dispatch<any>(updateUserUpdate(updatedUser));
  });
};

export default handleUserSocket;
