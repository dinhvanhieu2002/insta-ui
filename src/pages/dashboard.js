import { useEffect } from 'react'

import Timeline from '../components/Timeline/Timeline'
import Sidebar from '../components/Sidebar/Sidebar'
import Header from '../components/Header/Header'

export default function Dashboard() {
  useEffect(() => {
    document.title = 'Instagram'
  }, [])

  return (
    <div className="bg-gray-background">
      <Header />
      <div className="grid mt-20">
        <Timeline />
        <Sidebar />
      </div>
    </div>
  )
}
