'use client'

import { useEffect, useState } from "react";
import { Event, Subject, User } from "../lib/definitions";
import { useRouter } from "next/navigation";
import { useFormState, useFormStatus } from "react-dom";
import { updateEvent } from "../lib/actions";
import { useUser } from "../lib/use-user";
import { getSubjects } from "../lib/utils";
import { useSubjects } from "../lib/use-subjects";

export default function EditEventClient({ event }: { event: Event }) {
  const [state, dispatch] = useFormState(updateEvent, undefined)
  const [errorMessage, setErrorMessage] = useState('')
  const router = useRouter()
  const { subjects, error, isLoading } = useSubjects()

  useEffect(() => {
    if (state === 'Event updated') {
      router.back()
    } else if (state === 'Failed to update event') {
      setErrorMessage('No se pudo actualizar el evento')
    }
  }, [state, setErrorMessage, router])

  if (!subjects) {
    return null
  }

    return (
      <form action={dispatch} className="w-fit flex flex-col h-fit py-4 px-10 bg-white z-[3] rounded-2xl">
        <input type="hidden" name="id" value={event.id} />
        <div className="flex justify-between items-center pb-4 border-b border-gray-200">
          <h2 className="text-sm text-gray-900 font-medium">Editar evento</h2>
          <button className="block cursor-pointer" type="button" onClick={() => router.back()} >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.75732 7.75739L16.2426 16.2427M16.2426 7.75739L7.75732 16.2427" stroke="black" strokeWidth="1.6" strokeLinecap="round"></path>
            </svg>
          </button>
        </div>
        <div className="flex pt-6 gap-[50px]">
          <div className="flex flex-col justify-between">
            <div className="relative mb-6">
              <label className="flex  items-center mb-2 text-gray-600 text-sm font-medium">
                Título del evento
                <svg width="7" height="7" className="ml-1" viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.11222 6.04545L3.20668 3.94744L1.43679 5.08594L0.894886 4.14134L2.77415 3.18182L0.894886 2.2223L1.43679 1.2777L3.20668 2.41619L3.11222 0.318182H4.19105L4.09659 2.41619L5.86648 1.2777L6.40838 2.2223L4.52912 3.18182L6.40838 4.14134L5.86648 5.08594L4.09659 3.94744L4.19105 6.04545H3.11222Z" fill="#EF4444" />
                </svg>
              </label>
              <input defaultValue={event.name} type="text" name="name" className="block w-full h-11 px-5 py-2.5 leading-7 text-base font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none " placeholder="Name" required={true} />
            </div>
            <div className="relative mb-6">
              <label className="flex  items-center mb-2 text-gray-600 text-sm font-medium">
                Descripción
              </label>
              <div className="flex">
                <div className="relative w-full">
                  <textarea defaultValue={event.description} name="description" className="block w-full h-40 px-4 py-2.5 text-base leading-7 font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-2xl placeholder-gray-400 focus:outline-none resize-none" placeholder="Escribe una descripción..."></textarea>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-start">
            <div className="relative mb-6">
              <label className="flex  items-center mb-2 text-gray-600 text-sm font-medium">
                Fecha del evento
                <svg width="7" height="7" className="ml-1" viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.11222 6.04545L3.20668 3.94744L1.43679 5.08594L0.894886 4.14134L2.77415 3.18182L0.894886 2.2223L1.43679 1.2777L3.20668 2.41619L3.11222 0.318182H4.19105L4.09659 2.41619L5.86648 1.2777L6.40838 2.2223L4.52912 3.18182L6.40838 4.14134L5.86648 5.08594L4.09659 3.94744L4.19105 6.04545H3.11222Z" fill="#EF4444" />
                </svg>
              </label>
              <input defaultValue={new Date(event.date).toLocaleDateString().split('/').map((date) => date.padStart(2, '0')).reverse().join('-')} type="date" name="date" className="block w-full h-11 px-5 py-2.5 leading-7 text-base font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none " required={true} />
            </div>
            <div className="relative mb-6">
              <label className="flex  items-center mb-2 text-gray-600 text-sm font-medium">
                Hora del evento
              </label>
              <input defaultValue={event.time} type="time" name="time" className="block w-full h-11 px-5 py-2.5 leading-7 text-base font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none " required={false} />
            </div>
          </div>
          <div className="flex flex-col items-center justify-start w-[190px]">
            <div className="relative mb-6">
              <label className="flex  items-center mb-2 text-gray-600 text-sm font-medium">
                Asignatura
              </label>
              <div className="flex flex-col gap-[5px]">
                <SubjectRadios subjects={subjects} event={event}/>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end pt-4 border-t border-gray-200 space-x-4">
            <button type="button" onClick={() => router.back()} className="py-2.5 px-5 text-xs bg-indigo-50 text-indigo-500 rounded-full cursor-pointer font-semibold text-center shadow-xs transition-all duration-500 hover:bg-indigo-100 close-modal-button">Cerrar</button>
            <EditButton />
        </div>
      </form>
    )
}

function EditButton() {
  const { pending } = useFormStatus()

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (pending) {
      event.preventDefault()
    }
  }

  return (
    <button aria-disabled={pending} type="submit" onClick={handleClick} className="py-2.5 px-5 text-xs  bg-indigo-500 text-white rounded-full cursor-pointer font-semibold text-center shadow-xs transition-all duration-500 hover:bg-indigo-700 close-modal-button">
      Actualizar
    </button>
  )
}


function SubjectRadios({ subjects, event }: { subjects: Subject[], event: Event }) {
  const emptyState = () => {
    const subjectsName = subjects.map((subject) => subject.name)
    const values = Array(subjects.length).fill(false)
    const state: Record<string, boolean> = Object.fromEntries(subjectsName.map((subject, index) => [subject, values[index]]))
    return state
  }

  const [isChecked, setIsChecked] = useState(() => {
    let state = emptyState()
    state[subjects.find((subject) => subject.id === event.subjectid)!.name] = true
    return state
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, target: string) => {
    const { checked } = e.target;
    setIsChecked((prevState: Record<string, boolean>) => {
      let state = emptyState()
      state[target] = checked;
      return state;
    });
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>, target: string) => {
    if (isChecked[target]) {
      setIsChecked(() => {
        let state = emptyState()
        state["Otros"] = true
        return state
      });
    }
  };

  return (
    <>
      {subjects.map((subject, index) => {
        return <div key={subject.id} className="flex items-center">
          <input
            type="radio"
            id={subject.id}
            className="hidden peer"
            onChange={(event) => handleChange(event, subject.name)}
            value={subject.id}
            onClick={(event) => handleClick(event, subject.name)}
            checked={isChecked[subject.name]}
            name="subjectid"
          />
          <label htmlFor={subject.id}>
            <div
              style={{
                backgroundColor: subject.bgcolor,
                borderColor: subject.bordercolor,
                color: subject.color,
              }}
              className={
                `max-w-[170px] cursor-pointer flex items-center gap-2 border-[2px] text-xs font-medium mr-2 px-1.5 rounded-full py-1`}
            >
              <p className="overflow-hidden truncate w-[">{subject.name}</p>
              {isChecked[subject.name] && (
                <div className="min-w-[8px]">
                  <svg
                    width="8"
                    height="8"
                    viewBox="0 0 8 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1.52539 6.47487L6.47514 1.52512M6.47514 6.47487L1.52539 1.52512"
                      stroke="#6B7280"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                </div>
              )}
            </div>
          </label>
        </div>
      })}
    </>
  );
}