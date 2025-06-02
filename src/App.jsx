import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import Meetings from './pages/Meetings'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header/>
      <Meetings/>
      <Footer/>
    </>
  )
}

export default App
