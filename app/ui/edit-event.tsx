import { getEvent } from "../lib/actions"
import EditEventClient from "./edit-event-client"

export default async function EditEvent({ id }: { id: string }) {
  const event = await getEvent(id)

  if (!event) {
    return null
  }

  return (
    <EditEventClient event={event} />
  )
}