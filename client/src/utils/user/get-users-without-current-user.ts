import { useSelector } from "react-redux";
import { getCurrentUserId, getUsersList } from "../../store/user/users.store";

export const getUsersWithoutCurrentUser = () => {
  const usersList = useSelector(getUsersList());
  const currentUserId = useSelector(getCurrentUserId());
  const result = usersList?.filter((user) => user._id !== currentUserId);
  return result;
};
