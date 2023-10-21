import { orderBy } from "lodash";
import { useSelector } from "react-redux";
import { getUsersList } from "../../store/user/users.store";
import { getPresentationStatusList } from "../../store/presentation/presentation-status.store";

const usePresentationFiltersPanel = (presentations) => {
  const users = useSelector(getUsersList());
  const presentationsStatuses = useSelector(getPresentationStatusList());

  const getActualStatusesList = () => {
    const filteredStatuses = presentations?.map((pres) => pres.status);
    const uniqueStatuses = [...new Set(filteredStatuses)];

    const actualStatusesArray = uniqueStatuses?.map((id) => {
      const foundPresentation = presentationsStatuses?.find(
        (pres) => pres._id === id
      );
      return foundPresentation
        ? { _id: foundPresentation._id, name: foundPresentation.name }
        : null;
    });

    const sortedStatuses = orderBy(actualStatusesArray, ["name"], ["asc"]);

    return sortedStatuses;
  };

  const getActualUsersList = () => {
    const filteredUsers = presentations?.map((obj) => obj?.userId);
    const formatedUsersArray = filteredUsers?.filter((m) => m !== "");

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

    const sortedUsers = orderBy(actualUsersArray, ["nam.firstName"], ["asc"]);

    return sortedUsers;
  };

  return {
    getActualStatusesList,
    getActualUsersList,
  };
};

export default usePresentationFiltersPanel;
