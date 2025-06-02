import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import MeetingDetails from './pages/MeetingDetails.jsx'
import SearchedResult from './pages/SearchedResult.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App/>}/>
        <Route path='/details/:eventId' element={<MeetingDetails/>}/>
        <Route path='/events' element={<SearchedResult/>}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
