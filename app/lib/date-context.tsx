'use client'

import { createContext, useState } from 'react'

type DateContextType = {
  month: number
  setMonth: React.Dispatch<React.SetStateAction<number>>
  year: number
  setYear: React.Dispatch<React.SetStateAction<number>>
}

export const DateContext = createContext<DateContextType>({
  month: new Date().getMonth() + 1,
  setMonth: () => {},
  year: new Date().getFullYear(),
  setYear: () => {},
})

export function DateProvider ({
  children }:
  { children: React.ReactNode }) {

    const [month, setMonth] = useState(new Date().getMonth() + 1)
    const [year, setYear] = useState(new Date().getFullYear())

    return (
      <DateContext.Provider value={{ month, setMonth, year, setYear }}>
        {children}
      </DateContext.Provider>
    )
}