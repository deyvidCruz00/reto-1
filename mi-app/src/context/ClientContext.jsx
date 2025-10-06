import { createContext, useContext, useState } from "react";
import {
    createClientRequest,
    getClientsRequest,
    updateClientRequest,
} from "../api/client";

const ClientContext = createContext();

export const useClients = () => {
    const context = useContext(ClientContext);
    if (!context) throw new Error("useClients must be used within a ClientProvider");
    return context;
};

export function ClientProvider({ children }) {
    const [clients, setClients] = useState([]);

    const getClients = async () => {
        try {
            const res = await getClientsRequest();
            setClients(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    const createClient = async (client) => {
        try {
            const res = await createClientRequest(client);
            console.log(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    const updateClient = async (id, client) => {
        try {
            await updateClientRequest(id, client);
        } catch (error) {
            console.error(error);
        }
    };

    const deleteClient = async (id) => {
        try {
            const res = await deleteClientRequest(id);
            if (res.status === 204)
                setClients(clients.filter((client) => client._id !== id));
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <ClientContext.Provider
            value={{
                clients,
                getClients,
                createClient,
                updateClient,
                deleteClient,
            }}
        >
            {children}
        </ClientContext.Provider>
    );
}
