'use client';

import CalendarEvents from "./calendar-events";
import CalendarHeader from "@/app/ui/calendar-header2";
import { compareDates } from "../lib/utils";
import { DateContext, DateProvider } from "../lib/date-context";
import AddEventButton from "./add-event-button2";
import { useContext, useState } from "react";
import CalendarClient from "./calendar-client2";
import { useEvents } from "../lib/use-events";
import { useSubjects } from "../lib/use-subjects";
import Dashboard from "./dashboard";

export default function Calendar() {
  const { year, month } = useContext(DateContext);
  const { events } = useEvents();
  const { subjects } = useSubjects();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  const eventsInDate = selectedDate
    ? events?.filter((event) => compareDates(new Date(event.date), selectedDate))
    : [];

  return (
    <DateProvider>
      <section className="flex flex-col h-full w-full bg-stone-50">
        {/* Background decorations */}
        <div className="absolute top-0 left-0 w-screen h-screen">
          <div className="bg-sky-400 w-full sm:w-40 h-40 rounded-full opacity-30 max-sm:ml-auto sm:ml-56"></div>
          <div className="bg-emerald-500 w-full sm:w-40 h-24 opacity-30"></div>
          <div className="bg-purple-600 w-full sm:w-40 h-24 opacity-30"></div>
          <div className="absolute  inset-0 backdrop-blur-3xl"></div>
        </div>

        {/* Main content area */}
        <div className="grow z-50 shrink max-h-full flex flex-col lg:max-h-screen w-full max-w-7xl mx-auto px-2 lg:px-8">
            <div className="flex flex-col gap-12 mt-[70px] mb-[20px] lg:gap-0 pt-8 h-full lg:pt-0 lg:flex-row">
              {/* Upcoming Events */}
              <Dashboard eventsInDate={eventsInDate} subjects={subjects} />

              {/* Calendar */}
              <div className="flex h-full flex-col px-2.5 grow-[3] bg-gradient-to-b from-white/25 to-white xl:bg-white rounded-2xl">
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-5">
                  <CalendarHeader />
                  <AddEventButton />
                </div>
                <div className="border flex lg:mb-0 mb-8 flex-col grow border-indigo-200 rounded-xl">
                  <div className="grid grid-cols-7 rounded-t-3xl border-b border-indigo-200">
                    {["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"].map((day) => (
                      <div
                        key={day}
                        className="py-3.5 border-r last:border-r-0 rounded-tl-xl border-indigo-200 bg-indigo-50 flex items-center justify-center text-sm font-medium text-indigo-600"
                      >
                        {day}
                      </div>
                    ))}
                  </div>
                  <CalendarClient
                    subjects={subjects}
                    events={events}
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}
                  />
                </div>
              </div>
            </div>
        </div>
      </section>
    </DateProvider>
  );
}
