import { Button } from '../ui/button'
import Logo from '../layout/Logo'
import { BaseWalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { useWallet } from '@solana/wallet-adapter-react'
import { usePathname, useRouter } from 'next/navigation'
import { useModalStore } from '../../stores/modal.store'

// Ensure styles are loaded for wallet adapter UI components
import '@solana/wallet-adapter-react-ui/styles.css'
import { cn } from '@/lib/utils'

const Navbar = () => {
  const { connected } = useWallet()
  const router = useRouter()
  const pathname = usePathname()
  const { openModal } = useModalStore()
  return (
    <div className="h-[60px] bg-white w-full justify-between items-center flex px-8 flex-shrink-0 shadow-sm">
      <Logo />
      <div className="flex space-x-2">
        {connected && (
          <>
            <Button
              variant={'secondary'}
              className={cn('border-b-4 border-transparent rounded-none', {
                'border-primary':
                  pathname === '/discover-events' ||
                  pathname.startsWith('/event'),
              })}
              onClick={() => {
                router.push('/discover-events')
              }}
            >
              {'Discover Events'}
            </Button>

            <Button
              variant={'secondary'}
              className={cn('border-b-4 border-transparent rounded-none', {
                'border-primary': pathname === '/my-tickets',
              })}
              onClick={() => {
                router.push('/my-tickets')
              }}
            >
              {'My Tickets'}
            </Button>

            <Button
              variant={'secondary'}
              className={cn('border-b-4 border-transparent rounded-none', {
                'border-primary': pathname === '/create-event',
              })}
              onClick={() => {
                router.push('/create-event')
              }}
            >
              {'Create Event'}
            </Button>
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
