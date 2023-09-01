import { orderBy } from "lodash";
import { useSelector } from "react-redux";
import { getMeetingsList } from "../../store/meeting/meetings.store";
import { getUsersList } from "../../store/user/users.store";
import { getMeetingStatusesList } from "../../store/meeting/meeting-status.store";
import { getMeetingTypesList } from "../../store/meeting/meeting-types.store";

const useMeetingFiltersPanel = () => {
  const meetings = useSelector(getMeetingsList());
  const users = useSelector(getUsersList());
  const statuses = useSelector(getMeetingStatusesList());
  const types = useSelector(getMeetingTypesList());

  const getActualUsersList = () => {
    const filteredUsers = meetings?.map((meet) => meet?.userId);
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

  const getActualStatusesList = () => {
    const filteredStatuses = meetings?.map((meet) => meet?.status);
    const formatedStatusesArray = filteredStatuses?.filter(
      (status) => status !== ""
    );

    const uniqueStatuses = [...new Set(formatedStatusesArray)];

    const actualStatusesArray = uniqueStatuses?.map((id) => {
      const foundObject = statuses?.find((status) => status._id === id);
      return foundObject
        ? {
            _id: foundObject._id,
            name: foundObject.name,
          }
        : null;
    });

    const sortedStatuses = orderBy(actualStatusesArray, ["name"], ["asc"]);

    return sortedStatuses;
  };

  const getActuaTypesList = () => {
    const filteredTypes = meetings?.map((meet) => meet?.meetingType);
    const formatedTypesArray = filteredTypes?.filter((type) => type !== "");
    const uniqueTypes = [...new Set(formatedTypesArray)];

    const actualTypesArray = uniqueTypes?.map((id) => {
      const foundObject = types?.find((type) => type._id === id);
      return foundObject
        ? {
            _id: foundObject._id,
            name: foundObject.name,
          }
        : null;
    });

    const sortedTypes = orderBy(actualTypesArray, ["name"], ["asc"]);

    return sortedTypes;
  };
  return { getActualUsersList, getActualStatusesList, getActuaTypesList };
};

export default useMeetingFiltersPanel;
