import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'

import ProtectedRoute from './ProtectedRoute'

import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import AddClient from './pages/addClient'
import AllClients from './pages/AllClients'
import { ClientProvider } from './context/ClientContext'
import Navbar from './components/navbar'
import FindClientById from "./pages/FindClientById";


export default function App() {
  return (
    <AuthProvider>
      <ClientProvider>

        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path='/' element={<h1>Hola Mundo pag1</h1>} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/addClient' element={<AddClient />} />
            <Route path='/allClients' element={<AllClients />} />

            <Route path='/addClient/:id' element={<AddClient />} />
            <Route path="/findClientbyid" element={<FindClientById />} />


          </Routes>
        </BrowserRouter>
      </ClientProvider>
    </AuthProvider>
  )
}
