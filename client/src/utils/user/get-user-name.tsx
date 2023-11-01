import { useSelector } from "react-redux";
import { getUsersList } from "../../store/user/users.store";

export const getUserName = (id) => {
  const users = useSelector(getUsersList());

  const user = users?.find((user) => user._id === id);
  const result = `${user?.name.lastName} ${user?.name.firstName}`;

  return result;
};
