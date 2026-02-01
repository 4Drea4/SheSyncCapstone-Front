import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';

function App() {

  return (
    <BrowserRouter>
      <Routes>

        <Route path='/' element={<Login />}/>
      </Routes>
      <Route path='/register' element={<Register/>}/>
    </BrowserRouter>
  )   
}

export default App
