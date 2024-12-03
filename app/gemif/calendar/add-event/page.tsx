import Modal from "@/app/ui/modal"
import AddEventForm from "@/app/ui/add-event-form"
import { getSubjects } from "@/app/lib/actions"

export default async function Page() {

  const subjects = await getSubjects()

  return (
    <Modal>
      <AddEventForm/>
    </Modal>
  )
}