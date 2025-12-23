import { useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom';
import './App.css'
import Wrapper from './components/Wrapper'
import NavBar from './components/NavBar'
import LoginPage from './components/login/LoginPage'
import CreateUserPage from './components/login/CreateUserPage'

function App() {
  const [user, setUser] = useState('');

  return (
    <>
      <NavBar user={user} setUser={setUser} />
      <Routes>
        <Route path='/' element={<LoginPage setUser={setUser} />} />
        <Route path='/create' element={<CreateUserPage setUser={setUser} />} />
        <Route path='/record/:id' element={<Wrapper setUser={setUser} />} />
      </Routes>
    </>
  )
}

export default App
