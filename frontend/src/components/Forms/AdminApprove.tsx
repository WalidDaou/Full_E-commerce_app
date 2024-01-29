// AdminApprove.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { homeURL } from '../../shared/constants';

interface Store {
    _id: string
    name: string
    approved: any
    description: string
    location: string
}


const AdminApprove: React.FC<{ _id: string }> = ({ _id }) => {
    const [stores, setStores] = useState<Store[]>([]);


    useEffect(() => {
        const fetchStores = async () => {
            try {
                const response = await fetch(homeURL + `/store/list`);
                if (!response.ok) {
                    throw new Error('Failed to fetch stores');
                }
                const storesData = await response.json();
                setStores(storesData);
            } catch (error) {
                console.error(error);
            }
        };

        fetchStores();
    }, []);



    const handleApprove = async (storeId: String) => {
        try {
            await axios.put(homeURL +`/stores/approve/${storeId}`); // Adjust the API endpoint
            // Optionally, you can update the local state to reflect the approval without making another API call
            setStores((prevStores) =>
                prevStores.map((store) =>
                    store._id === storeId ? { ...store, approved: true } : store
                )
            );
        } catch (error) {
            console.error('Error approving store:', error);
        }
    };

    const handleReject = (storeId: String) => {
        // Implement rejection logic if needed
        console.log('Rejected store with ID:', storeId);
    };

    // const handleReject = async (storeId: string) => {
    //     try {
    //       // Implement rejection logic if needed
    //       console.log('Rejected store with ID:', storeId);
    
    //       // Assuming there's an API endpoint for deleting a store
    //       await axios.delete(`/api/stores/${storeId}`);
    
    //       // Update the local state to remove the deleted store
    //       setStores((prevStores) =>
    //         prevStores.filter((store) => store._id !== storeId)
    //       );
    //     } catch (error) {
    //       console.error('Error rejecting store:', error);
    //     }
    //   };

    return (
        <div>
            <h1>Admin Approval Dashboard</h1>
            {stores.map((store) => (
                <div key={store._id} style={{ border: '1px solid #ddd', padding: '10px', margin: '10px' }}>
                    <h3>{store.name}</h3>
                    <p>Description: {store.description}</p>
                    <p>Location: {store.location}</p>
                    <p>Approved: {store.approved ? 'Yes' : 'No'}</p>
                    <button onClick={() => handleApprove(store._id)}>Approve</button>
                    <button onClick={() => handleReject(store._id)}>Reject</button>
                </div>
            ))}
        </div>
    );
};

export default AdminApprove;
