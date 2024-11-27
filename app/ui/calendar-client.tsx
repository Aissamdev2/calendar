'use client';

import {  useContext } from 'react';
import { getCalendarDates, compareDates, SUBJECTS_COLORS_1, SUBJECT_BG_COLORS, SUBJECT_BORDER_COLORS } from '@/app/lib/utils';
import { Event } from '../lib/definitions';
import { DateContext } from '../lib/date-context';
import Link from 'next/link';
import { useEvents } from '../lib/use-events';
import CalendarSkeleton from './calendar-skeleton';
import { SWRProvider } from '../lib/swr-provider';

type Props = {
  events: Event[];
};

export default function CalendarClient() {
  const { month, year } = useContext(DateContext);
  const { events, error, isLoading } = useEvents()
  
  console.log('Is loading: ', isLoading)
  if (isLoading) {
    return (
      <CalendarSkeleton />
    )
  }


  return (
    <SWRProvider>
      {
        getCalendarDates(year, month).map((item) => {
          const eventsInDate = events?.filter((event) => {
            return compareDates(new Date(event.date), item.date);
          })
          return (
            <div key={item.date.toDateString() } className={`group overflow-hidden flex transition-[border-color] duration-300 bg-[#ffffff] border-[1px] border-[#a19aff6b] hover:border-[#5551FF] ${item.isCurrentMonth ? '' : 'opacity-40 bg-[#d9d7d7]'}`}>
              <div className='flex flex-col justify-start items-center w-[30px]'>
                <div className={`group-hover:text-[#5551FF] transition-[background-color,border-color] duration-300 w-[30px] text-center border-r border-b py-[1px] rounded-br-[10px] border-[#a19affb1] hover:border-[#5551FF] basis-4 ${item.date.getDay() === 0 || item.date.getDay() === 6 ? 'text-red-500' : ''}`}>{item.date.getDate()}</div>
              </div>
              <div className={`flex-grow-[1] h-[90%] p-2 self-center grid grid-rows-3 grid-cols-2 grid-flow-col gap-y-[1px] gap-x-1 top-0 left-0`}>
              {
                eventsInDate?.map((event, index) => (
                  <Link key={event.id} href={`/gemif/calendar/view-event/${event.id}`} className={`font-bold m-0 h-fit hover:cursor-pointer text-[10px] py-[0px] px-[4px] truncate rounded border-[1px] ${SUBJECT_BORDER_COLORS[event.subject ?? '']} ${SUBJECT_BG_COLORS[event.subject ?? '']} ${SUBJECTS_COLORS_1[event.subject ?? '']} `}>{event.name}</Link>
                ))
              }
              </div>
            </div>
          );
        })
      }
    </SWRProvider>
  );
}


