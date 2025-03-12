import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, format } from "date-fns";

/*get all of the days of certain month*/
export const getMonthDays = (year, month) => {
    const start = startOfWeek(startOfMonth(new Date(year, month)));
    const end = endOfWeek(endOfMonth(new Date(year, month)));

    return eachDayOfInterval({start, end});
};

/*format the date */
export const formatDate = (date, dateFormat = "yyyy-MM-dd") => {
    return format(date, dateFormat);
};