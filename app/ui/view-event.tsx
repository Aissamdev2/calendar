import { getEvent } from "../lib/actions";
import ViewEventClient from "./view-event-client";

export default async function ViewEvent({ id }: { id: string }) {
  const event = await getEvent(id); 

  return (
    <ViewEventClient id={event?.id} />
  )
}