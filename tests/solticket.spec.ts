import * as anchor from '@coral-xyz/anchor'
import { Program } from '@coral-xyz/anchor'
import * as chai from 'chai'
import { Solticket } from '../target/types/solticket'
import dotenv from 'dotenv'

dotenv.config()

describe('Solticket', () => {
  const assert = chai.assert
  anchor.setProvider(anchor.AnchorProvider.env())
  const program = anchor.workspace.Solticket as Program<Solticket>
  const programProvider = program.provider as anchor.AnchorProvider

  it('Create Event', async () => {
    const eventCreator = programProvider.wallet
    const eventKeypair = anchor.web3.Keypair.generate()

    const title = 'Event Title'
    const description = 'Event Description'
    const location = 'France'
    const category = 'Virtual'
    const startDate = new anchor.BN(1721540814)
    const totalSeats = 200
    const imageUrl = 'https://spaceholder.cc/i/300x200'

    const txHash = await program.methods
      .createEvent(
        title,
        description,
        location,
        category,
        startDate,
        totalSeats,
        imageUrl,
      )
      .accounts({
        event: eventKeypair.publicKey,
        signer: eventCreator.publicKey,
      })
      .signers([eventKeypair])
      .rpc()

    await programProvider.connection.confirmTransaction(txHash)

    const eventAccountResult = await program.account.event.fetch(
      eventKeypair.publicKey,
    )

    assert.strictEqual(
      eventAccountResult.authority.toString(),
      eventCreator.publicKey.toString(),
    )
    assert.strictEqual(eventAccountResult.title, title)
    assert.strictEqual(eventAccountResult.description, description)
    assert.strictEqual(eventAccountResult.location, location)
    assert.strictEqual(eventAccountResult.imageUrl, imageUrl)
    // assert.deepStrictEqual(eventAccountResult.category, category)
    assert.strictEqual(eventAccountResult.totalSeats, totalSeats)
    assert.deepStrictEqual(
      JSON.stringify(eventAccountResult.status),
      '{"create":{}}',
    )
  })
})
