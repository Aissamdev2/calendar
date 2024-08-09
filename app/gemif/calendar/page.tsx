import Calendar from "@/app/ui/Calendar";
import CalendarSkeleton from "@/app/ui/calendar-skeleton";
import { Suspense } from "react";


export default function CalendarPage() {
  return (
    <Suspense fallback={<CalendarSkeleton />}>
      <Calendar />
    </Suspense>
  )
}