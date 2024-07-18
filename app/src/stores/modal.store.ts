import { create } from 'zustand'

export type ModalType = 'create-event'

interface ModalState {
  isOpen: boolean
  openModal: (modalType: ModalType, modalData?: Record<string, any>) => void
  closeModal: () => void
  modalType?: ModalType
  modalData?: Record<string, any>
}

export const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  openModal: (modalType: ModalType, modalData?: Record<string, any>) => {
    return set(() => ({ isOpen: true, modalType, modalData }))
  },
  closeModal: () =>
    set(() => ({
      isOpen: false,
      modalType: undefined,
      modalData: undefined,
    })),
  modalData: undefined,
}))
