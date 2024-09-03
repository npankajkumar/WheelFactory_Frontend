import { useState } from 'react'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Inventory from './pages/inventory/Inventory'
import Home from './pages/navbar/Home'
function App() {
  return (
    <>
     <Router>
      <Routes>
      <Route path='/inventory' element={<Inventory/>}/>
      <Route path='' element={<Home/>}/>
      </Routes>
     </Router>
   </>
  )
}

export default App
