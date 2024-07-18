import { Button } from '../ui/button'
import { useModalStore } from '@/stores/modal.store'

const CreateEventButton = () => {
  const { openModal } = useModalStore()

  return (
    <div>
      <Button
        type="submit"
        size="lg"
        onClick={() => {
          openModal('create-event')
        }}
      >
        {'Create new event'}
      </Button>
    </div>
  )
}

export default CreateEventButton
