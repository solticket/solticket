'use client'

import CreateEventContent from '@/components/events/CreateEventContent'
import GlobalLayout from '@/components/layout/GlobalLayout'
import Navbar from '@/components/layout/Navbar'

const CreateEventPage = () => {
  return (
    <GlobalLayout>
      <main className="main-container">
        <Navbar />

        <CreateEventContent />
      </main>
    </GlobalLayout>
  )
}

export default CreateEventPage
