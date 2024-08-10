import CalendarClient from "@/app/ui/CalendarClient";
import { getEvents } from "@/app/lib/actions";


export default async function Calendar() {
  const events = await getEvents();
  const [initialMonth, initialYear] = [new Date().getMonth() + 1, new Date().getFullYear()];

  return (
      <CalendarClient 
        initialEvents={events} 
        initialMonth={initialMonth} 
        initialYear={initialYear} 
      />
  );
}
