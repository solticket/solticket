import { useWallet } from '@solana/wallet-adapter-react'
import NonAuthContent from '../layout/NonAuthContent'
import EventsList from './EventsList'

const DiscoverEventsContent = () => {
  const { connected } = useWallet()

  if (!connected) {
    return <NonAuthContent />
  }

  return (
    <div className="py-16 max-w-screen-lg m-auto">
      <h2 className="title">{'Discover our exclusives events'}</h2>

      <div className="mt-6">
        <EventsList />
      </div>
    </div>
  )
}

export default DiscoverEventsContent
