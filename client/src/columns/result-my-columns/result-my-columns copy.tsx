import dayjs from "dayjs";
import "dayjs/locale/ru";
import "dayjs/locale/ru";
import { useSelector } from "react-redux";
import customParseFormat from "dayjs/plugin/customParseFormat";
import TableCell from "./components/table-cell";
import { getObjectsList } from "../../store/object/objects.store";
import { GetWeeklyObjects } from "../../utils/objects/get-weekly-objects";
import { GetWeeklyObjectsWithPhone } from "../../utils/objects/get-weekly-objects-with-phone";

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
    header: dayjs().locale("ru").format("MMMM").toUpperCase(), // Заголовок текущего месяца
    columns: [
      {
        accessorFn: (row) => row,
        header: (() => {
          const currentDate = dayjs();
          const startOfNextWeek = currentDate.add(1, "week").startOf("week");
          const endOfNextWeek = startOfNextWeek.add(6, "day");

          const formattedStartDate = startOfNextWeek.format("DD.MM");
          const formattedEndDate = endOfNextWeek.format("DD.MM");

          const dateRange = `${formattedStartDate} - ${formattedEndDate}`;
          return dateRange;
        })(),
        enableSorting: false,
        size: 30,
        cell: () => {
          const currentDate = dayjs();
          const startOfNextWeek = currentDate.add(1, "week").startOf("week");
          const endOfNextWeek = startOfNextWeek.add(6, "day");

          const formattedStartDate = startOfNextWeek.format("YYYY-MM-DD");
          const formattedEndDate = endOfNextWeek.format("YYYY-MM-DD");

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
        accessorFn: (row) => row,
        header: (() => {
          const currentDate = dayjs();
          const startOfNextWeek = currentDate.add(2, "week").startOf("week");
          const endOfNextWeek = startOfNextWeek.add(6, "day");

          const formattedStartDate = startOfNextWeek.format("DD.MM");
          const formattedEndDate = endOfNextWeek.format("DD.MM");

          const dateRange = `${formattedStartDate} - ${formattedEndDate}`;
          return dateRange;
        })(),
        enableSorting: false,
        size: 30,
        cell: () => {
          const currentDate = dayjs();

          const startOfNextWeek = currentDate.add(3, "week").startOf("week");
          const endOfNextWeek = startOfNextWeek.add(6, "day");

          const formattedStartDate = startOfNextWeek.format("YYYY-MM-DD");
          const formattedEndDate = endOfNextWeek.format("YYYY-MM-DD");

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
          const currentDate = dayjs();

          const endOfPreviousWeek = currentDate
            .subtract(1, "week")
            .endOf("week");
          const startOfPreviousWeek = endOfPreviousWeek.subtract(6, "day");

          const formattedStartDate = startOfPreviousWeek.format("DD.MM");
          const formattedEndDate = endOfPreviousWeek.format("DD.MM");

          const dateRange = `${formattedStartDate} - ${formattedEndDate}`;
          return dateRange;
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
