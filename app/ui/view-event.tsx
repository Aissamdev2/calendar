import { getEvent } from "../lib/actions";
import ViewEventClient from "./view-event-client";

export default async function ViewEvent({ id }: { id: string }) {

  return (
    <ViewEventClient id={id} />
  )
}