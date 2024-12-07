import { Event, Subject } from "../lib/definitions"

export default function Dashboard({eventsInDate, subjects}:{eventsInDate: Event[] | undefined, subjects: Subject[] | undefined}) {

  if (!subjects || !eventsInDate) {
    return null
  }

  return (
    <div className="flex flex-col grow lg:mr-8">
        <h2 className="font-manrope text-3xl leading-tight text-gray-900 mb-1.5">
          Eventos cercanos
        </h2>
        <p className="text-lg font-normal text-gray-600 mb-8">(seleciona un dia para ver los eventos)</p>
        <div className="flex gap-5 flex-col overflow-auto p-4 bg-gray-200/40 scrollbar-hidden max-h-[450px]">
        {
          eventsInDate.map((event, index) => {
            const subject = subjects?.find((subject) => subject.id === event.subjectid)
            return (
              <div key={event.id} className="p-3 w-full max-w-full shrink-0 rounded-xl bg-white">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <span 
                    style={{ backgroundColor: subject?.bgcolor, borderColor: subject?.bordercolor, color: subject?.color }}
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
    </div>
  )
}