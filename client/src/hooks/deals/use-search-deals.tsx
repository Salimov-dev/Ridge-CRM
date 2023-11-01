import "dayjs/locale/ru";
import { useMemo } from "react";

const useSearchDeals = (deals, data) => {
  const searchedDeals = useMemo(() => {
    let array = deals;

    if (data.selectedUsers?.length) {
      array = array?.filter((obj) => data.selectedUsers.includes(obj.userId));
    }

    return array;
  }, [data, deals]);

  return searchedDeals;
};

export default useSearchDeals;
