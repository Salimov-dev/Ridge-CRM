import "dayjs/locale/ru";
import { useMemo } from "react";

const useSearchDeals = (deals, data) => {
  const searchedDeals = useMemo(() => {
    let array = deals;

    if (data.selectedUsers?.length) {
      const res = array?.filter((obj) =>
        data.selectedUsers?.includes(obj?.userId)
      );
      return res;
    }

    return array;
  }, [data, deals]);

  return searchedDeals;
};

export default useSearchDeals;
