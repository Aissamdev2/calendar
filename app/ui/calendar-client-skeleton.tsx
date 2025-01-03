import { useContext } from "react";
import { compareDates, getCalendarDates } from "../lib/utils";
import { DateContext } from "../lib/date-context";
import { Subject, Event } from "../lib/definitions";
import SubjectTag from "./subject-tag2";

export default function CalendarClientSkeleton() {

  return (
    <div
      className="grid grid-cols-7 grid-rows-[repeat(6,minmax(1fr,16.6%))] auto-rows-[16.6%] gap-[1px] shrink rounded-b-xl w-full grow bg-indigo-200 overflow-hidden"
    >
      {Array(42).fill(0).map((_, i) => {
        return (
          <div
            key={i}
            className={`bg-[#e0e0e0] animate-pulse p-[2px] border border-indigo-200 cursor-pointer`}
          >
          </div>
        );
      })}
    </div>
  );
}
