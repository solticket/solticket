import { useProgramContext } from '@/context/program.context'
import { Button } from '../ui/button'

const CreateEventForm = () => {
  const { createEvent } = useProgramContext()
  return (
    <div>
      <Button
        size="lg"
        onClick={() => {
          createEvent({
            title: 'Event title',
            description: 'Event description',
            deadline: 0,
            location: 'Event location',
            eventDeadline: 0,
          })
        }}
      >
        {'Create an event'}
      </Button>
    </div>
  )
}

export default CreateEventForm
