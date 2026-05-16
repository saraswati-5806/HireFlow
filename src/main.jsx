import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// MAKE SURE THIS LINE IS PRESENT SO THE TOASTS ACTUALLY LOOK LIKE POPUPS:
import 'react-toastify/dist/ReactToastify.css'; 
import { ToastContainer } from 'react-toastify';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    {/* This makes sure the popups have a place to render globally */}
    <ToastContainer position="top-right" autoClose={3000} /> 
  </React.StrictMode>,
)