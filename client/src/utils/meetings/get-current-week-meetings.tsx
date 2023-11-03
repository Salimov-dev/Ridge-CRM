import { useSelector } from "react-redux";
import dayjs from "dayjs";
import { getMeetingsList } from "../../store/meeting/meetings.store";

export const getCurrentWeekMeetings = () => {
  const meetings = useSelector(getMeetingsList());
  const currentDate = dayjs();

  const weeklyMeetings = meetings?.filter((meet) => {
    const createdAt = dayjs(meet?.date);
    const startOfWeek = currentDate.startOf('week');
    const endOfWeek = currentDate.endOf('week');
    return createdAt.isBetween(startOfWeek, endOfWeek)  && meet.isDone !== true;
  });

  return weeklyMeetings;
};
