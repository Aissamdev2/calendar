'use server'

import { signIn, signUp } from '@/app/auth'
import { cookies } from 'next/headers'
import { revalidateTag } from "next/cache";
import { Event } from "@/app/lib/definitions";



export async function register(currentState: unknown, formData: FormData) {
  try {
    await signUp(formData)
  } catch (error) {
    if (error instanceof Error) {
      switch (error.cause) {
        case 'USER_NOT_CREATED':
          return 'User not created.'
      }
    }
    else {
      return 'Unknown error.'
    }
    throw error
  }
}

export async function authenticate(_currentState: unknown, formData: FormData) {
  try {
    await signIn(formData)
  } catch (error) {
    if (error instanceof Error) {
      switch (error.cause) {
        case 'EMAIL_NOT_FOUND':
          return 'Email not found.'
        case 'INVALID_PASSWORD':
          return 'Invalid password.'
      }
    }
    else {
      return 'Unknown error.'
    }
    throw error
  }
}

export async function addEvent(_currentState: unknown, formData: FormData) {
  const name = formData.get("name") as string
  const date = formData.get('date') as string
  const time = formData.get('time') as string
  const event = { name, date, time }
  console.log('event is: ', event)
  
  const response = await fetch(process.env.BASE_URL as string + '/api/events', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Cookie: cookies().toString(),
    },
    body: JSON.stringify(event),
  })
  if (response.ok) {
    revalidateTag('calendar')
    return 'Event created'
  }
  throw new Error('Failed to create event: ' + JSON.stringify(event))
}

export async function getEvents() {
  const response = await fetch(process.env.BASE_URL as string + '/api/events', {
    headers: {
      Cookie: cookies().toString()
    },
    next: { tags: ['calendar'] }
  });
  if (!response.ok) {
    throw new Error('Failed to fetch events');
  }
  const events: Event[] = await response.json();
  return events;
}