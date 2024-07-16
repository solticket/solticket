import { createContext, useContext, useMemo } from "react";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import { mockWallet } from "../utils/helpers";
import { getProgram } from "../utils/program";
// Ensure styles are loaded for wallet adapter UI components
import "@solana/wallet-adapter-react-ui/styles.css";

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

  return (
    <ProgramContext.Provider value={{ connection, wallet }}>
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
