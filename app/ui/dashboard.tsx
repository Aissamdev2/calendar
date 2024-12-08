import { Event, Subject } from "../lib/definitions"
import DashboardSkeleton from "./dashboard-skeleton";

export default function Dashboard({events, subjects}:{ events: Event[] | undefined, subjects: Subject[] | undefined}) {

  if (!subjects || !events) {
    return <DashboardSkeleton />
  }

  const weekMili = 1000*60*60*24*7;
  const nearEvents = events.filter((event) => {
    const now = new Date()
    const date = new Date(event.date)
    const diff = date.getTime() - now.getTime()
    return (diff > 0) && (diff < weekMili)
  })

  return (
    <div className="flex flex-col gap-15 grow ">
        <h2 className="text-3xl font-extrabold tracking-tight text-black leading-tight md:text-3xl">
          Próximos
          <span className=" bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
             {" Eventos"}
          </span>
        </h2>
        {
          nearEvents.length !== 0 ?
          <div className="flex gap-5 flex-col overflow-auto p-4 bg-gradient-to-b from-white/25 to-[#f6f1ff] rounded-md scrollbar-hidden max-h-[450px]">
          {
            nearEvents.map((event, index) => {
              const subject = subjects?.find((subject) => subject.id === event.subjectid)
              return (
                <div key={event.id} className="p-3 w-full max-w-full shrink-0 rounded-xl bg-white">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2.5">
                      <span 
                      style={{ backgroundColor: subject?.bordercolor, borderColor: subject?.bordercolor, color: subject?.color }}
                      className="w-2.5 h-2.5 rounded-full "></span>
                      <p className="text-base font-medium text-gray-900">Jan 10,2020 - 10:00 - 11:00</p>
                    </div>
                    
                  </div>
                  <h6 className="text-xl leading-8 font-semibold text-black mb-1">{event.name}</h6>
                  <p className="text-base font-normal text-gray-600">{event.description}</p>
                </div>
              )
            })
          }
        </div>
        :
        <p>No hay eventos cercanos</p>
      }
    </div>
  )
}