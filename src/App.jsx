import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import BottomNav from './components/Bottomnav.jsx' // <-- new

export default function App() {
  return (
    <>
      <Navbar />
      <main className="min-h-[calc(100vh-160px)] pb-28">
        {' '}
        {/* pb-28 reserves space for bottom nav */}
        <Outlet />
      </main>

      <Footer />

      {/* Mobile floating navigation */}
      <BottomNav />
    </>
  )
}
