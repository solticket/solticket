import { useWallet } from '@solana/wallet-adapter-react'
import NonAuthContent from '../layout/NonAuthContent'

const MyTicketsContent = () => {
  const { connected } = useWallet()

  if (!connected) {
    return <NonAuthContent />
  }

  return (
    <div className="py-16 max-w-screen-lg m-auto">
      <h2 className="title">{'My Tickets'}</h2>

      <div className="mt-6">
        <p className="text-black/60">{'You have no tickets yet.'}</p>
      </div>
    </div>
  )
}

export default MyTicketsContent
