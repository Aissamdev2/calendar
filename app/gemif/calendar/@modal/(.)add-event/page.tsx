import Modal from "@/app/ui/modal"
import AddEventForm from "@/app/ui/add-event-form"
import { Suspense } from "react"

export default async function Page() {

  return (
    <Modal>
      <AddEventForm/>
    </Modal>
  )
}