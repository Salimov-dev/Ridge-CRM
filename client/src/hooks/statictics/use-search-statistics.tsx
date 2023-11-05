import "dayjs/locale/ru";
import { useMemo } from "react";

const useSearchStatictics = (objects, users, data) => {
  const searchedObjects = useMemo(() => {
    let array = objects;

    if (data.selectedUsers?.length) {
      array = array?.filter((obj) => data.selectedUsers.includes(obj.userId));
    }

    return array;
  }, [data, objects]);

  const searchedUsers = useMemo(() => {
    let array = users;

    if (data.selectedUsers?.length) {
      array = array?.filter((user) => data.selectedUsers.includes(user._id));
    }

    return array;
  }, [data, users]);

  return { searchedObjects, searchedUsers };
};

export default useSearchStatictics;
