import Modal from "@/app/ui/modal"
import AddEventForm from "@/app/ui/add-event-form"
import { getSubjects } from "@/app/lib/actions"
import { Suspense } from "react"

export default async function Page() {

  const subjects = await getSubjects()

  console.log('from server modal: ', subjects)
  return (
    <Modal>
      <AddEventForm subjects={subjects}/>
    </Modal>
  )
}