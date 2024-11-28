export const MONTH_DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
export const MONTHS = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
export const DAYS = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'];
export const DAYS_SHORT = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
export const EVENT_COLORS = ['bg-[#93fa9a]', 'bg-[#ff8a90]', 'bg-[#8c98ff]', 'bg-[#fd99ff]']
export const EVENT_BORDER_COLORS = ['border-[#05a10f]', 'border-[#e6000c]', 'border-[#0017db]', 'border-[#bc00bf]']
export const SUBJECTS_COLORS_11: Record<string, string> = {
  'Álgebra Lineal': 'text-red-600',
  'Análisis Matemático I': 'text-indigo-500',
  'Física I': 'text-emerald-600',
  'Programación Científica': 'text-gray-700'
}
export const SUBJECTS_BORDER_COLORS_11: Record<string, string> = {
  'Álgebra Lineal': 'border-red-400',
  'Análisis Matemático I': 'border-indigo-400',
  'Física I': 'border-emerald-400',
  'Programación Científica': 'border-gray-400'
}
export const SUBJECTS_BG_COLORS_11: Record<string, string> = {
  'Álgebra Lineal': 'bg-red-50',
  'Análisis Matemático I': 'bg-indigo-50',
  'Física I': 'bg-emerald-50',
  'Programación Científica': 'bg-gray-100'
}
export const SUBJECTS_COLORS_12: Record<string, string> = {
  'Análisis Matemático II': 'text-indigo-500',
  'Ecuaciones Diferenciales I': 'text-fuchsia-600',
  'Física II': 'text-emerald-600',
  'Geometría': 'text-red-600'
}
export const SUBJECTS_BORDER_COLORS_12: Record<string, string> = {
  'Análisis Matemático II': 'border-indigo-400',
  'Ecuaciones Diferenciales I': 'border-fuchsia-400',
  'Física II': 'border-emerald-400',
  'Geometría': 'border-red-400'
}
export const SUBJECTS_BG_COLORS_12: Record<string, string> = {
  'Análisis Matemático II': 'bg-indigo-50',
  'Ecuaciones Diferenciales I': 'bg-fuchsia-50',
  'Física II': 'bg-emerald-50',
  'Geometría': 'bg-red-50'
}

export const SUBJECTS_COLORS_21: Record<string, string> = {
  'Combinatoria y Probabilidad': 'text-[#1d2ba8]',
  'Computación algebraica': 'text-[#05850e]',
  'Electromagnetismo': 'text-[#7d7a04]',
  'Ecuaciones Diferenciales II': 'text-[#961299]',
  'Mecánica Clásica': 'text-[#910f2d]'
}

export const SUBJECTS_BORDER_COLORS_21: Record<string, string> = {
  'Combinatoria y Probabilidad': 'border-[#1525ad]',
  'Computación algebraica': 'border-[#34c73e]',
  'Electromagnetismo': 'border-[#d6d32f]',
  'Ecuaciones Diferenciales II': 'border-[#c131c4]',
  'Mecánica Clásica': 'border-[#c72c50]'
}

export const SUBJECTS_BG_COLORS_21: Record<string, string> = {
  'Combinatoria y Probabilidad': 'bg-[#cacffc]',
  'Computación algebraica': 'bg-[#ccffcf]',
  'Electromagnetismo': 'bg-[#fcfcc7]',
  'Ecuaciones Diferenciales II': 'bg-[#fbc7fc]',
  'Mecánica Clásica': 'bg-[#fccad6]'
}

export const SUBJECTS_COLORS_31: Record<string, string> = {
  'Mecánica Estatística': 'text-[#1d2ba8]',
  'Análisis Complejo': 'text-[#05850e]',
  'Física de Fluidos': 'text-[#7d7a04]',
  'Física del Estado Sólido y Superfícies': 'text-[#961299]',
  'Biofísica': 'text-[#910f2d]'
}

export const SUBJECTS_BORDER_COLORS_31: Record<string, string> = {
  'Mecánica Estatística': 'border-[#1525ad]',
  'Análisis Complejo': 'border-[#34c73e]',
  'Física de Fluidos': 'border-[#d6d32f]',  
  'Física del Estado Sólido y Superfícies': 'border-[#c131c4]',
  'Biofísica': 'border-[#c72c50]'
}

export const SUBJECTS_BG_COLORS_31: Record<string, string> = {
  'Mecánica Estatística': 'bg-[#cacffc]',
  'Análisis Complejo': 'bg-[#ccffcf]',
  'Física de Fluidos': 'bg-[#fcfcc7]',
  'Física del Estado Sólido y Superfícies': 'bg-[#fbc7fc]',
  'Biofísica': 'bg-[#fccad6]'
}



export const SUBJECTS_COLORS_1 = {
  ...SUBJECTS_COLORS_11,
  ...SUBJECTS_COLORS_12,
  ...SUBJECTS_COLORS_21,
  ...SUBJECTS_COLORS_31
}
export const SUBJECT_BORDER_COLORS = {
  ...SUBJECTS_BORDER_COLORS_11,
  ...SUBJECTS_BORDER_COLORS_12,
  ...SUBJECTS_BORDER_COLORS_21,
  ...SUBJECTS_BORDER_COLORS_31
}
export const SUBJECT_BG_COLORS = {
  ...SUBJECTS_BG_COLORS_11,
  ...SUBJECTS_BG_COLORS_12,
  ...SUBJECTS_BG_COLORS_21,
  ...SUBJECTS_BG_COLORS_31
}

const SUBJECTS_11: string[] = [
  'Álgebra Lineal',
  'Análisis Matemático I',
  'Física I',
  'Programación Científica'
]

const SUBJECTS_12: string[] = [
  'Análisis Matemático II',
  'Ecuaciones Diferenciales I',
  'Física II',
  'Geometría'
]

const SUBJECTS_21: string[] = [
  'Combinatoria y Probabilidad',
  'Computación algebraica',
  'Electromagnetismo',
  'Ecuaciones Diferenciales II',
  'Mecánica Clásica'
]

const SUBJECTS_31: string[] = [
  'Mecanica Estatística',
  'Analisis Complejo',
  'Fisica de Fluidos',
  'Fisica del Estado Solución y Superficies',
  'Biofisica'
]


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
  isToday?: boolean
}

export function getCalendarDates(year: number, month: number): CalendarDate[] {
  const dates: CalendarDate[] = [];
  const daysInCurrentMonth = getDaysInMonth(year, month);
  const today = new Date();

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
      isToday: compareDates(today, new Date(previousMonthYear, previousMonth - 1, daysInPreviousMonth - i + 1)),
    });
  }

  // Add all days of the current month
  for (let i = 1; i <= daysInCurrentMonth; i++) {
    dates.push({
      date: new Date(year, month - 1, i),
      isCurrentMonth: true,
      isToday: compareDates(today, new Date(year, month - 1, i)),
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
      isToday: compareDates(today, new Date(year, month, i)),
    });
  }

  return dates;
}


export const compareDates = (a: Date, b: Date) => {
  const condition = a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
  return condition;
};

export const dateToString = (date: string) => {
  const dateObj = new Date(date);
  const year = dateObj.getFullYear();
  const month = dateObj.getMonth();
  const monthDay = dateObj.getDate();
  const day = (dateObj.getDay() + 6) % 7;
  return `${DAYS_SHORT[day]}, ${monthDay} de ${MONTHS[month]} de ${year}`;
}