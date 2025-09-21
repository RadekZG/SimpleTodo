import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './style.css'
import Login from './Login.jsx'  // <-- use Login here

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Login />
  </StrictMode>,
)