'use server'

import { signIn, signOut, signUp } from '@/app/lib/auth'
import { cookies } from 'next/headers'
import { revalidateTag } from "next/cache";
import { Event, Subject, User } from "@/app/lib/definitions";
import { SUBJECTS } from '@/app/lib/subjects';
import { SUBJECTS_COLORS_OBJ, SUBJECTS_BG_COLORS_OBJ, SUBJECTS_BORDER_COLORS_OBJ } from './utils';
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
  const error = await signIn(formData)
  if (error) {
    return error
  }
}

export async function logout(_currentState: unknown) {
  const error = await signOut()
  if (error) {
    return error
  }
}

export async function addEvent(formData: FormData) {
  const name = formData.get("name") as string
  const date = formData.get('date') as string
  const time = formData.get('time') as string | undefined
  const description = formData.get('description') as string | undefined
  const subjectid = formData.get('subjectid') as string | undefined
  const event = { name, description, subjectid, date, time }
  const filteredEvent = Object.fromEntries(Object.entries(event).filter(([_, v]) => v !== undefined))
  
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
  const subjectid = formData.get('subjectid') as string | undefined
  const event = { name, description, subjectid, date, time }
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

export async function getSubjects() {
  const response = await fetch(process.env.BASE_URL as string + '/api/subjects', {
    headers: {
      Cookie: cookies().toString()
    },
    next: { tags: ['subjects'] }
  });
  if (!response.ok) {
    throw new Error('Failed to fetch subjects');
  }
  const subjects: Subject[] = await response.json();
  return subjects;
}

export async function updateSubjects(formData: FormData) {
  const subjectsToAdd: string[] = JSON.parse(formData.get("subjectsToAdd") as string)
  const subjectsToRemove: Subject[] = JSON.parse(formData.get("subjectsToRemove") as string)

  
  subjectsToAdd.forEach(async (subject: string) => {
    const payload = { name: subject, color: SUBJECTS_COLORS_OBJ[subject], bgcolor: SUBJECTS_BG_COLORS_OBJ[subject], bordercolor: SUBJECTS_BORDER_COLORS_OBJ[subject] }
    console.log('payload', payload)
    const response = await fetch(process.env.BASE_URL as string + '/api/subjects/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cookie: cookies().toString(),
      },
      body: JSON.stringify(payload)
    })
    if (!response.ok) {
      throw new Error('Failed to add subject: ' + subject)
    }
  })

  subjectsToRemove.forEach(async (subject: Subject) => {
    const response = await fetch(process.env.BASE_URL as string + '/api/subjects/' + subject.id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Cookie: cookies().toString(),
      },
    })
    if (!response.ok) {
      throw new Error('Failed to remove subject: ' + subject.name)
    }
  })
  revalidateTag('subjects')
  return getSubjects()
}

export async function getUser(): Promise<User> {
  const response = await fetch(process.env.BASE_URL as string + '/api/users', {
    headers: {
      Cookie: cookies().toString()
    }
  });
  if (!response.ok) {
    throw new Error('Failed to fetch user');
  }
  const user: User = await response.json();
  return user;
}



