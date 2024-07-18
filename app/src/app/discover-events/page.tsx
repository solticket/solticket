'use client'

import DiscoverEventsContent from '@/components/events/DiscoverEventsContent'
import GlobalLayout from '@/components/layout/GlobalLayout'
import Navbar from '@/components/layout/Navbar'

const OrganizerPage = () => {
  return (
    <GlobalLayout>
      <main className="main-container">
        <Navbar />

        <DiscoverEventsContent />
      </main>
    </GlobalLayout>
  )
}

export default OrganizerPage
