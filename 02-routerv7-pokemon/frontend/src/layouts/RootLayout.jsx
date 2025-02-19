import { Outlet } from "react-router-dom"
import NavBar from '../components/NavBar'
import Footer from "../components/Footer"

const RootLayout = () => {
  return (
    <div className='min-h-screen bg-gray-100'>
        <NavBar />
       
        <Outlet /> 
        <Footer />
    </div>
  )
}

export default RootLayout