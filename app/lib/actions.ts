'use server'

import { signIn, signUp } from '@/app/lib/auth'
import { cookies } from 'next/headers'
import { revalidateTag } from "next/cache";
import { Event } from "@/app/lib/definitions";
import { SUBJECTS } from '@/app/lib/subjects';
import { redirect } from 'next/navigation';
import { mutate } from 'swr';



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

export async function addEvent(formData: FormData) {
  const name = formData.get("name") as string
  const date = formData.get('date') as string
  const time = formData.get('time') as string | undefined
  const description = formData.get('description') as string | undefined
  const subject = formData.get('subject') as string | undefined
  const event = { name, description, subject, date, time }
  const filteredEvent = Object.fromEntries(Object.entries(event).filter(([_, v]) => v !== undefined))
  console.log('event is: ', event)
  
  const response = await fetch(process.env.BASE_URL as string + '/api/events', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Cookie: cookies().toString(),
    },
    body: JSON.stringify(filteredEvent),
  })
  if (response.ok) {
    return getEvents()
  }
  throw new Error('Failed to create event: ' + JSON.stringify(event))
}

export async function updateEvent(_currentState: unknown, formData: FormData) {
  const id = formData.get("id") as string
  const name = formData.get("name") as string
  const date = formData.get('date') as string
  const time = formData.get('time') as string | undefined
  const description = formData.get('description') as string | undefined
  const subject = formData.get('subject') as string | undefined
  const event = { name, description, subject, date, time }
  const filteredEvent = Object.fromEntries(Object.entries(event).filter(([_, v]) => v !== undefined))

  const response = await fetch(process.env.BASE_URL as string + '/api/events/' + id, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Cookie: cookies().toString(),
    },
    body: JSON.stringify(filteredEvent),
  })
  if (response.ok) {
    revalidateTag('calendar')
    return 'Event updated'
  }
  throw new Error('Failed to update event: ' + JSON.stringify(filteredEvent))
}

export async function deleteEvent(formData: FormData) {
  const id = formData.get("id") as string
  const response = await fetch(process.env.BASE_URL as string + '/api/events/' + id, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Cookie: cookies().toString(),
    },
  })
  if (response.ok) {
    revalidateTag('calendar')
    return getEvents()
  }
  throw new Error('Failed to delete event: ' + id)
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

export async function getEvent(id: string) {
  console.log('RUNNING GET EVENT: ', id)
  const response = await fetch(process.env.BASE_URL as string + '/api/events/' + id, {
    headers: {
      Cookie: cookies().toString()
    }
  });
  if (!response.ok) {
    throw new Error('Failed to fetch event');
  }
  try {
    const event: Event = await response.json();
    return event;
  } catch (error) {
    return null;
  }
}

export async function getUser() {
  const response = await fetch(process.env.BASE_URL as string + '/api/users', {
    headers: {
      Cookie: cookies().toString()
    }
  });
  if (!response.ok) {
    throw new Error('Failed to fetch user');
  }
  const user = await response.json();
  return user;
}

export async function getSubjects() {
  const session = await getUser();

  const now = new Date();
  const quadri = now.getMonth() < 7 ? 1 : 0;

  const subjects = SUBJECTS[Number(session.year) - 1][quadri];
  console.log('from server action: ', subjects)
  return subjects;
}


