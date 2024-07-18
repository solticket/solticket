import { Button } from '../ui/button'
import Logo from '../layout/Logo'
import { BaseWalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { useWallet } from '@solana/wallet-adapter-react'
// Ensure styles are loaded for wallet adapter UI components
import '@solana/wallet-adapter-react-ui/styles.css'
import { useRouter } from 'next/navigation'

const Navbar = () => {
  const router = useRouter()
  const { connected } = useWallet()
  return (
    <div className="h-[60px] bg-white w-full justify-between items-center flex px-8 flex-shrink-0 shadow-sm">
      <Logo />
      <div className="flex space-x-2">
        {connected && (
          <>
            <Button
              variant={'secondary'}
              onClick={() => {
                router.push('/create-your-event')
              }}
            >
              {'Create Your Event'}
            </Button>
            <Button variant={'secondary'}>{'My Events'}</Button>
          </>
        )}

        <BaseWalletMultiButton
          labels={{
            'change-wallet': 'Change wallet',
            connecting: 'Connecting ...',
            'copy-address': 'Copy address',
            copied: 'Copied',
            disconnect: 'Disconnect',
            'has-wallet': 'Connect',
            'no-wallet': 'Connect Wallet',
          }}
        />
      </div>
    </div>
  )
}

export default Navbar
