import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'

import ProtectedRoute from './ProtectedRoute'

import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import AddClient from './pages/addClient'
import { ClientProvider } from './context/ClientContext'


export default function App() {
  return (
    <AuthProvider>
      <ClientProvider>

        <BrowserRouter>
          <Routes>
            <Route path='/' element={<h1>Hola Mundo pag1</h1>} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/addClient' element={<AddClient />} />


          </Routes>
        </BrowserRouter>
      </ClientProvider>
    </AuthProvider>
  )
}
