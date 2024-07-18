'use client'

import Hero from '@/components/homepage/Hero'
import Navbar from '@/components/layout/Navbar'
import EventsList from '@/components/events/EventsList'
import Benefits from '@/components/homepage/Benefits'
import GlobalLayout from '@/components/layout/GlobalLayout'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

const Home = () => {
  const router = useRouter()
  return (
    <GlobalLayout>
      <main className="main-container">
        <Navbar />
        <Hero />

        <div className="py-16 max-w-screen-xl m-auto px-8">
          <h2 className="title">
            {'Reserve your tickets for our exclusives events'}
          </h2>

          <div className="mt-6 ">
            <EventsList />
          </div>
        </div>

        <Benefits />

        <div className="py-16 w-full items-center justify-center flex">
          <Button
            size="lg"
            onClick={() => {
              router.push('/create-event')
            }}
          >
            {'Create your event and start selling tickets'}
          </Button>
        </div>
      </main>
    </GlobalLayout>
  )
}

export default Home
