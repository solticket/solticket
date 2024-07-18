import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import {
  AnchorWallet,
  useAnchorWallet,
  useConnection,
} from '@solana/wallet-adapter-react'
import { mockWallet } from '../utils/helpers'
import { getProgram } from '../utils/program'
import { Connection, Keypair } from '@solana/web3.js'
import BN from 'bn.js'
import { Event } from '@/types/event'

export const ProgramContext = createContext({
  connection: null as Connection | null,
  wallet: null as AnchorWallet | null,
  events: [] as Event[],
  createEvent: (
    _titre: String,
    _description: String,
    _location: String,
    _category: String,
    _votingDays: BN,
    _ticketCount: number,
  ) => {},
  fetchEvents: () => {},
  fetchingEvents: false,
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
  const program = useMemo(() => {
    if (connection) {
      return getProgram(connection, (wallet ?? mockWallet()) as any)
    }
  }, [connection, wallet])

  useEffect(() => {
    fetchEvents();
  }, [program]);

 

  const fetchEvents = async () => {
    if (!program) return
    setFetchingEvents(true)
    const events = await (program.account as any).event.all()
    setEvents(events)
    setFetchingEvents(false)
  }



  const createEvent = async (
    titre: String,
    description: String,
    location: String,
    category: String,
    votingDays: BN,
    ticketCount: number,
  ) => {
    console.log("Create Event inner");
    const eventCreator = wallet
    const eventKeypair = Keypair.generate()
    if (!program) return
    await program.methods
      .createEvent(
        titre,
        description,
        location,
        category,
        votingDays,
        ticketCount,
      )
      .accounts({
        event: eventKeypair.publicKey,
        signer: eventCreator.publicKey,
      })
      .signers([eventKeypair])
      .rpc()
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
