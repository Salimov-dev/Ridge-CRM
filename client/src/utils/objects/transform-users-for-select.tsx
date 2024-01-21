import { getUserNameById } from "@store/user/users.store";
import { useSelector } from "react-redux";

const transformUsersForSelect = (users) => {
  let transformUsers = [];

  users?.forEach((user) => {
    transformUsers?.push({
      _id: user._id,
      name: useSelector(getUserNameById(user?._id)),
    });
  });

  return transformUsers;
};

export default transformUsersForSelect;
