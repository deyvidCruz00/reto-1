import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { ClientProvider } from './context/ClientContext'
import { OrderProvider } from './context/OrderContext'
import ProtectedRoute from './ProtectedRoute'

import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import AddClient from './pages/addClient'
import AllClients from './pages/AllClients'
import FindClientById from "./pages/FindClientById";
import AddOrder from './pages/AddOrder'

import Navbar from './components/navbar'



export default function App() {
  return (
    <AuthProvider>
      <ClientProvider>
        <OrderProvider>
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
              <Route path="/addOrder" element={<AddOrder />} />


            </Routes>
          </BrowserRouter>
        </OrderProvider>
      </ClientProvider>
    </AuthProvider>
  )
}
