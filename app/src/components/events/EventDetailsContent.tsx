import { useProgramContext } from '@/context/program.context'
import { useEffect } from 'react'
import { Button } from '../ui/button'
import Image from 'next/image'
import Link from 'next/link'

const EventDetailsContent = ({ eventId }: { eventId: String }) => {
  const { fetchEvents, eventsLoaded, fetchingEvents, events } =
    useProgramContext()

  useEffect(() => {
    fetchEvents()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const event = events.find((event) => event.publicKey.toString() === eventId)

  if (!eventsLoaded || fetchingEvents) {
    return <div>{'Loading...'}</div>
  }

  if (!event) {
    return <div>{'Event not found'}</div>
  }

  return (
    <div className="py-16 max-w-screen-lg px-2 lg:px-0 m-auto">
      <div>
        <Link href="/discover-events">{'< Back to events'}</Link>
      </div>
      <div className="grid grid-cols-2 gap-8 mt-6">
        <div className="relative min-h-[400px]">
          <Image
            src="https://spaceholder.cc/i/400x400"
            alt={event.account.title}
            layout="fill"
            objectFit="cover"
          />
        </div>

        <div>
          <h2 className="title capitalize">{`${event.account.title}, ${event.account.location}`}</h2>

          <div className="mt-6">{event.account.description}</div>

          <div className="mt-6">
            <Button>{'Buy Ticket'}</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventDetailsContent
