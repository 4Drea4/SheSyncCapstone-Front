import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Dashboard from './pages/Dashboard/Dashboard';
import { AuthProvider } from './context/AuthContext';
import Landing from './pages/Landing/Landing';

function App() {

  return (
    <AuthProvider>
    <BrowserRouter>
    
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path='/login' element={<Login />}/>
      <Route path='/landing' element={<Landing/>}/>
      <Route path='/register' element={<Register/>}/>

      <Route path='/dashboard' element={<Dashboard/>}/>
      
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  )   
}

export default App
