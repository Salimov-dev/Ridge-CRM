import { orderBy } from "lodash";
import { useSelector } from "react-redux";
import { getUserStatusesList } from "../../store/user-params/user-statuses.store";

const useUsers = (users, usersWithoutCurrentUser) => {
  const statuses = useSelector(getUserStatusesList());

  const getActualUsersList = () => {
    const actualUsersArray = usersWithoutCurrentUser?.map((u) => {
      const foundObject = users?.find((user) => user?._id === u?._id);
      return foundObject
        ? {
            _id: foundObject?._id,
            name: `${foundObject?.name?.lastName} ${foundObject?.name?.firstName}`,
          }
        : null;
    });

    const sortedUsers = orderBy(actualUsersArray, ["name"], ["asc"]);

    return sortedUsers;
  };

  const getActualStatusesList = () => {
    const filteredStatuses = usersWithoutCurrentUser?.map(
      (user) => user?.status
    );
    const formateStatusesArray = filteredStatuses?.filter((s) => s !== "");

    const uniqueStatuses = [...new Set(formateStatusesArray)];

    const actualStatusesArray = uniqueStatuses?.map((id) => {
      const foundObject = statuses?.find((obj) => obj._id === id);
      return foundObject
        ? { _id: foundObject._id, name: foundObject.name }
        : null;
    });

    const sortedStatuses = orderBy(actualStatusesArray, ["name"], ["asc"]);

    return sortedStatuses;
  };

  return {
    getActualUsersList,
    getActualStatusesList,
  };
};

export default useUsers;
