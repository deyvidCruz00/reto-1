import { use, useEffect } from 'react';
import { useClients } from '../context/ClientContext';

function AllClients() {
    const { clients, getClients } = useClients();

    useEffect(() => {
        getClients();
    }, []);

    return (
        <div>
            {
            clients.map(
                client => (
                    <div key={client._id}>
                        <h2>{client.firstname} {client.lastname}</h2>
                        <p>{client.email}</p>
                    </div>
                )
            )
            
            }
        </div>
    )
}

export default AllClients