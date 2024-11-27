import Modal from "@/app/ui/modal"
import ViewEvent from "@/app/ui/view-event"
import ViewEventSkeleton from "@/app/ui/view-event-skeleton"
import { Suspense } from "react"

export default async function Page({ params }: { params: { id: string } }) {
  return (
    <Modal>
      <Suspense fallback={<ViewEventSkeleton />}>
        <ViewEvent id={params.id} />
      </Suspense>
    </Modal>
  )
}