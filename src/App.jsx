import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './components/login/Login'
import Chat from './components/chat/Chat'
import VerPerfil from './components/profile/VerPerfil'
import EditarPerfil from './components/profile/EditarPerfil'
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/chat' element={<Chat />} />
        <Route path='/profile/:userId' element={<VerPerfil />} />
        <Route path='/edit-profile/:userId' element={<EditarPerfil />} />
      </Routes>
    </BrowserRouter>
  )
}
