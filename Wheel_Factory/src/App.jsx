import { useState } from 'react'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Inventory from './pages/inventory/Inventory'
import Home from './pages/navbar/Home'
import Soldering from './pages/soldering/Soldering';
function App() {
  return (
    <>
     <Router>
      <Routes>
      <Route path='/inventory' element={<Inventory/>}/>
      <Route path='' element={<Home/>}/>
      <Route path='/soldering' element={<Soldering/>}/>
      </Routes>
     </Router>
   </>
  )
}

export default App
