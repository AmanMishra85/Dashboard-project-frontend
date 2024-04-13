import { useState } from 'react'
import './App.css'
import Barchart from './components/Barchart'
import Piechart from './components/Piechart'
import DashBoard from './DashBoard'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import ListOfData from './components/ListOfData'

function App() {
   return (
   <BrowserRouter>
      <Routes>
        <Route path='/' element={<DashBoard/>} />
        <Route path='/bar' element={<Barchart/>}/>
        <Route path='/pie' element={<Piechart/>} />
        <Route path='/table' element={<ListOfData/>}/>
      </Routes>
   </BrowserRouter>
  )
}

export default App
