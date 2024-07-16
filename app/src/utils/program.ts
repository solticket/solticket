import { AnchorProvider, Program, Wallet } from "@project-serum/anchor";
import { Connection } from "@solana/web3.js";
import { PROGRAM_ID } from "../constants/program.constant";
import IDL from "./idl.json";

export const getProgram = (connection: Connection, wallet: Wallet) => {
  const provider = new AnchorProvider(connection, wallet, {
    commitment: "confirmed",
  });
  const program = new Program(IDL as any, PROGRAM_ID, provider);
  return program;
};
