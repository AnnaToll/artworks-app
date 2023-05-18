import React from 'react'
import './App.scss'
import Header from './components/header/Header'
import { BrowserRouter } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import BaseRoutes from './components/BaseRoutes'

function App (): JSX.Element {
  return (
    <BrowserRouter>
      <AppProvider>
        < Header />
        <BaseRoutes />
      </AppProvider>
    </BrowserRouter>
  )
}

export default App
