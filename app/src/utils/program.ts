import { Connection } from '@solana/web3.js';
import { PROGRAM_ID } from "../constants/program.constant";
import * as anchor from "@coral-xyz/anchor";
import idl from "./idl_solticket.json";
import {
  Program,
  Idl,
  AnchorProvider,
  setProvider,
} from "@coral-xyz/anchor";


export const getProgram = (connection: Connection, wallet: anchor.Wallet) => {
  // Configure the client to use the local cluster.
  const provider = new AnchorProvider(connection, wallet, {
    commitment: "confirmed",

  })
  setProvider(provider)

  const programId = new anchor.web3.PublicKey(PROGRAM_ID);
  const program = new Program(idl as Idl, provider);

  return program;
};
 

