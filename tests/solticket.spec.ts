import * as anchor from '@coral-xyz/anchor'
import { Program } from '@coral-xyz/anchor'
import * as chai from 'chai'
import { Solticket } from '../target/types/solticket'

describe('solticket', () => {
  const assert = chai.assert
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env())
  const systemProgram = anchor.web3.SystemProgram
  const program = anchor.workspace.Solticket as Program<Solticket>
  const programProvider = program.provider as anchor.AnchorProvider

  it('Create Event', async () => {
    const title = 'Event Title'
    const description = 'Event Description'
    const location = 'France'
    const category = 'Virtual'
    const startDate = new anchor.BN(1721540814)
    const totalSeats = 200
    const imageUrl = 'https://spaceholder.cc/i/300x200'

    const eventCreator = programProvider.wallet
    const eventKeypair = anchor.web3.Keypair.generate()

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
    assert.strictEqual(eventAccountResult.image_url, imageUrl)
    assert.strictEqual(
      JSON.stringify(eventAccountResult.category),
      '{"virtual":{}}',
    )
    //assert.strictEqual(eventAccountResult.deadline, startDate);
    //chai.expect(eventAccountResult.deadline).to.be.a.bignumber.that.equals(startDate);
    // assert.strictEqual(eventAccountResult.startDate, 0)
    assert.strictEqual(
      JSON.stringify(eventAccountResult.status),
      '{"create":{}}',
    )
  })
})
