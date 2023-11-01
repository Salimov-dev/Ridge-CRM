import { orderBy } from "lodash";
import { useSelector } from "react-redux";
import { getUsersList } from "../../store/user/users.store";

const useDealsFiltersPanel = (deals) => {
  const users = useSelector(getUsersList());

  const getActualUsersList = () => {
    const filteredUsers = deals?.map((meet) => meet?.userId);
    const formatedUsersArray = filteredUsers?.filter((user) => user !== "");

    const uniqueUsers = [...new Set(formatedUsersArray)];

    const actualUsersArray = uniqueUsers?.map((id) => {
      const foundObject = users?.find((user) => user._id === id);
      return foundObject
        ? {
            _id: foundObject._id,
            name: `${foundObject.name.lastName} ${foundObject.name.firstName}`,
          }
        : null;
    });

    const sortedUsers = orderBy(actualUsersArray, ["name"], ["asc"]);

    return sortedUsers;
  };

  return { getActualUsersList };
};

export default useDealsFiltersPanel;
