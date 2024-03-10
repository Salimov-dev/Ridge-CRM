import { useSelector } from "react-redux";
import dayjs from "dayjs";
import { getContactsList } from "@store/contact/contact.store";

export const getWeeklyContacts = (startDate, endDate, items = null) => {
  const contacts = useSelector(getContactsList());

  const array = items ? items : contacts;

  return array?.filter((object) => {
    const createdAt = dayjs(object.created_at, {
      format: "YYYY-MM-DD"
    });

    return createdAt.isBetween(startDate, endDate, null, "[]");
  });
};
