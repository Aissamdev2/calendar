'use client';

import {  useContext } from 'react';
import { getCalendarDates, compareDates, SUBJECTS_COLORS_1, SUBJECT_BG_COLORS, SUBJECT_BORDER_COLORS } from '@/app/lib/utils';
import { Event } from '../lib/definitions';
import { DateContext } from '../lib/date-context';
import Link from 'next/link';
import { useEvents } from '../lib/use-events';
import CalendarSkeleton from './calendar-skeleton';


type Props = {
  events: Event[];
};

export default function CalendarClient() {
  const { date, month, year } = useContext(DateContext);
  const { events, error, isLoading } = useEvents()
  
  console.log('Is loading: ', isLoading)
  if (isLoading) {
    return (
      <CalendarSkeleton />
    )
  }

  return (
    <>
      {
        getCalendarDates(year, month).map((item) => {
          const eventsInDate = events?.filter((event) => {
            return compareDates(new Date(event.date), item.date);
          }) ?? [];
          return (
            <div key={item.date.toDateString() } className={`group overflow-hidden max-h-[87px] flex transition-[border-color] duration-300 bg-[#ffffff] border-[1px] border-[#a19aff6b] hover:border-[#5551FF] ${item.isCurrentMonth ? '' : 'opacity-60 bg-[#dedede]'} ${item.isToday ? 'border-[2px]' : ''}`}>
              <div className='flex flex-col justify-between items-center w-[30px]'>
                <div className={`transition-[background-color,border-color,text] duration-300 w-[30px] text-center border-r border-b py-[1px] rounded-br-[10px] border-[#a19affb1] hover:border-[#5551FF] basis-4 ${item.date.getDay() === 0 || item.date.getDay() === 6 ? 'text-red-500' : ''} ${item.isToday ? 'bg-[#b3b3ff] group-hover:text-[#ffffff]' : 'group-hover:text-[#5551FF]'}`}>{item.date.getDate()}</div>
                {
                  eventsInDate?.length > 4 && (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 mb-1 animate-bounce">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5" />
                    </svg> 
                  )
                }
              </div>
              <div className={`flex-grow-[1] h-full overflow-auto scrollbar-hidden p-2 self-center flex flex-col gap-y-[1px] gap-x-1 top-0 left-0`}>
              {
                eventsInDate?.map((event, index) => (
                  <Link key={event.id} href={`/gemif/calendar/view-event/${event.id}`} className={`min-h-[16.6px] font-bold m-0 h-fit hover:cursor-pointer text-[10px] py-[0px] px-[4px] truncate rounded border-[1px] ${SUBJECT_BORDER_COLORS[event.subject ?? '']} ${SUBJECT_BG_COLORS[event.subject ?? '']} ${SUBJECTS_COLORS_1[event.subject ?? '']} `}>{event.name}</Link>
                ))
              }
              </div>
            </div>
          );
        })
      }
    </>
  );
}


