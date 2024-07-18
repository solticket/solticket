import { useModalStore } from '../../stores/modal.store'
import { Dialog } from '../ui/dialog'
import ModalContentInner from './ModalContentInner'

const ModalContent = () => {
  const { isOpen, closeModal, modalType } = useModalStore()

  if (!isOpen || !modalType) {
    return null
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && closeModal()}>
      <ModalContentInner />
    </Dialog>
  )
}

export default ModalContent
