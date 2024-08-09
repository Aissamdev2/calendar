import { Event } from "@/app/lib/definitions";
import { cookies } from "next/headers";
import CalendarClient from "@/app/ui/CalendarClient";
async function getEvents() {
  const response = await fetch('http://localhost:3000/api/events', {
    headers: {
      Cookie: cookies().toString()
    },
    next: { tags: ['calendar'] }
  });
  if (!response.ok) {
    throw new Error('Failed to fetch events');
  }
  const events: Event[] = await response.json();
  return events;
}

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
