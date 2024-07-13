import { createContext, useContext } from "react";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";

export const ProgramContext = createContext({});

export const ProgramProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { connection } = useConnection();
  const wallet = useAnchorWallet();

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
