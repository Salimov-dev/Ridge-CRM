import { getObjectById } from "@store/object/objects.store";
import { getCurrentUserId } from "@store/user/users.store";
import { useSelector } from "react-redux";

export const filteredContactsForManager = (company) => {
  const currentUserId = useSelector(getCurrentUserId());

  const contacts = company?.contacts.map((obj) => {
    return useSelector(getObjectById(obj.contact));
  });

  const filteredContacts = contacts?.filter(
    (obj) => obj && obj.userId === currentUserId
  );

  const filteredContactsIds = filteredContacts?.map((obj) => ({
    contact: obj._id
  }));

  return filteredContactsIds;
};
