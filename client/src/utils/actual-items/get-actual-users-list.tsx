import { orderBy } from "lodash";
import { useSelector } from "react-redux";
import { getUsersList } from "../../store/user/users.store";

export const getActualUsersList = (items) => {
  const users = useSelector(getUsersList());

  const filteredUsers = items?.map((item) => item?.userId);
  const formatedUsersArray = filteredUsers?.filter((user) => user !== "");

  const uniqueUsers = [...new Set(formatedUsersArray)];

  const actualUsersArray = uniqueUsers?.map((id) => {
    const foundObject = users?.find((user) => user._id === id);
    const lastName = foundObject?.lastName;
    const firstName = foundObject?.firstName;
    return foundObject
      ? {
          _id: foundObject._id,
          name: `${lastName ? lastName : "Без"} ${
            firstName ? firstName : "имени"
          }`
        }
      : null;
  });

  const sortedUsers = orderBy(actualUsersArray, ["name"], ["asc"]);

  return sortedUsers;
};
