"use client";

import { ProgramProvider } from "@/context/program.context";
import Footer from "./Footer";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { useMemo } from "react";

const GlobalLayout = ({ children }: { children: React.ReactNode }) => {
  const endpoint = "http://127.0.0.1:8899";

  const wallets = useMemo(() => [new PhantomWalletAdapter()], []);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <ProgramProvider>
            <div>{children}</div>

            <Footer />
          </ProgramProvider>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default GlobalLayout;
