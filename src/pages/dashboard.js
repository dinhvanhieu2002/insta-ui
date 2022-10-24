import { useEffect } from 'react'

import Timeline from '../components/Timeline'
import Sidebar from '../components/Sidebar/Sidebar'
import Header from '../components/Header/Header'

export default function Dashboard() {
  useEffect(() => {
    document.title = 'Instagram'
  }, [])

  return (
    <div className="bg-gray-background">
      <Header />
      <div className="grid mt-16 h-1000">
        <Timeline />
        <Sidebar />
      </div>
    </div>
  )
}
