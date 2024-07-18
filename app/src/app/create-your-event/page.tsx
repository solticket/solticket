'use client'

import CreateEventForm from '@/components/events/CreateEventForm'
import GlobalLayout from '@/components/layout/GlobalLayout'
import Navbar from '@/components/layout/Navbar'

const OrganizerPage = () => {
  return (
    <GlobalLayout>
      <main className="flex flex-col items-center justify-between w-full">
        <Navbar />
        <CreateEventForm />
      </main>
    </GlobalLayout>
  )
}

export default OrganizerPage
