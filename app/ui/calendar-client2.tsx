import { useContext } from "react";
import { compareDates, getCalendarDates } from "../lib/utils";
import { DateContext } from "../lib/date-context";
import { Subject, Event } from "../lib/definitions";
import SubjectTag from "./subject-tag2";

export default function CalendarClient({
  subjects,
  events,
  selectedDate,
  setSelectedDate,
}: {
  subjects: Subject[] | undefined;
  events: Event[] | undefined;
  selectedDate: Date | undefined;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
}) {
  const { year, month } = useContext(DateContext);

  if (!subjects) {
    return null;
  }

  return (
    <div
      className="grid grid-cols-7 gap-[1px] shrink rounded-b-xl w-full grow bg-indigo-200 overflow-hidden"
      style={{
        gridTemplateRows: "repeat(6, minmax(1fr, 16.6%))",
        gridAutoRows: "16.6%",
      }}
    >
      {getCalendarDates(year, month).map((item, index) => {
        const eventsInDate =
          events?.filter((event) =>
            compareDates(new Date(event.date), item.date)
          ) ?? [];

        return (
          <div
            key={index}
            onClick={() => setSelectedDate(item.date)}
            className={`${
              selectedDate && compareDates(item.date, selectedDate)
                ? "bg-indigo-50"
                : "hover:bg-indigo-50 bg-white"
            } ${
              item.isCurrentMonth ? "" : "opacity-80 bg-gray-100"
            } flex flex-col overflow-hidden p-[2px] border border-indigo-200 transition-all duration-300 cursor-pointer`}
          >
            {/* Date */}
            <span
              className={`text-gray-400 ${
                item.isToday
                  ? "text-indigo-600 sm:text-white sm:w-6 sm:h-6 rounded-full sm:flex items-center justify-center sm:bg-indigo-600"
                  : ""
              } text-xs font-semibold`}
            >
              {item.date.getDate()}
            </span>

            {/* Events */}
            <div className="flex flex-col gap-[1px] overflow-scroll scrollbar-hidden ">
              {eventsInDate.length > 0 &&
                eventsInDate.map((event) => {
                  const subject = subjects.find(
                    (subject) => subject.id === event.subjectid
                  );
                  return (
                    <div
                      key={event.id}
                      style={{
                        backgroundColor: subject?.bgcolor,
                        borderColor: subject?.bordercolor,
                        color: subject?.color
                      }}
                      className={`cursor-pointer border grow text-[8px] min-h-[14px] truncate font-medium px-1.5 py-0`}
                      >
                        {event.name}
                    </div>
                  );
                })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
