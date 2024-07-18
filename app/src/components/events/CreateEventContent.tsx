import { useWallet } from '@solana/wallet-adapter-react'
import NonAuthContent from '../layout/NonAuthContent'
import CreateEventButton from './CreateEventButton'
import MyEventListing from './MyEventListing'

const CreateEventContent = () => {
  const { connected } = useWallet()

  if (!connected) {
    return <NonAuthContent />
  }

  return (
    <div className="py-16 max-w-screen-lg px-2 lg:px-0 m-auto">
      <div className="flex justify-between items-center">
        <h2 className="title">{'Your events'}</h2>

        <CreateEventButton />
      </div>

      <div className="mt-6">
        <MyEventListing />
      </div>
    </div>
  )
}

export default CreateEventContent
