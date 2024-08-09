export const MONTH_DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
export const MONTHS = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
export const DAYS = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'];
export const DAYS_SHORT = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
export const EVENT_COLORS = ['bg-[#95dc5c]', 'bg-[#FC7771]']
export const EVENT_BORDER_COLORS = ['border-[#00FF0E]', 'border-[#FF0B00]']

export function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

export function getDaysInMonth(year: number, month: number): number {
  if (month === 2 && isLeapYear(year)) {
    return 29;
  }
  return MONTH_DAYS[month - 1];
}

type CalendarDate = {
  date: Date,
  isCurrentMonth?: boolean
}

export function getCalendarDates(year: number, month: number): CalendarDate[] {
  const dates: CalendarDate[] = [];
  const daysInCurrentMonth = getDaysInMonth(year, month);

  // Calculate the first day of the month (0: Monday, 1: Tuesday, ..., 6: Sunday)
  let firstDayOfMonth = new Date(year, month - 1, 1).getDay();
  firstDayOfMonth = (firstDayOfMonth === 0) ? 6 : firstDayOfMonth - 1;

  // Determine the number of days in the previous month
  const previousMonth = month - 1 < 1 ? 12 : month - 1;
  const previousMonthYear = month - 1 < 1 ? year - 1 : year;
  const daysInPreviousMonth = getDaysInMonth(previousMonthYear, previousMonth);

  // Add days from the previous month to fill the calendar until the first day of the current month
  for (let i = firstDayOfMonth; i > 0; i--) {
    dates.push({
      date: new Date(previousMonthYear, previousMonth - 1, daysInPreviousMonth - i + 1),
      isCurrentMonth: false,
    });
  }

  // Add all days of the current month
  for (let i = 1; i <= daysInCurrentMonth; i++) {
    dates.push({
      date: new Date(year, month - 1, i),
      isCurrentMonth: true,
    });
  }

  // Calculate the total number of weeks to display (should be 6 to cover all cases)
  const totalWeeks = 6;
  const daysInCalendar = totalWeeks * 7;
  const daysToAdd = daysInCalendar - dates.length;

  // Add days from the next month to complete the weeks
  for (let i = 1; i <= daysToAdd; i++) {
    dates.push({
      date: new Date(year, month, i),
      isCurrentMonth: false,
    });
  }

  return dates;
}
