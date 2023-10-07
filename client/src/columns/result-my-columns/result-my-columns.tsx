import dayjs from "dayjs";
import "dayjs/locale/ru";
import { useSelector } from "react-redux";
import { getObjectsList } from "../../store/object/objects.store";
import { Box, styled } from "@mui/material";
import { getMeetingsList } from "../../store/meeting/meetings.store";
import { getLastContactsList } from "../../store/last-contact/last-contact.store";
import { getTasksList } from "../../store/task/tasks.store";

const Container = styled(Box)`
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
`;

// Функция для создания заголовков месяцев за последние 6 месяцев
const generateMonthHeaders = () => {
  const currentMonth = dayjs();
  const monthHeaders = [];

  for (let i = 5; i >= 0; i--) {
    const month = currentMonth.subtract(i, "month");
    const monthHeader = month.locale("ru").format("MMMM");
    monthHeaders.push({
      accessorFn: (row) => row,
      header: monthHeader,
      cell: () => {
        const objects = useSelector(getObjectsList());
        const currentMonthObjects = objects.filter((object) => {
          return dayjs(object.created_at).month() === month.month();
        });
        const objectQuantity = currentMonthObjects?.length;

        const objectsWithPhone = currentMonthObjects?.filter((obj) => {
          const phoneNumber = obj?.contact?.phone;
          return phoneNumber !== null && String(phoneNumber)?.length > 0;
        });
        const objectsWithPhoneQuantity = objectsWithPhone?.length;

        const meetings = useSelector(getMeetingsList());
        const monthMeetings = meetings?.filter((meet) => {
          return dayjs(meet.created_at).month() === month.month();
        });
        const monthMeetingsQuantity = monthMeetings?.length;

        const lastContacts = useSelector(getLastContactsList());
        const monthLastContacts = lastContacts?.filter((contact) => {
          return dayjs(contact.created_at).month() === month.month();
        });
        const monthLastContactsQuantity = monthLastContacts?.length;

        const tasks = useSelector(getTasksList());
        const monthTasks = tasks?.filter((task) => {
          return dayjs(task.created_at).month() === month.month();
        });
        const monthTasksQuantity = monthTasks?.length;

        return objectQuantity ? (
          <Box>
            <Container
              sx={{
                background: "yellow",
                color: "black",
              }}
            >
              Объекты: {objectQuantity}шт
            </Container>
            <Container
              sx={{
                background: "FireBrick",
              }}
            >
              С телефоном: {objectsWithPhoneQuantity}шт
            </Container>
            <Container
              sx={{
                background: "royalBlue",
              }}
            >
              Встречи: {monthMeetingsQuantity}шт
            </Container>
            <Container
              sx={{
                background: "saddleBrown",
              }}
            >
              Контакты: {monthLastContactsQuantity}шт
            </Container>
            <Container
              sx={{
                background: "darkOrange",
              }}
            >
              Задачи: {monthTasksQuantity}шт
            </Container>
          </Box>
        ) : null;
      },
    });
  }

  return monthHeaders;
};

// Функция для создания заголовков недель текущего месяца
const generateWeekHeaders = () => {
  const currentMonth = dayjs();
  const weekHeaders = [];

  let weekStart = currentMonth.startOf("month").startOf("week").add(1, "day"); // Начало текущей недели с понедельника
  let weekEnd = weekStart.endOf("week").add(1, "day"); // Конец текущей недели в воскресенье

  while (weekStart.isBefore(currentMonth.endOf("month"))) {
    const formattedWeekStart = weekStart.locale("ru").format("DD.MM");
    const formattedWeekEnd = weekEnd.locale("ru").format("DD.MM");

    const weekStartCopy = weekStart.clone();
    const weekEndCopy = weekEnd.clone();

    const weekHeader = `${formattedWeekStart}-${formattedWeekEnd}`;
    
    weekHeaders.push({
      accessorFn: (row) => row,
      header: weekHeader,
      cell: (info) => {
        const objects = useSelector(getObjectsList());

        const weeklyObjects = objects?.filter((obj) => {
          const createdAt = dayjs(obj?.created_at);
          return createdAt.isBetween(weekStartCopy, weekEndCopy, null, "[]");
        });
        const weeklyObjectsQuantity = weeklyObjects?.length;
      
        const objectsWithPhone = weeklyObjects?.filter((obj) => {
          const phoneNumber = obj?.contact?.phone;
          return phoneNumber !== null && String(phoneNumber)?.length > 0;
        });
        const objectsWithPhoneQuantity = objectsWithPhone?.length;

        const meetings = useSelector(getMeetingsList());
        const weeklyMeetings = meetings?.filter((meet) => {
          const createdAt = dayjs(meet?.date);
          return createdAt.isBetween(weekStartCopy, weekEndCopy, null, "[]");
        });
        const weeklyMeetingsQuantity = weeklyMeetings?.length;

        const lastContacts = useSelector(getLastContactsList());
        const weeklyLastContacts = lastContacts?.filter((contact) => {
          const createdAt = dayjs(contact?.date);
          return createdAt.isBetween(weekStartCopy, weekEndCopy, null, "[]");
        });
        const weeklyLastContactsQuantity = weeklyLastContacts?.length;

        const tasks = useSelector(getTasksList());
        const weeklyTasks = tasks?.filter((task) => {
          const createdAt = dayjs(task?.date);
          return createdAt.isBetween(weekStartCopy, weekEndCopy, null, "[]");
        });
        const weeklyTasksQuantity = weeklyTasks?.length;

        return weeklyObjectsQuantity ? (
          <Box>
            <Container
              sx={{
                background: "yellow",
                color: "black",
              }}
            >
              Объекты: {weeklyObjectsQuantity}шт
            </Container>
            <Container
              sx={{
                background: "FireBrick",
              }}
            >
              С телефоном: {objectsWithPhoneQuantity}шт
            </Container>
            <Container
              sx={{
                background: "royalBlue",
              }}
            >
              Встречи: {weeklyMeetingsQuantity}шт
            </Container>
            <Container
              sx={{
                background: "saddleBrown",
              }}
            >
              Контакты: {weeklyLastContactsQuantity}шт
            </Container>
            <Container
              sx={{
                background: "darkOrange",
              }}
            >
              Задачи: {weeklyTasksQuantity}шт
            </Container>
          </Box>
        ) : null;
      },
    });

    weekStart = weekEnd.add(1, "day"); // Переход к следующей неделе
    weekEnd = weekStart.endOf("week").add(1, "day");
  }

  return weekHeaders;
};

export const resultMyColumns = [
  {
    header: "ПОСЛЕДНИЕ 6 МЕСЯЦЕВ",
    columns: generateMonthHeaders(),
  },
  {
    header: dayjs().locale("ru").format("MMMM").toUpperCase(), // Заголовок текущего месяца
    columns: generateWeekHeaders(), // Заголовки недель текущего месяца
  },
];
