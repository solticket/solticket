import CreateEventForm from '../events/CreateEventForm'
import { useModalStore } from '../../stores/modal.store'

const ModalContentInner = () => {
  const { modalData, modalType } = useModalStore()
  console.log('🚀🚀🚀 ~ ModalContentInner ~ modalData:', modalData, modalType)

  switch (modalType) {
    case 'create-event':
      return <CreateEventForm />

    default: {
      return null
    }
  }
}

export default ModalContentInner
