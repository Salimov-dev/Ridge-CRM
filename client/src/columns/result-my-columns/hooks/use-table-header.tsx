import dayjs from "dayjs";

export const useTableHeader = (weekAgo) => {
    const currentDate = dayjs();

    const endOfPreviousWeek = currentDate.subtract(weekAgo, "week").endOf("week");
    const startOfPreviousWeek = endOfPreviousWeek.subtract(6, "day");

    const formattedStartDate = startOfPreviousWeek.format("DD.MM");
    const formattedEndDate = endOfPreviousWeek.format("DD.MM");

    const dateRange = `${formattedStartDate} - ${formattedEndDate}`;
    return dateRange;
}
 
export default useTableHeader;