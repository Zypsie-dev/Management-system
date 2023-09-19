import Login from './components/Login'
import React from 'react'
import Home from './components/Home'
import { BrowserRouter,Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import './assets/Styles/NavBar.css'
import './assets/Styles/SideBar.css'
import '@fontsource/montserrat'
function App() {
  return (
    <>
      <BrowserRouter>
       <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />}/>
          </Route>
          <Route path="/login" element={<Login title="Login"/>} />
          <Route path="/register" element={<Login title="Register"/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
  }
export default App
