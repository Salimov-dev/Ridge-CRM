import dayjs from "dayjs";
import { AlignCenter } from "../../components/common/columns/styled";
import "dayjs/locale/ru";

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
      cell: (info) => {
        const object = info.getValue();
        return <AlignCenter>объекты</AlignCenter>;
      },
    });
  }

  return monthHeaders;
};

// Функция для создания заголовков недель текущего месяца
const generateWeekHeaders = () => {
  const currentMonth = dayjs();
  const currentMonthStart = currentMonth.startOf("month");
  const currentMonthEnd = currentMonth.endOf("month");
  const weekHeaders = [];

  let weekStart = currentMonthStart;
  while (weekStart.isBefore(currentMonthEnd)) {
    const weekEnd = weekStart.add(6, "days");
    const weekHeader = `${weekStart.locale("ru").format("DD.MM")}-${weekEnd.locale("ru").format("DD.MM")}`;
    weekHeaders.push({
      accessorFn: (row) => row,
      header: weekHeader,
      cell: (info) => {
        const object = info.getValue();
        return <AlignCenter>тут</AlignCenter>;
      },
    });
    weekStart = weekEnd.add(1, "day");
  }

  // Добавляем заголовок для последней недели текущего месяца
  const lastWeekStart = currentMonthEnd.subtract(6, "days");
  const lastWeekHeader = `${lastWeekStart.locale("ru").format("DD.MM")}-${currentMonthEnd.locale("ru").format("DD.MM")}`;
  weekHeaders.push({
    accessorFn: (row) => row,
    header: lastWeekHeader,
    cell: (info) => {
      const object = info.getValue();
      return <AlignCenter>ага</AlignCenter>;
    },
  });

  return weekHeaders;
};

export const resultMyColumns = [
  
  {
    header: "Последние 6 месяцев",
    columns: generateMonthHeaders(),
  },
  {
    header: dayjs().locale("ru").format("MMMM"), // Заголовок текущего месяца
    columns: generateWeekHeaders(), // Заголовки недель текущего месяца
  },
];
