import { PublicKey } from '@solana/web3.js'

export type EventData = {
  title: string
  description: string
  location: string
  deadline: number
  eventDeadline: number
}

export type Event = {
  publicKey: PublicKey
  account: EventData
}
