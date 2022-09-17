import Head from 'next/head'
import Image from 'next/image'
import Footer from '../components/Footer'
import LandingPage from '../components/LandingPage'
import NavBar from '../components/NavBar'
import styles from '../styles/Home.module.css'

export default function Home() {
  
  return (
    <div>
      <NavBar />
      <LandingPage />
      <Footer />
    </div>
  )
}
