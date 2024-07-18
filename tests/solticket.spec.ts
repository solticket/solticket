import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Keypair } from "@solana/web3.js";
import * as chai from 'chai';
import { Solticket } from "../target/types/solticket";



describe("solticket", () => {
  const assert = chai.assert;
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());
  const systemProgram = anchor.web3.SystemProgram;
  const program = anchor.workspace.Solticket as Program<Solticket>;
  const programProvider = program.provider as anchor.AnchorProvider;
  
  it("Creer Event", async () => {
    const titre = "Favorite Color";
    const description = "Favorite Color";
    const location = "France";
    const category = "Virtual";
    const votingDays = new anchor.BN(1000000000000);
    const ticketCount = 0;

    const eventCreator = programProvider.wallet;
    const eventKeypair = anchor.web3.Keypair.generate();
    
    console.log(eventCreator.publicKey + " "+ eventKeypair.publicKey  + " "+  program.programId);
    
    const txHash = await program.methods
      .createEvent(titre, description, location, category, votingDays, ticketCount)
      .accounts({
        event: eventKeypair.publicKey,
        signer: eventCreator.publicKey,

      })
      .signers([eventKeypair])
      .rpc();

      
    await programProvider.connection.confirmTransaction(txHash);

    const eventAccountResult = await program.account.event.fetch(
      eventKeypair.publicKey
    );

    assert.strictEqual(eventAccountResult.authority.toString(), eventCreator.publicKey.toString());
    assert.strictEqual(eventAccountResult.title, titre);
    assert.strictEqual(eventAccountResult.description, description);

    assert.strictEqual(eventAccountResult.location, location);
    assert.strictEqual(JSON.stringify(eventAccountResult.category), '{"virtual":{}}');    
    //assert.strictEqual(eventAccountResult.deadline, votingDays);
    //chai.expect(eventAccountResult.deadline).to.be.a.bignumber.that.equals(votingDays);
    assert.strictEqual(eventAccountResult.ticketCount, 0);
    assert.strictEqual(JSON.stringify(eventAccountResult.status), '{"create":{}}');

});
})
