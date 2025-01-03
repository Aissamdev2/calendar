'use client'
import { useSubjects } from "@/app/lib/use-subjects";
import { useUser } from "@/app/lib/use-user";
import { getSubjects } from "@/app/lib/utils";
import SubjectTag from "@/app/ui/subject-tag";
import { SUBJECTS_PLAIN, SUBJECTS_PLAIN_WITHOUT_OTHERS } from "@/app/lib/subjects";
import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { updateSubjects } from "@/app/lib/actions";
import { mutate } from "swr";
import { useRouter } from "next/navigation";
import { Subject } from "@/app/lib/definitions";


export default function Page() {
  const { subjects, error, isLoading } = useSubjects();
  const router = useRouter()
  const [subjectState, setSubjectState] = useState(() => {
    const initialState = Object.fromEntries(
      SUBJECTS_PLAIN.map((subject) => [subject, false]) // Initialize all subjects as false
    );
    return initialState;
  });

  const changeSubjects = async (_currentState: unknown, formData: FormData) => {
    mutate(process.env.BASE_URL as string + "/api/subjects", await updateSubjects(formData))
    return 'Subjects updated'
  }

  const [reset, setReset] = useState(false)
  const [state, dispatch] = useFormState(changeSubjects, undefined)
  const [selectedOption, setSelectedOption] = useState('Seleccione una asignatura');
  const [previewSubject, setPreviewSubject] = useState<Subject | undefined>(undefined)

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value)
    setPreviewSubject(subjects?.find((subject) => subject.name === event.target.value))
  }

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPreviewSubject((prevState) => {
      if (!prevState) return prevState
      return {
        ...prevState,
        [event.target.name]: event.target.value
      }
    })
  }

  useEffect(() => {
    if (state === 'Subjects updated') {
      router.refresh();
    } else if (state === 'Failed to update subjects') {
    }
  }, [state, router]);


  useEffect(() => {
    if (subjects) {
      const subjectsNames = subjects.map((subject) => subject.name);
      const initialState = Object.fromEntries(
        SUBJECTS_PLAIN.map((subject) => {
          const isActive = subjectsNames.includes(subject);
          return [subject, isActive];
        })
      );
      setSubjectState(initialState);
    }
  }, [subjects, reset]);
  

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target as HTMLInputElement
    setSubjectState((prevState) => {
      return {
        ...prevState,
        [value]: !prevState[value]
      }
    })
  }

  const onSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!subjects) return
    const subjectsNames = subjects.map((subject) => subject.name);
    const selectedSubjects = SUBJECTS_PLAIN_WITHOUT_OTHERS.filter((subject) => subjectState[subject]);
    const formData = new FormData(e.currentTarget);

    const subjectsToAdd = selectedSubjects.filter((subject) => !subjectsNames.includes(subject));
    const subjectsToRemove = subjects.filter((subject) => !subjectState[subject.name]);
    formData.append("subjectsToAdd", JSON.stringify(subjectsToAdd));
    formData.append("subjectsToRemove", JSON.stringify(subjectsToRemove));

    // Dispatch the form with the dynamic data
    dispatch(formData);
  }

  console.log(selectedOption)
  if (!subjects || isLoading) return null

  return (
    <div className="h-full w-full flex bg-[#dae8fd] text-gray-900 font-medium justify-center items-center">
      <div className="w-[95%] h-[90%] bg-[#e8f0fd] rounded-[30px] border border-[#a19aff6b] flex justify-between px-[60px] py-10">
        <form action={dispatch} onSubmit={onSubmitForm} className="flex flex-col gap-3 max-w-[40%]">
          <p className="text-sm border-b px-2 py-2 border-[#5f3fbe61]">Asignaturas cursando actualmente</p>
          <div className="flex gap-6">
            <ul className="flex flex-col gap-3 py-2">
              {
                subjects.map((subject, index) => {
                  if (subject.name === 'Otros') return null
                  return <li key={subject.id} className="max-w-[170px]"><SubjectTag subject={subject} /></li>
              })
              }
            </ul>

            <div className="flex flex-col py-2 gap-3 max-h-[397.6px]">
              <div className="flex gap-2 grow-0 shrink-0">
                <p className="[writing-mode:vertical-lr]  text-sm flex justify-center items-center text-gray-500">Activas</p>
                <div className="flex flex-col gap-3">
                  {
                    subjects.map((subject, index) => {
                      if (subject.name === 'Otros') return null
                      return (
                        <div key={subject.id} title={subject.name} className="flex items-center">
                          <input checked={subjectState[subject.name]} type="checkbox" name="subject" value={subject.name} onChange={handleChange} className="w-[21.6px] h-[21.6px] appearance-none border cursor-pointer border-gray-300  rounded-md mr-2 hover:border-indigo-500 hover:bg-indigo-100 checked:bg-no-repeat checked:bg-center checked:border-indigo-500 checked:bg-indigo-100"/>
                          <label htmlFor="checkbox-default" className="text-sm font-norma cursor-pointer truncate max-w-[200px] text-gray-600">{subject.name}</label>
                        </div>
                      )
                    })
                  }
                </div>
              </div>
              <div className="w-full border-b border-[#5f3fbe3c]"></div>
              <div className="flex gap-2 border-b border-[#5f3fbe2a] grow-[1] shrink-[1] min-h-[0]">
                <p className="[writing-mode:vertical-lr] text-sm flex justify-start items-center text-gray-500">Inactivas</p>
                <div className="flex flex-col gap-3 overflow-auto scrollbar-hidden max-h-[200px] pb-2">
                  {
                    SUBJECTS_PLAIN.map((subject, index) => {
                      if (subjects?.map((subject) => subject.name)?.includes(subject) || subject === 'Otros') return null
                      return (
                        <div key={subject} title={subject} className="flex items-center">
                          <input checked={subjectState[subject]} type="checkbox" name="subject" value={subject} onChange={handleChange} className="w-[21.6px] h-[21.6px] appearance-none border cursor-pointer border-gray-300  rounded-md mr-2 hover:border-indigo-500 hover:bg-indigo-100 checked:bg-no-repeat checked:bg-center checked:border-indigo-500 checked:bg-indigo-100"/>
                          <label htmlFor="checkbox-default" className="text-sm font-norma cursor-pointer truncate max-w-[200px] text-gray-600">{subject}</label>
                        </div>
                      )
                    })
                  }
                </div>
                <div className="flex items-end py-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 animate-bounce">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-3 justify-center">
            <button type="button" onClick={() => setReset(!reset)} className="py-2.5 px-5 text-xs bg-red-500 text-white rounded-full cursor-pointer font-semibold text-center shadow-xs transition-all duration-500 hover:bg-red-700">
              Reestablecer
            </button>
            <UpdateButton />
          </div>
        </form>
        <div className="flex flex-col gap-3">
          <p className="text-sm border-b px-2 py-2 border-[#5f3fbe61]">Colores de asignatura</p>
          <div className="flex items-center gap-[50px]">
            <div className="flex flex-col gap-8 justify-evenly">
              <div className="flex flex-col">
                <label htmlFor="countries" className=" mb-2 text-sm font-medium text-gray-600 w-full">Asignatura</label>
                <select 
                id="options"
                name="options"
                value={selectedOption}
                onChange={handleSelectChange}
                className="h-12 border border-gray-300 text-gray-600 text-base rounded-lg block w-full py-1 px-2 focus:outline-none">
                  <option value="Seleccione una asignatura">Seleccione una asignatura</option>
                  {
                    subjects.map((subject) => {
                      if (subject.name === 'Otros') return null
                      return (
                        <option key={subject.id + 'color'} value={subject.name}>{subject.name}</option>
                      )
                    })
                  }
                </select>
              </div>
              <SubjectTag subject={previewSubject} />
            </div>
            <div className="flex flex-col gap-3">
              <div className='flex flex-col '>
                <label htmlFor="hs-color-input" className="text-sm font-medium mb-2 text-nowrap dark:text-white">Color de texto</label>
                <input onChange={handleColorChange} disabled={selectedOption === 'Seleccione una asignatura'} type="color" name="color" className="p-1 h-10 w-14 bg-white border border-gray-200 cursor-pointer rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700" id="color" defaultValue={subjects?.find((subject) => subject.name === selectedOption)?.color}></input>
              </div>
              <div className='flex flex-col '>
                <label htmlFor="hs-color-input" className="text-sm font-medium mb-2 dark:text-white">Color de fondo</label>
                <input onChange={handleColorChange} disabled={selectedOption === 'Seleccione una asignatura'} type="color" name="bgcolor" className="p-1 h-10 w-14 bg-white border border-gray-200 cursor-pointer rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700" id="bgcolor" defaultValue={subjects?.find((subject) => subject.name === selectedOption)?.bgcolor} ></input>
              </div>
              <div className='flex flex-col '>
                <label htmlFor="hs-color-input" className="text-sm font-medium mb-2 dark:text-white">Color de borde</label>
                <input onChange={handleColorChange} disabled={selectedOption === 'Seleccione una asignatura'} type="color" name="bordercolor" className="p-1 h-10 w-14 bg-white border border-gray-200 cursor-pointer rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700" id="bordercolor" defaultValue={subjects?.find((subject) => subject.name === selectedOption)?.bordercolor}></input>
              </div>
            </div>
          </div>
          <div className="flex gap-3 justify-center">
            <button type="button" onClick={() => setReset(!reset)} className="py-2.5 px-5 text-xs bg-red-500 text-white rounded-full cursor-pointer font-semibold text-center shadow-xs transition-all duration-500 hover:bg-red-700">
              Reestablecer
            </button>
            <UpdateButton />
          </div>
        </div>
      </div>
    </div>
  );
}

function UpdateButton() {
  const { pending } = useFormStatus()

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (pending) {
      event.preventDefault()
    }
  }

  return (
    <button aria-disabled={pending} type="submit" onClick={handleClick} className="py-2.5 px-5 text-xs  bg-indigo-500 text-white rounded-full cursor-pointer font-semibold text-center shadow-xs transition-all duration-500 hover:bg-indigo-700 close-modal-button">
      Aplicar
    </button>
  )
}