import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import * as chai from 'chai';
import { Solticket } from "../target/types/solticket";

// Utilisez require pour l'IDL
const idl = require('../target/idl/solticket.json');

describe("solticket", () => {
  const assert = chai.assert;
  
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  // Use the actual program ID
  const programId = new anchor.web3.PublicKey("DGHh1S6VCBmgY4R3Upm6wqV2ADTgEqPvYfgwBqxEW82e");
  
  // Initialize the program with the correct ID
  const program = new anchor.Program(idl, programId, anchor.getProvider()) as Program<Solticket>;
  const programProvider = program.provider as anchor.AnchorProvider;
  
  it("Creer Event", async () => {
    const eventData = {
      title: "Favorite Color",
      description: "Favorite Color description",
      location: "France",
      category: { virtual: {} }, // Assurez-vous que cela correspond à votre enum Category en Rust
      deadline: new anchor.BN(22),
      ticketCount: 0,
    };

    const authority = programProvider.wallet.publicKey;
    
    const [eventPda] = anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from("event"), authority.toBuffer(), Buffer.from(eventData.title)],
      programId
    );

    try {
      const txHash = await program.methods
        .createEvent(eventData)
        .accounts({
          authority: authority,
          event: eventPda,
          collection: anchor.web3.PublicKey.findProgramAddressSync(
            [Buffer.from("collection"), eventPda.toBuffer()],
            programId
          )[0],
          systemProgram: anchor.web3.SystemProgram.programId,
        })
        .rpc();

      console.log("Transaction hash:", txHash);

      // Fetch the created event account
      const eventAccount = await program.account.event.fetch(eventPda);

      // Assert the event data
      assert.strictEqual(eventAccount.authority.toString(), authority.toString());
      assert.strictEqual(eventAccount.title, eventData.title);
      assert.strictEqual(eventAccount.description, eventData.description);
      assert.strictEqual(eventAccount.location, eventData.location);
      assert.deepEqual(eventAccount.category, eventData.category);
      assert.strictEqual(eventAccount.deadline.toNumber(), eventData.deadline.toNumber());
      assert.strictEqual(eventAccount.ticketCount, eventData.ticketCount);

      // Fetch and assert the collection account
      const collectionPda = anchor.web3.PublicKey.findProgramAddressSync(
        [Buffer.from("collection"), eventPda.toBuffer()],
        programId
      )[0];
      const collectionAccount = await program.account.nftCollection.fetch(collectionPda);

      assert.strictEqual(collectionAccount.authority.toString(), authority.toString());
      assert.strictEqual(collectionAccount.event.toString(), eventPda.toString());
      assert.strictEqual(collectionAccount.totalSupply, eventData.ticketCount);
      assert.strictEqual(collectionAccount.mintedCount, 0);

    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  });
});