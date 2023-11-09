import "dayjs/locale/ru";
import "dayjs/locale/ru";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import customParseFormat from "dayjs/plugin/customParseFormat";
// components
import TableCell from "./components/table-cell";
import { useTableHeader } from "./hooks/use-table-header";
// utils
import { getWeeklyObjects } from "../../utils/objects/get-weekly-objects";
import { getWeeklyPresentations } from "../../utils/presentations/get-weekly-presentations";
import { getWeeklyObjectsWithPhone } from "../../utils/objects/get-weekly-objects-with-phone";
// store
import { getObjectsList } from "../../store/object/objects.store";
import { getPresentationsList } from "../../store/presentation/presentations.store";

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
      cell: () => {
        const objects = useSelector(getObjectsList());
        const presentations = useSelector(getPresentationsList());

        const currentMonthObjects = objects.filter((object) => {
          return dayjs(object.created_at).month() === month.month();
        });
        const objectQuantity = currentMonthObjects;

        const currentMonthPresentations = presentations?.filter(
          (presentation) => {
            return dayjs(presentation.created_at).month() === month.month();
          }
        );
        const presentationsQuantity = currentMonthPresentations;

        const objectsWithPhone = currentMonthObjects?.filter((obj) => {
          const phoneNumber = obj?.contact?.phone;
          return phoneNumber !== null && String(phoneNumber)?.length > 0;
        });
        const objectsWithPhoneQuantity = objectsWithPhone;

        return (
          <TableCell
            objects={objectQuantity}
            objectsWithPhone={objectsWithPhoneQuantity}
            presentations={presentationsQuantity}
          />
        );
      },
    });
  }

  return monthHeaders;
};

export const staticticsColumns = [
  {
    header: "Мои результаты",
    columns: [
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
          const objects = useSelector(getObjectsList());
          const presentations = useSelector(getPresentationsList());

          const currentMonthObjects = objects?.filter((object) => {
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

          const currentMonthPresentations = presentations?.filter(
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
        // 4 неделя
        accessorFn: (row) => row,
        header: (() => {
          return useTableHeader(3);
        })(),
        enableSorting: false,
        size: 30,
        cell: () => {
          const currentDate = dayjs();
          const endOPreviousWeek = currentDate
            .subtract(3, "week")
            .endOf("week");
          const startOPreviousWeek = endOPreviousWeek.subtract(6, "day");

          const formattedStartDate = startOPreviousWeek.format("YYYY-MM-DD");
          const formattedEndDate = endOPreviousWeek.format("YYYY-MM-DD");

          const weeklyPresentations = getWeeklyPresentations(
            formattedStartDate,
            formattedEndDate
          );
          const weeklyObjects = getWeeklyObjects(
            formattedStartDate,
            formattedEndDate
          );
          const weeklyObjectsWithPhone = getWeeklyObjectsWithPhone(
            formattedStartDate,
            formattedEndDate
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
        cell: () => {
          const currentDate = dayjs();

          const endOPreviousWeek = currentDate
            .subtract(2, "week")
            .endOf("week");
          const startOPreviousWeek = endOPreviousWeek.subtract(6, "day");

          const formattedStartDate = startOPreviousWeek.format("YYYY-MM-DD");
          const formattedEndDate = endOPreviousWeek.format("YYYY-MM-DD");

          const weeklyPresentations = getWeeklyPresentations(
            formattedStartDate,
            formattedEndDate
          );
          const weeklyObjects = getWeeklyObjects(
            formattedStartDate,
            formattedEndDate
          );
          const weeklyObjectsWithPhone = getWeeklyObjectsWithPhone(
            formattedStartDate,
            formattedEndDate
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
        cell: () => {
          const currentDate = dayjs();

          const endOPreviousWeek = currentDate
            .subtract(1, "week")
            .endOf("week");
          const startOPreviousWeek = endOPreviousWeek.subtract(6, "day");

          const formattedStartDate = startOPreviousWeek.format("YYYY-MM-DD");
          const formattedEndDate = endOPreviousWeek.format("YYYY-MM-DD");

          const weeklyPresentations = getWeeklyPresentations(
            formattedStartDate,
            formattedEndDate
          );
          const weeklyObjects = getWeeklyObjects(
            formattedStartDate,
            formattedEndDate
          );
          const weeklyObjectsWithPhone = getWeeklyObjectsWithPhone(
            formattedStartDate,
            formattedEndDate
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
        // текущая неделя
        accessorFn: (row) => row,
        header: (() => {
          const currentDate = dayjs();
          const startOfWeek = currentDate.startOf("week");
          const endOfWeek = currentDate.endOf("week").day(0);
          const formattedDate = `${startOfWeek.format(
            "DD.MM"
          )} - ${endOfWeek.format("DD.MM")}`;

          return formattedDate
        })(),
        enableSorting: false,
        size: 30,
        cell: () => {
          const currentDate = dayjs();
          const startOfWeek = currentDate.startOf("week");
          const endOfWeek = currentDate.endOf("week").day(0);

          const weeklyPresentations = getWeeklyPresentations(
            startOfWeek,
            endOfWeek
          );
          const weeklyObjects = getWeeklyObjects(startOfWeek, endOfWeek);
          const weeklyObjectsWithPhone = getWeeklyObjectsWithPhone(
            startOfWeek,
            endOfWeek
          );

          return (
            <TableCell
              objects={weeklyObjects}
              objectsWithPhone={weeklyObjectsWithPhone}
              presentations={weeklyPresentations}
              isLastWeek={true}
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
