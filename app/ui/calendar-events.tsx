import { getEvents } from "@/app/lib/actions"
import CalendarClient from "./calendar-client"

export default async function CalendarEvents() {
  const events = await getEvents()

  return (
    <CalendarClient />
  )
}