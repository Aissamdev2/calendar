import { getEvent, getSubjects } from "../lib/actions"
import EditEventClient from "./edit-event-client"

export default async function EditEvent({ id }: { id: string }) {
  const event = await getEvent(id)
  console.log('Rerendering EditEvent: ', event)
  const subjects = await getSubjects()

  if (!event) {
    return null
  }

  return (
    <EditEventClient event={event} subjects={subjects} />
  )
}