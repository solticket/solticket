import CreateEventForm from './CreateEventForm'
import { useWallet } from '@solana/wallet-adapter-react'
import NonAuthContent from '../layout/NonAuthContent'

const DiscoverEventsContent = () => {
  const { connected } = useWallet()

  if (!connected) {
    return <NonAuthContent />
  }

  return (
    <div className="py-16 max-w-screen-lg m-auto">
      <h2 className="title">{'Create your event and start selling tickets'}</h2>

      <div className="mt-6">
        <CreateEventForm />
      </div>
    </div>
  )
}

export default DiscoverEventsContent
