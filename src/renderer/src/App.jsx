import Login from './components/Login'
import React from 'react'
import Home from './components/Home'
import { BrowserRouter,Routes, Route } from 'react-router-dom'
function App() {
  return (
    <div className="w-screen">
      <BrowserRouter>
       <Routes>
          <Route path="/" element={<Home />}/>
            <Route path="/login" element={<Login title="Login"/>} />
            <Route path="/register" element={<Login title="Register"/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
  }
export default App
