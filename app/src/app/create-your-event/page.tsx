'use client'

import CreateYourEventContent from '@/components/events/CreateYourEventContent'
import GlobalLayout from '@/components/layout/GlobalLayout'
import Navbar from '@/components/layout/Navbar'

const CreateYourEventPage = () => {
  return (
    <GlobalLayout>
      <main className="main-container">
        <Navbar />

        <CreateYourEventContent />
      </main>
    </GlobalLayout>
  )
}

export default CreateYourEventPage
