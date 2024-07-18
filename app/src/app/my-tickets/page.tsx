'use client'

import MyTicketsContent from '@/components/events/MyTicketsContent'
import GlobalLayout from '@/components/layout/GlobalLayout'
import Navbar from '@/components/layout/Navbar'

const MyTicketsPage = () => {
  return (
    <GlobalLayout>
      <main className="main-container">
        <Navbar />
        <MyTicketsContent />
      </main>
    </GlobalLayout>
  )
}

export default MyTicketsPage
