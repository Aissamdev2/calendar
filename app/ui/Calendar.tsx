import { Event } from "@/app/lib/definitions";
import { cookies } from "next/headers";
import CalendarClient from "@/app/ui/CalendarClient";
import { getEvents } from "@/app/lib/actions";


export default async function Calendar() {
  const events = await getEvents();
  const [initialMonth, initialYear] = [1, 2022];

  return (
      <CalendarClient 
        initialEvents={events} 
        initialMonth={initialMonth} 
        initialYear={initialYear} 
      />
  );
}
