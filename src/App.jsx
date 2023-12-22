import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

import Home from './Pages/Home/Home';
import Register from './Pages/Register/Register';
import Tarefas from './Pages/Tarefas/Tarefas';
import Private from './Private';

const App = () => {
  return (
    <BrowserRouter>
    
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/tarefas' element={<Private> <Tarefas/> </Private>}/>
    </Routes>
    
    <ToastContainer/>
    
    </BrowserRouter>
  )
}

export default App