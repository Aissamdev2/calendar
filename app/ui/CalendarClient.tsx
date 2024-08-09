'use client'; // This directive tells Next.js that this component is a client component.

import { useState } from 'react';
import { getCalendarDates, MONTHS, DAYS_SHORT, EVENT_COLORS, EVENT_BORDER_COLORS } from '@/app/lib/utils';
import { Event } from '../lib/definitions';
import AddEventForm from './add-event-form';

type Props = {
  initialEvents: Event[];
  initialMonth: number;
  initialYear: number;
};


export default function CalendarClient({ initialEvents, initialMonth, initialYear }: Props) {
  const [month, setMonth] = useState(initialMonth);
  const [year, setYear] = useState(initialYear);
  const [addEventFormVisible, setAddEventFormVisible] = useState(false);

  const handleMonthIncrement = () => {
    if (month === 12) {
      setMonth(1);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  };

  const handleMonthDecrement = () => {
    if (month === 1) {
      setMonth(12);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  };

  return (
    <main className="flex justify-center items-end h-[calc(100vh-80px)] w-screen bg-[#e8e8e8] p-5 absolute bottom-0 left-0">
      {
        addEventFormVisible && <AddEventForm setAddEventFormVisible={setAddEventFormVisible} />
      }
      <div className="bg-white w-full h-full rounded-xl flex flex-col">
        <div className="flex justify-between items-center flex-grow-[1] text-xl">
          <div className='flex items-center gap-8 ml-[655px] flex-grow-[1]'>
            <span className="hover:cursor-pointer" onClick={handleMonthDecrement}>{'<'}</span>
            <span className="hover:cursor-pointer w-[100px] text-center">{MONTHS[month - 1]}</span>
            <span className="hover:cursor-pointer" onClick={handleMonthIncrement}>{'>'}</span>
          </div>
          <button onClick={() => setAddEventFormVisible(true)} className='mr-[50px] text-[15px] px-5 border-[1px] rounded-[5px] hover:border-gray-200 border-transparent active:bg-gray-100'>
            Crear nuevo evento
          </button>
        </div>
        <div className="grid grid-cols-7 flex-grow-[1] gap-1 p-2 border-b-[1px] border-gray-200">
          {DAYS_SHORT.map((item) => (
            <div key={item} className="flex flex-col justify-center items-center">
              <span>{item}</span>
            </div>
          ))}
        </div>
        <div className="bg-white rounded-b-xl flex-grow-[11] grid grid-cols-7 gap-1 p-2" >
          {
          getCalendarDates(year, month).map((item) => {
            const eventsInDate = initialEvents.filter((event) => {
              const eventDate = new Date(event.date);
              return eventDate.getFullYear() === item.date.getFullYear() && eventDate.getMonth() === item.date.getMonth() && eventDate.getDate() === item.date.getDate();
            })
            return (
              <div key={item.date.toDateString() } className={`relative flex flex-col items-center border-[1px] justify-center ${item.isCurrentMonth ? '' : 'opacity-40'}`}>
                <span>{item.date.getDate()}</span>
                <div className='absolute top-0 left-0 grid grid-rows-3 grid-cols-2 grid-flow-col gap-y-1 gap-x-1 p-2'>
                  {
                    eventsInDate.map((event, index) => (
                      <div key={event.id + 'dot'} className={`w-[15px] h-[15px] ${EVENT_COLORS[index % EVENT_COLORS.length]} ${EVENT_BORDER_COLORS[index % EVENT_BORDER_COLORS.length]} border-[1px] rounded-[50%]`}>

                      </div>
                    ))
                  }
                </div>
                <div className={`absolute h-full w-full grid grid-rows-3 grid-cols-2 grid-flow-col gap-y-1 gap-x-1 top-0 left-0 ${item.isCurrentMonth ? 'opacity-0 hover:opacity-100 transition-opacity backdrop-blur-[3px] duration-500' : ''} p-2`}>
                {
                  eventsInDate.map((event, index) => (
                    <span key={event.id} className={`m-0 hover:cursor-pointer text-[10px] py-[0px] px-[4px] rounded-full border-[1px] ${EVENT_COLORS[index % EVENT_COLORS.length]} ${EVENT_BORDER_COLORS[index % EVENT_BORDER_COLORS.length]}`}>{event.name}</span>
                  ))
                }
                </div>
              </div>
            );
          })
          }
        </div>
      </div>
    </main>
  );
}
