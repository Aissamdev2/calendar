import { useFormStatus, useFormState } from "react-dom";
import { addEvent } from "@/app/lib/actions";
import { useEffect, useState } from "react";


export default function AddEventForm({ setAddEventFormVisible }: { setAddEventFormVisible: React.Dispatch<React.SetStateAction<boolean>> }) {
  const [state, dispatch] = useFormState(addEvent, undefined)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    if (state === 'Event created') {
      setAddEventFormVisible(false)
    } else if (state === 'Failed to create event') {
      setErrorMessage('No se pudo crear el evento')
    }
  }, [state, setErrorMessage, setAddEventFormVisible])

  return (
    <div className="flex absolute justify-center items-center h-[calc(100vh-100px)] w-screen backdrop-blur-[2px] z-10">
      <form action={dispatch} className="flex flex-col items-center gap-[30px] bg-white w-fit h-fit rounded-xl border-[1px] border-black p-10">
        <div className="flex gap-5">
          <div>
            <label htmlFor="name" className="block w-fit mb-2 text-sm font-medium text-gray-900 dark:text-white">Título del evento</label>
            <input type="text" name="name" id="name" className="bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[150px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 transition-[border-color] duration-100" placeholder="Ej. Corte de pelo" required />
          </div>
          <div>
            <label htmlFor="date" className="block w-fit mb-2 text-sm font-medium text-gray-900 dark:text-white">Fecha del evento</label>
            <input type="date" name="date" id="date" className="bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[150px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 transition-[border-color] duration-100" placeholder="Ej. Corte de pelo" required />
          </div>
          <div>
            <label htmlFor="time" className="block w-fit mb-2 text-sm font-medium text-gray-900 dark:text-white">Hora del evento</label>
            <input type="time" name="time" id="time" className="bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[100px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 transition-[border-color] duration-100" placeholder="Ej. Corte de pelo" required />
          </div>
        </div>
        <div className="flex gap-5">
          <button type="reset" onClick={() => setAddEventFormVisible(false)} className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded">
            Cancelar
          </button>
          <AddButton />
        </div>
      </form>
    </div>
  );
}

function AddButton() {
  const { pending } = useFormStatus()

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (pending) {
      event.preventDefault()
    }
  }

  return (
    <button aria-disabled={pending} type="submit" onClick={handleClick} className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded transition-[background-color, border-color, color] duration-300">
      Crear
    </button>
  )
}