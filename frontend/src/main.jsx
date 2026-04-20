import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx' 

// finds the <div id="root"> index.html
// and renders entire app component inside of it.
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)