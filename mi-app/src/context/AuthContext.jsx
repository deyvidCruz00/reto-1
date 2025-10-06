import { createContext, useState, useContext } from 'react'
import { registerRequest, loginRequest } from '../api/auth'
import { set } from 'react-hook-form'

export const AuthContext = createContext()

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) throw new Error("There is no AuthProvider")
    return context
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [errors, setErrors] = useState([])

    const signUp = async (user) => {
        try {
            const res = await registerRequest(user);
            console.log(res.data);
            setUser(res.data)
            setIsAuthenticated(true)
        } catch (error) {
            console.error(error);
            setErrors(error.response.data);
        }
    }


    const signin = async (user) => {
        try {
            const res = await loginRequest(user);
            console.log(res.data);
            setUser(res.data);
            setIsAuthenticated(true);
        } catch (error) {
            console.log(error);
            // setErrors(error.response.data.message);
        }
    };

    return (
        <AuthContext.Provider value={{signUp, signin, user, isAuthenticated, errors }}>
            {children}
        </AuthContext.Provider>
    )
}