import { useSelector } from "react-redux";
import dayjs from "dayjs";
import { getContactsList } from "@store/contact/contact.store";

export const getCurrentWeekContacts = () => {
  const contacts = useSelector(getContactsList());
  const currentDate = dayjs();

  if (contacts) {
    const weeklyContacts = contacts?.filter((cont) => {
      const createdAt = dayjs(cont?.created_at);
      const startOfWeek = currentDate.startOf("week");
      const endOfWeek = currentDate.endOf("week");
      return createdAt.isBetween(startOfWeek, endOfWeek);
    });
    return weeklyContacts;
  }
};
