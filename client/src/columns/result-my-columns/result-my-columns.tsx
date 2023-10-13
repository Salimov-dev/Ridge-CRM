import dayjs from "dayjs";
import "dayjs/locale/ru";
import { useSelector } from "react-redux";
import customParseFormat from "dayjs/plugin/customParseFormat";
import "dayjs/locale/ru";
// components
import TableCell from "./components/table-cell";
import { useTableHeader } from "./hooks/use-table-header";
// utils
import { GetWeeklyObjects } from "../../utils/objects/get-weekly-objects";
import { GetWeeklyObjectsWithPhone } from "../../utils/objects/get-weekly-objects-with-phone";
// store
import { getObjectsList } from "../../store/object/objects.store";

dayjs.extend(customParseFormat);
dayjs.locale("ru");

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
        const objectQuantity = currentMonthObjects;

        const objectsWithPhone = currentMonthObjects?.filter((obj) => {
          const phoneNumber = obj?.contact?.phone;
          return phoneNumber !== null && String(phoneNumber)?.length > 0;
        });
        const objectsWithPhoneQuantity = objectsWithPhone;

        return (
          <TableCell
            objects={objectQuantity}
            objectsWithPhone={objectsWithPhoneQuantity}
          />
        );
      },
    });
  }

  return monthHeaders;
};

export const resultMyColumns = [
  {
    header: "ПОСЛЕДНИЕ 6 МЕСЯЦЕВ",
    columns: generateMonthHeaders(),
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

          const weeklyObjects = GetWeeklyObjects(
            formattedStartDate,
            formattedEndDate
          );
          const weeklyObjectsWithPhone = GetWeeklyObjectsWithPhone(
            formattedStartDate,
            formattedEndDate
          );

          return (
            <TableCell
              objects={weeklyObjects}
              objectsWithPhone={weeklyObjectsWithPhone}
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

          const weeklyObjects = GetWeeklyObjects(
            formattedStartDate,
            formattedEndDate
          );
          const weeklyObjectsWithPhone = GetWeeklyObjectsWithPhone(
            formattedStartDate,
            formattedEndDate
          );

          return (
            <TableCell
              objects={weeklyObjects}
              objectsWithPhone={weeklyObjectsWithPhone}
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

          const weeklyObjects = GetWeeklyObjects(
            formattedStartDate,
            formattedEndDate
          );
          const weeklyObjectsWithPhone = GetWeeklyObjectsWithPhone(
            formattedStartDate,
            formattedEndDate
          );

          return (
            <TableCell
              objects={weeklyObjects}
              objectsWithPhone={weeklyObjectsWithPhone}
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
          return formattedDate;
        })(),
        enableSorting: false,
        size: 30,
        cell: () => {
          const currentDate = dayjs();
          const startOfWeek = currentDate.startOf("week");
          const endOfWeek = currentDate.endOf("week").day(0);

          const weeklyObjects = GetWeeklyObjects(startOfWeek, endOfWeek);
          const weeklyObjectsWithPhone = GetWeeklyObjectsWithPhone(
            startOfWeek,
            endOfWeek
          );

          return (
            <TableCell
              objects={weeklyObjects}
              objectsWithPhone={weeklyObjectsWithPhone}
            />
          );
        },
      },
    ],
  },
];
