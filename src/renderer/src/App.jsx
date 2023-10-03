import Login from './components/Login'
import React from 'react'
import Home from './components/Home/Home'
import { BrowserRouter,Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import './assets/Styles/NavBar.css'
import './assets/Styles/SideBar.css'
import '@fontsource/montserrat'
import { createTheme,ThemeProvider } from '@mui/material/styles';
const theme = createTheme({
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          
        }
      }
    }
  }
});
function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
       <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />}/>
          </Route>
          <Route path="/login" element={<Login title="Login"/>} />
          <Route path="/register" element={<Login title="Register"/>} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
  }
export default App
