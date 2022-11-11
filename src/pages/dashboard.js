import { useEffect } from 'react'

import Timeline from '../components/Timeline'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header/Header'

export default function Dashboard() {
  useEffect(() => {
    document.title = 'Instagram'
  }, [])

  return (
    <div className="bg-gray-background">
      <Header />
      <div className="grid grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg mt-16">
        <Timeline />
        <Sidebar />
      </div>
    </div>
  )
}
