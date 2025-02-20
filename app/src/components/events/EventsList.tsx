import { useProgramContext } from '@/context/program.context'
import EventCard from './EventCard'
import { useEffect } from 'react'
import EventCardSkeleton from './EventCardSkeleton'

const EventsList = () => {
  const { events, fetchEvents, fetchingEvents } = useProgramContext()

  useEffect(() => {
    fetchEvents()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (fetchingEvents) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-4">
        <EventCardSkeleton />
        <EventCardSkeleton />
        <EventCardSkeleton />
        <EventCardSkeleton />
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-4">
      {events.map((event, index) => (
        <EventCard key={index} event={event} />
      ))}
    </div>
  )
}

export default EventsList
