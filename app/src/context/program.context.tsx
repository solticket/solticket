import { createContext, useContext, useMemo, useState } from 'react'
import {
  AnchorWallet,
  useAnchorWallet,
  useConnection,
} from '@solana/wallet-adapter-react'
import { mockWallet } from '../utils/helpers'
import { getProgram } from '../utils/program'
import { Connection, Keypair } from '@solana/web3.js'
import { Event, EventData } from '@/types/event'

export const ProgramContext = createContext({
  connection: null as Connection | null,
  wallet: null as AnchorWallet | null,
  events: [] as Event[],
  createEvent: (_data: EventData) => {},
  fetchEvents: () => {},
  fetchingEvents: false,
  eventsLoaded: false,
})

export const ProgramProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const { connection } = useConnection()
  const wallet = useAnchorWallet() as AnchorWallet
  const [fetchingEvents, setFetchingEvents] = useState(false)
  const [events, setEvents] = useState<Event[]>([])
  const [eventsLoaded, setEventsLoaded] = useState(false)

  const program = useMemo(() => {
    if (connection) {
      return getProgram(connection, (wallet ?? mockWallet()) as any)
    }
  }, [connection, wallet])

  const fetchEvents = async () => {
    if (!program || eventsLoaded) return
    setFetchingEvents(true)
    const events = await (program.account as any).event.all()
    setEvents(events)
    setFetchingEvents(false)
    setEventsLoaded(true)
  }

  const createEvent = async (data: EventData) => {
    const eventCreator = wallet
    const eventKeypair = Keypair.generate()
    if (!program) return
    const tx = await program.methods
      .createEvent(
        data.title,
        data.description,
        data.location,
        data.category,
        data.startDate,
        data.count,
      )
      .accounts({
        event: eventKeypair.publicKey,
        signer: eventCreator.publicKey,
      })
      .signers([eventKeypair])
      .rpc()

    console.info('createEvent tx', tx)
  }

  return (
    <ProgramContext.Provider
      value={{
        connection,
        wallet,
        events,
        createEvent,
        fetchEvents,
        fetchingEvents,
        eventsLoaded,
      }}
    >
      {children}
    </ProgramContext.Provider>
  )
}

export const useProgramContext = () => {
  const context = useContext(ProgramContext)
  if (!context) {
    throw new Error('useProgramContext must be used within a ProgramProvider')
  }

  return context
}
