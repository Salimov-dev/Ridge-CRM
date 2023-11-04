import "dayjs/locale/ru";
import { useMemo } from "react";

const useSearchStatictics = (objects, data) => {
  const searchedObjects = useMemo(() => {
    let array = objects;

    if (data.selectedUsers?.length) {
      array = array?.filter((obj) => data.selectedUsers.includes(obj.userId));
    }

    return array;
  }, [data, objects]);

  return searchedObjects;
};

export default useSearchStatictics;
