import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Inventory from './pages/inventory/Inventory'
import Home from './pages/navbar/Home'
import Soldering from './pages/soldering/Soldering';
import Packaging from './pages/packaging/Packaging';
import Painting from './pages/painting/Painting';
import { Login } from './pages/login/Login';
import Worker from './pages/worker/Worker';
import ManagerDashboard from './pages/manager/Manager';
function App() {
  return (
    <>
     <Router>
      <Routes>
      <Route path='/inventory' element={<Inventory/>}/>
      <Route path='' element={<Home/>}/>
      <Route path='/workers/:userId' element={<Worker/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/soldering' element={<Soldering/>}/>
      <Route path="/manager" element={<ManagerDashboard />} />
      <Route path='/packaging' element={<Packaging/>}/>
      <Route path='/painting' element={<Painting/>}/>
      </Routes>
     </Router>
   </>
  )
}

export default App
