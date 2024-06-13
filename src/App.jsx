import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import { Home } from './Pages/Home'
import { RoomListing } from './Pages/RoomListing'
import { Register } from './Pages/Register'
import { Login } from './Pages/Login'
import { Footer } from './Components/Footer'
import { Reservations } from './Pages/Reservations'
import { Hotel } from './Pages/Hotel'
import { Search } from './Pages/Search'
import { Error } from './Pages/Error'
import { SearchCity } from './Pages/SearchCity'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Routes>
    <Route path='/' Component={Home}></Route>
    <Route path='/room/:id' Component={RoomListing}></Route>
    <Route path='/hotel/:id' Component={Hotel}></Route>
    <Route path='/register' Component={Register}></Route>
    <Route path='/login' Component={Login}></Route>
    <Route path='/reservations' Component={Reservations}></Route>
    <Route path='/search/:city/:starting/:ending/:bed/:room' Component={Search}></Route>
    <Route path='/search/room/:city/' Component={SearchCity}></Route>
    <Route path='*' Component={Error}></Route>
    </Routes>
    <ToastContainer/>
    </>
  )
}

export default App
