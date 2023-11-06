import "dayjs/locale/ru";
import "dayjs/locale/ru";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import customParseFormat from "dayjs/plugin/customParseFormat";
// components
import TableCell from "./components/table-cell";
import UserNameWithAvatar from "../../components/common/table/helpers/user-name-with-avatar";
// hooks
import { useTableHeader } from "./hooks/use-table-header";
// utils
import { getWeeklyObjects } from "../../utils/objects/get-weekly-objects";
import { getWeeklyPresentations } from "../../utils/presentations/get-weekly-presentations";
import { getWeeklyObjectsWithPhone } from "../../utils/objects/get-weekly-objects-with-phone";
// store
import { getObjectsList } from "../../store/object/objects.store";
import { getPresentationsList } from "../../store/presentation/presentations.store";
import { getUserDataById } from "../../store/user/users.store";

dayjs.extend(customParseFormat);
dayjs.locale("ru");

const generateMonthHeaders = () => {
  const currentMonth = dayjs();
  const monthHeaders = [];

  for (let i = 0; i < 6; i++) {
    const month = currentMonth.subtract(i, "month");
    const monthHeader = month.locale("ru").format("MMMM");
    monthHeaders.push({
      accessorFn: (row) => row,
      header: monthHeader,
      cell: (info) => {
        const user = info.getValue();
        const objects = useSelector(getObjectsList());
        const presentations = useSelector(getPresentationsList());

        const currentUserObjects = objects?.filter(
          (obj) => obj?.userId === user?._id
        );

        const currentUserPresentations = presentations?.filter(
          (pres) => pres?.userId === user?._id
        );

        const currentMonthObjects = currentUserObjects?.filter((object) => {
          return dayjs(object.created_at).month() === month.month();
        });

        const objectsWithPhone = currentMonthObjects?.filter((obj) => {
          const phoneNumber = obj?.contact?.phone;
          return phoneNumber !== null && String(phoneNumber)?.length > 0;
        });

        const currentMonthPresentations = currentUserPresentations?.filter(
          (presentation) => {
            return dayjs(presentation.created_at).month() === month.month();
          }
        );

        return (
          <TableCell
            objects={currentMonthObjects}
            objectsWithPhone={objectsWithPhone}
            presentations={currentMonthPresentations}
          />
        );
      },
    });
  }

  return monthHeaders;
};

