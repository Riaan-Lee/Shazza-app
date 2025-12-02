import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import BottomNav from './components/Bottomnav.jsx' // <-- new

export default function App() {
  return (
    <div className="min-h-screen w-full bg-[#0a0a0a] text-white">
      <Navbar />
      <main className="min-h-[calc(100vh-160px)] pb-28 page-container">
        <Outlet />
      </main>
      <Footer />
      <BottomNav />
    </div>
  )
}
