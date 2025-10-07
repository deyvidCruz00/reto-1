import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { ButtonLink } from "./ui/ButtonLink";
import { ChevronDown, LogOut } from "lucide-react";

export default function Navbar() {
    const { isAuthenticated, logout, user } = useAuth();
    const [customerDropdown, setCustomerDropdown] = useState(false);
    const [orderDropdown, setOrderDropdown] = useState(false);

    const toggleCustomer = () => {
        setCustomerDropdown(!customerDropdown);
        setOrderDropdown(false);
    };

    const toggleOrder = () => {
        setOrderDropdown(!orderDropdown);
        setCustomerDropdown(false);
    };

    return (
        <nav className="bg-zinc-800 text-white shadow-lg rounded-xl my-3 mx-auto max-w-6xl flex justify-between items-center py-4 px-8 transition-all duration-300">
            <h1 className="text-3xl font-bold tracking-wide hover:text-indigo-400 transition-colors">
                <Link to={isAuthenticated ? "/homeIn" : "/"}>Orders Manager</Link>
            </h1>

            <ul className="flex gap-x-4 items-center">
                {isAuthenticated ? (
                    <>
                        <li className="text-sm text-zinc-300">

                            <span className="font-semibold text-white">
                                {user.username}
                            </span>
                        </li>

                        {/* Dropdown Customer */}
                        <li className="relative">
                            <button
                                onClick={toggleCustomer}
                                className="flex items-center gap-1 bg-indigo-500 hover:bg-indigo-600 px-4 py-2 rounded-md font-medium transition-colors"
                            >
                                Customer <ChevronDown size={16} />
                            </button>
                            {customerDropdown && (
                                <ul className="absolute top-full left-0 mt-2 bg-zinc-900 border border-zinc-700 rounded-lg shadow-xl w-56 overflow-hidden animate-fadeIn z-10">
                                    <DropdownItem to="/addClient" onClick={() => setCustomerDropdown(false)}>
                                        ➕ Crear cliente
                                    </DropdownItem>
                                    <DropdownItem to="/findClientbyid" onClick={() => setCustomerDropdown(false)}>
                                        🔍 Buscar cliente por ID
                                    </DropdownItem>
                                    <DropdownItem to="/allClients" onClick={() => setCustomerDropdown(false)}>
                                        📋 Listar todos los clientes
                                    </DropdownItem>

                                </ul>
                            )}
                        </li>

                        {/* Dropdown Orders */}
                        <li className="relative">
                            <button
                                onClick={toggleOrder}
                                className="flex items-center gap-1 bg-indigo-500 hover:bg-indigo-600 px-4 py-2 rounded-md font-medium transition-colors"
                            >
                                Orders <ChevronDown size={16} />
                            </button>
                            {orderDropdown && (
                                <ul className="absolute top-full left-0 mt-2 bg-zinc-900 border border-zinc-700 rounded-lg shadow-xl w-64 overflow-hidden animate-fadeIn z-10">
                                    <DropdownItem to="/addOrder" onClick={() => setOrderDropdown(false)}>
                                        🛒 Crear pedido
                                    </DropdownItem>
                                    <DropdownItem to="/findorderbycustomerid" onClick={() => setOrderDropdown(false)}>
                                        🔎 Buscar pedido por ID de cliente
                                    </DropdownItem>
                                    <DropdownItem to="/allOrders" onClick={() => setOrderDropdown(false)}>
                                        📋 Listar todos los pedidos
                                    </DropdownItem>
                                </ul>
                            )}
                        </li>



                        <li>
                            <Link to="/" onClick={() => logout()} className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md font-medium transition-colors"> Logout </Link>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <ButtonLink to="/login">Login</ButtonLink>
                        </li>
                        <li>
                            <ButtonLink to="/register">Register</ButtonLink>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
}

/* Componente reutilizable para los items del dropdown */
function DropdownItem({ to, children, onClick }) {
    return (
        <li>
            <Link
                to={to}
                onClick={onClick}
                className="block px-4 py-2 text-sm hover:bg-zinc-800 hover:text-indigo-400 transition-colors"
            >
                {children}
            </Link>
        </li>
    );
}
