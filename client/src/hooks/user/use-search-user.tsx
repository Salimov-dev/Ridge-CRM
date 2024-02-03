import { useMemo } from "react";
import "dayjs/locale/ru";

const useSearchUser = ({ users, data }) => {
  const searchedUsers = useMemo(() => {
    let array = users;

    if (data?.lastName?.length) {
      array = array?.filter((user) =>
        user.lastName && data.lastName
          ? user.lastName.toLowerCase().includes(data.lastName.toLowerCase())
          : false
      );
    }

    if (data?.phone?.length) {
      array = array?.filter((user) => String(user.phone).includes(data?.phone));
    }

    if (data?.email?.length) {
      array = array?.filter((user) =>
        user.email.toLowerCase().includes(data.email.toLowerCase())
      );
    }

    if (data?.gender?.length) {
      array = array?.filter((user) => user.gender === data.gender);
    }

    return array;
  }, [data, users]);

  return searchedUsers;
};

export default useSearchUser;