export const staticticsColumnsCuratorReverse = [
  {
    header: "Результат",
    columns: [
      {
        accessorKey: "_id",
        header: "Менеджер",
        cell: (info) => {
          const userId = info.getValue();
          const user = useSelector(getUserDataById(userId));
          return <UserNameWithAvatar user={user} />;
        },
      },
      {
        accessorFn: (row) => row,
        header: "Позиция",
        cell: () => {
          return <TableCell onlyTitle={true} />;
        },
      },
      {
        accessorFn: (row) => row,
        header: "ИТОГО",
        cell: (info) => {
          const currentMonth = dayjs();
          const sixMonthsAgo = currentMonth.subtract(6, "month");
          const user = info.getValue();
          const objects = useSelector(getObjectsList());
          const presentations = useSelector(getPresentationsList());

          const currentUserObjects = objects?.filter(
            (obj) => obj?.userId === user?._id
          );

          const currentUserPresentations = presentations?.filter(
            (pres) => pres?.userId === user?._id
          );

          const currentMonthObjects = currentUserObjects?.filter((object) => {
            const objectDate = dayjs(object.created_at);
            return (
              objectDate.isAfter(sixMonthsAgo) &&
              objectDate.isBefore(currentMonth)
            );
          });

          const objectsWithPhone = currentMonthObjects?.filter((obj) => {
            const phoneNumber = obj?.contact?.phone;
            return phoneNumber !== null && String(phoneNumber)?.length > 0;
          });

          const currentMonthPresentations = currentUserPresentations?.filter(
            (presentation) => {
              const presentationDate = dayjs(presentation.created_at);
              return (
                presentationDate.isAfter(sixMonthsAgo) &&
                presentationDate.isBefore(currentMonth)
              );
            }
          );

          return (
            <TableCell
              objects={currentMonthObjects}
              objectsWithPhone={objectsWithPhone}
              presentations={currentMonthPresentations}
            />
          );
        },
      },
    ],
  },
 
  {
    header: "ПОСЛЕДНИЕ 4 НЕДЕЛИ", // Заголовок текущего месяца
    columns: [
      {
        // текущая неделя
        accessorFn: (row) => row,
        header: (() => {
          const currentDate = dayjs();
          const startOfWeek = currentDate.startOf("week");
          const endOfWeek = currentDate.endOf("week").day(0);
          const formattedDate = `${startOfWeek.format(
            "DD.MM"
          )} - ${endOfWeek.format("DD.MM")}`;
          return formattedDate;
        })(),
        enableSorting: false,
        size: 30,
        cell: (info) => {
          const currentDate = dayjs();
          const startOfWeek = currentDate.startOf("week");
          const endOfWeek = currentDate.endOf("week").day(0);

          const user = info.getValue();
          const objects = useSelector(getObjectsList());
          const currentUserObjects = objects?.filter(
            (obj) => obj?.userId === user?._id
          );

          const presentations = useSelector(getPresentationsList());
          const currentUserPresentations = presentations?.filter(
            (pres) => pres?.userId === user?._id
          );

          const weeklyPresentations = getWeeklyPresentations(
            startOfWeek,
            endOfWeek,
            currentUserPresentations
          );
          const weeklyObjects = getWeeklyObjects(
            startOfWeek,
            endOfWeek,
            currentUserObjects
          );
          const weeklyObjectsWithPhone = getWeeklyObjectsWithPhone(
            startOfWeek,
            endOfWeek,
            currentUserObjects
          );

          return (
            <TableCell
              objects={weeklyObjects}
              objectsWithPhone={weeklyObjectsWithPhone}
              presentations={weeklyPresentations}
            />
          );
        },
      },
      
      {
        // предыдущая неделя
        accessorFn: (row) => row,
        header: (() => {
          return useTableHeader(1);
        })(),
        enableSorting: false,
        size: 30,
        cell: (info) => {
          const currentDate = dayjs();

          const endOPreviousWeek = currentDate
            .subtract(1, "week")
            .endOf("week");
          const startOPreviousWeek = endOPreviousWeek.subtract(6, "day");

          const formattedStartDate = startOPreviousWeek.format("YYYY-MM-DD");
          const formattedEndDate = endOPreviousWeek.format("YYYY-MM-DD");

          const user = info.getValue();
          const objects = useSelector(getObjectsList());
          const currentUserObjects = objects?.filter(
            (obj) => obj?.userId === user?._id
          );

          const presentations = useSelector(getPresentationsList());
          const currentUserPresentations = presentations?.filter(
            (pres) => pres?.userId === user?._id
          );

          const weeklyPresentations = getWeeklyPresentations(
            formattedStartDate,
            formattedEndDate,
            currentUserPresentations
          );
          const weeklyObjects = getWeeklyObjects(
            formattedStartDate,
            formattedEndDate,
            currentUserObjects
          );
          const weeklyObjectsWithPhone = getWeeklyObjectsWithPhone(
            formattedStartDate,
            formattedEndDate,
            currentUserObjects
          );

          return (
            <TableCell
              objects={weeklyObjects}
              objectsWithPhone={weeklyObjectsWithPhone}
              presentations={weeklyPresentations}
            />
          );
        },
      },
      {
        // 3 неделя
        accessorFn: (row) => row,
        header: (() => {
          return useTableHeader(2);
        })(),
        enableSorting: false,
        size: 30,
        cell: (info) => {
          const currentDate = dayjs();

          const endOPreviousWeek = currentDate
            .subtract(2, "week")
            .endOf("week");
          const startOPreviousWeek = endOPreviousWeek.subtract(6, "day");

          const formattedStartDate = startOPreviousWeek.format("YYYY-MM-DD");
          const formattedEndDate = endOPreviousWeek.format("YYYY-MM-DD");

          const user = info.getValue();
          const objects = useSelector(getObjectsList());
          const currentUserObjects = objects?.filter(
            (obj) => obj?.userId === user?._id
          );

          const presentations = useSelector(getPresentationsList());
          const currentUserPresentations = presentations?.filter(
            (pres) => pres?.userId === user?._id
          );

          const weeklyPresentations = getWeeklyPresentations(
            formattedStartDate,
            formattedEndDate,
            currentUserPresentations
          );
          const weeklyObjects = getWeeklyObjects(
            formattedStartDate,
            formattedEndDate,
            currentUserObjects
          );
          const weeklyObjectsWithPhone = getWeeklyObjectsWithPhone(
            formattedStartDate,
            formattedEndDate,
            currentUserObjects
          );

          return (
            <TableCell
              objects={weeklyObjects}
              objectsWithPhone={weeklyObjectsWithPhone}
              presentations={weeklyPresentations}
            />
          );
        },
      },
      {
        // 4 неделя
        accessorFn: (row) => row,
        header: (() => {
          return useTableHeader(3);
        })(),
        enableSorting: false,
        size: 30,
        cell: (info) => {
          const user = info.getValue();
          const currentDate = dayjs();
          const endOPreviousWeek = currentDate
            .subtract(3, "week")
            .endOf("week");
          const startOPreviousWeek = endOPreviousWeek.subtract(6, "day");

          const formattedStartDate = startOPreviousWeek.format("YYYY-MM-DD");
          const formattedEndDate = endOPreviousWeek.format("YYYY-MM-DD");
          const objects = useSelector(getObjectsList());

          const currentUserObjects = objects?.filter(
            (obj) => obj?.userId === user?._id
          );

          const presentations = useSelector(getPresentationsList());
          const currentUserPresentations = presentations?.filter(
            (pres) => pres?.userId === user?._id
          );

          const weeklyPresentations = getWeeklyPresentations(
            formattedStartDate,
            formattedEndDate,
            currentUserPresentations
          );
          const weeklyObjects = getWeeklyObjects(
            formattedStartDate,
            formattedEndDate,
            currentUserObjects
          );
          const weeklyObjectsWithPhone = getWeeklyObjectsWithPhone(
            formattedStartDate,
            formattedEndDate,
            currentUserObjects
          );

          return (
            <TableCell
              objects={weeklyObjects}
              objectsWithPhone={weeklyObjectsWithPhone}
              presentations={weeklyPresentations}
            />
          );
        },
      },
    ],
  },
  {
    header: "ПОСЛЕДНИЕ 6 МЕСЯЦЕВ",
    columns: generateMonthHeaders(),
  },
];
