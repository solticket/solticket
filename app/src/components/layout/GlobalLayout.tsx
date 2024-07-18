'use client'

import { ProgramProvider } from '@/context/program.context'
import Footer from './Footer'
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets'
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'
import {
  ConnectionProvider,
  WalletProvider,
} from '@solana/wallet-adapter-react'
import { useMemo } from 'react'
import { clusterApiUrl } from '@solana/web3.js'
import ModalContent from '../modal/ModalContent'


const GlobalLayout = ({ children }: { children: React.ReactNode }) => {
  const network = WalletAdapterNetwork.Devnet
  const endpoint = useMemo(() => clusterApiUrl(network), [network])
  const wallets = useMemo(() => [new PhantomWalletAdapter()], [])

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <ProgramProvider>
            <div>{children}</div>
            <Footer />
            <ModalContent />
          </ProgramProvider>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}

export default GlobalLayout
