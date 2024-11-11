import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import {NavigationProvider} from './components/NavigationContext'
import { SelectNetwork } from './components/SelectNetwork.jsx'
import { SeedPhrase } from './components/SeedPhrase.jsx'
import { ImportWallet } from './components/ImportWallet.jsx'
import {Start} from './components/Start.jsx'
import {Landing} from './components/Landing.jsx'
import './App.css'

function App() {
  return(
  <BrowserRouter>
      <NavigationProvider>
        <Routes>
            <Route path ='/' element = {<Start/>}/>
            <Route path ='/select' element = {<SelectNetwork/>}/>
            <Route path ='/create/seed' element = {<SeedPhrase/>}/>
            <Route path ='/import' element = {<ImportWallet/>}/>
            <Route path ='/landing' element = {<Landing/>}/>
        </Routes>
      </NavigationProvider>
  </BrowserRouter>
  )
}

export default App
