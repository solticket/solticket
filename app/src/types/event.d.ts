import { PublicKey } from '@solana/web3.js'
import BN from 'bn.js'

export type EventData = {
  title: string
  description: string
  category: string
  location: string
  startDate: BN
  totalSeats: number
  imageUrl
}

export type Event = {
  publicKey: PublicKey
  account: EventData
}
