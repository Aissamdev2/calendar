'use client'; // This directive tells Next.js that this component is a client component.

import { useState } from 'react';
import { getCalendarDates, MONTHS, DAYS_SHORT, EVENT_COLORS, EVENT_BORDER_COLORS } from '@/app/lib/utils';
import { Event } from '../lib/definitions';
import AddEventForm from './add-event-form';
import InfoModal from './info-modal';

type Props = {
  initialEvents: Event[];
  initialMonth: number;
  initialYear: number;
};


export default function CalendarClient({ initialEvents, initialMonth, initialYear }: Props) {
  const [month, setMonth] = useState(initialMonth);
  const [year, setYear] = useState(initialYear);
  const [addEventFormVisible, setAddEventFormVisible] = useState(false);
  const [info, setInfo] = useState({ active: false, id: '' });

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

  const handleShowInfo = (id: string) => {
    setInfo({ active: true, id });
  };

  return (
    <main className="flex justify-center items-end h-[calc(100vh-88px)] w-screen bg-[#0a229c76] p-5 absolute bottom-0 left-0">
      {
        addEventFormVisible && <AddEventForm setAddEventFormVisible={setAddEventFormVisible} />
      }
      {
        info.active && <InfoModal id={info.id} />
      }
      <div className="bg-[#abcaff] w-full h-full rounded-xl flex flex-col items-center shadow-[0_0_10px_0_rgba(0,0,0,0.5)]">
        <div className="flex justify-between items-center flex-grow-[1] text-xl w-full">
          <div className='flex items-center gap-8 ml-[600px] flex-grow-[1]'>
            <span className="hover:cursor-pointer" onClick={handleMonthDecrement}>{'<'}</span>
            <span className="hover:cursor-pointer w-[200px] text-center">{MONTHS[month - 1] + ' ' + year}</span>
            <span className="hover:cursor-pointer" onClick={handleMonthIncrement}>{'>'}</span>
          </div>
          <button onClick={() => setAddEventFormVisible(true)} className='mr-[50px] text-[15px] px-5 py-1 border-[1px] rounded-[5px] hover:border-[#accbff] hover:bg-[#cfe1ff] border-transparent active:bg-gray-100 transition-[background-color, border-color] duration-200'>
            Crear nuevo evento
          </button>
        </div>
        <div className="w-[98%] grid grid-cols-7 bg-[#bbd4ff] flex-grow-[1] gap-1 p-2 border-[1px] rounded-t-xl border-[#a19aff6b] shadow-[inset_0_2px_2px_rgba(0,0,0,0.2)]">
          {DAYS_SHORT.map((item, index) => (
            <div key={item} className="flex flex-col justify-center items-center cursor-pointer">
              <span className={`${index === 5 || index === 6 ? 'text-red-500' : ''}`}>{item}</span>
            </div>
          ))}
        </div>
        <div className="w-[98%] bg-[#d0e1ff] rounded-b-xl flex-grow-[13] grid grid-cols-7 gap-1 p-2 shadow-[inset_2px_0_2px_rgba(0,0,0,0.2),inset_-2px_0_2px_rgba(0,0,0,0.2)]" >
          {
          getCalendarDates(year, month).map((item) => {
            const eventsInDate = initialEvents.filter((event) => {
              const eventDate = new Date(event.date);
              return eventDate.getFullYear() === item.date.getFullYear() && eventDate.getMonth() === item.date.getMonth() && eventDate.getDate() === item.date.getDate();
            })
            return (
              <div key={item.date.toDateString() } className={`cursor-pointer relative bg-[#dcdbff] flex flex-col items-center rounded-lg border-[1px] border-[#a19aff6b] justify-center ${item.isCurrentMonth ? '' : 'opacity-40'}`}>
                <span className={`${item.date.getDay() === 0 || item.date.getDay() === 6 ? 'text-red-500' : ''}`}>{item.date.getDate()}</span>
                <div className='absolute top-0 left-0 grid grid-rows-3 grid-cols-2 grid-flow-col gap-y-1 gap-x-1 p-2'>
                  {
                    eventsInDate.map((event, index) => (
                      <div key={event.id + 'dot'} className={`w-[15px] h-[15px] ${EVENT_COLORS[index % EVENT_COLORS.length]} ${EVENT_BORDER_COLORS[index % EVENT_BORDER_COLORS.length]} border-[1px] rounded-[50%]`}>

                      </div>
                    ))
                  }
                </div>
                <div className={`absolute h-full w-full grid grid-rows-3 grid-cols-2 grid-flow-col gap-y-1 gap-x-1 top-0 left-0 z-10 ${item.isCurrentMonth ? 'opacity-0 hover:opacity-100 transition-opacity backdrop-blur-[3px] after:opacity-0 after:content-[""] after:bg-[#5a55ec25] after:absolute after:top-0 after:left-0 after:h-full after:w-full duration-500 after:transition-[opacity] after:duration-300 hover:after:opacity-100' : 'bg-[#5a55ec25]'} p-2`}>
                {
                  eventsInDate.map((event, index) => (
                    <span key={event.id} onClick={() => handleShowInfo(event.id)} className={`m-0 z-50 h-[18px] leading-[18px] hover:cursor-pointer text-[10px] py-[0px] px-[4px] overflow-hidden text-ellipsis rounded-full border-[1px] ${EVENT_COLORS[index % EVENT_COLORS.length]} ${EVENT_BORDER_COLORS[index % EVENT_BORDER_COLORS.length]}`}>{event.name}</span>
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
