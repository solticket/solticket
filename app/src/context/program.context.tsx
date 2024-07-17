import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import { mockWallet } from "../utils/helpers";
import { getProgram } from "../utils/program";
import { Keypair } from "@solana/web3.js";
// Ensure styles are loaded for wallet adapter UI components
import "@solana/wallet-adapter-react-ui/styles.css";
import BN from "bn.js";


export const ProgramContext = createContext({});

export const ProgramProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { connection } = useConnection();
  const wallet = useAnchorWallet() as any;

  const program = useMemo(() => {
    if (connection) {
      return getProgram(connection, wallet ?? mockWallet());
    }
  }, [connection, wallet]);


  useEffect(() => {
    viewEvents();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [program]);

  const [events, setEvents] = useState([]);

  const viewEvents = async () => {
    if (!program) return
    const events = await (program.account as any).event.all();
    console.log(events);
    setEvents(events);
  }


  const createEvent = async (titre: String, description: String, location: String, category: String, votingDays: BN, ticketCount: number) => {
    const eventCreator = wallet;
    const eventKeypair = Keypair.generate();
    if (!program) return
    const txHash = await program.methods
      .createEvent(titre, description, location, category, votingDays, ticketCount)
      .accounts({
        event: eventKeypair.publicKey,
        signer: eventCreator.publicKey,

      })
      .signers([eventKeypair])
      .rpc();
  };
  return (
    <ProgramContext.Provider value={{ connection, wallet, events, createEvent }}>
      {children}
    </ProgramContext.Provider>
  );
};

export const useProgramContext = () => {
  const context = useContext(ProgramContext);
  if (!context) {
    throw new Error("useProgramContext must be used within a ProgramProvider");
  }

  return context;
};
