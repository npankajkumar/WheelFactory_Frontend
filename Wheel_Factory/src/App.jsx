import { useState } from 'react'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Inventory from './pages/inventory/Inventory'
import Home from './pages/navbar/Home'
import Soldering from './pages/soldering/Soldering';
import Packaging from './pages/packaging/Packaging';
import Painting from './pages/painting/Painting';
function App() {
  return (
    <>
     <Router>
      <Routes>
      <Route path='/inventory' element={<Inventory/>}/>
      <Route path='' element={<Home/>}/>
      <Route path='/soldering' element={<Soldering/>}/>
      <Route path='/packaging' element={<Packaging/>}/>
      
      <Route path='/painting' element={<Painting/>}/>
      </Routes>
     </Router>
   </>
  )
}

export default App
