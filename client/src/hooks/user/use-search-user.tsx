import { useMemo } from "react";
import "dayjs/locale/ru";

const useSearchUser = ({ users, data }) => {
  const searchedUsers = useMemo(() => {
    let array = users;

    if (data?.lastName?.length) {
      array = array?.filter((user) =>
        user.lastName.toLowerCase().includes(data.lastName.toLowerCase())
      );
    }

    if (data?.phone?.length) {
      array = array?.filter((user) =>
        String(user.phone).includes(data?.phone)
      );
    }

    if (data?.email?.length) {
      array = array?.filter((user) =>
        user.email.toLowerCase().includes(data.email.toLowerCase())
      );
    }

    if (data?.gender?.length) {
      array = array?.filter((user) => user.gender.includes(data.gender));
    }

    if (data.selectedUsers?.length) {
      array = array?.filter((user) => data.selectedUsers.includes(user._id));
    }

    if (data.selectedStatuses?.length) {
      array = array?.filter((user) =>
        data.selectedStatuses?.includes(user?.status)
      );
    }

    return array;
  }, [data, users]);

  return searchedUsers;
};

export default useSearchUser;
