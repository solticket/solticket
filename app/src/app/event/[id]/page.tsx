'use client'

import EventDetailsContent from '@/components/events/EventDetailsContent'
import GlobalLayout from '@/components/layout/GlobalLayout'
import Navbar from '@/components/layout/Navbar'

const EventDetailPage = ({ params }: { params: { id: string } }) => {
  return (
    <GlobalLayout>
      <main className="main-container">
        <Navbar />

        {!!event ? (
          <EventDetailsContent eventId={params.id} />
        ) : (
          <div className="flex items-center justify-center h-96">
            <h1 className="text-3xl font-bold text-gray-700">
              {'Event not found'}
            </h1>
          </div>
        )}
      </main>
    </GlobalLayout>
  )
}

export default EventDetailPage
