// StoresList.jsx

import React, { useState, useEffect } from 'react';
import StoreCard from './StoreCard';
import { homeURL } from '../shared/constants';

const StoresList = () => {
    const [stores, setStores] = useState([]);

    useEffect(() => {
        const fetchStores = async () => {
            try {
                const response = await fetch(homeURL + '/store/list');
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

    return (
        <div>
            <h1>Stores List</h1>
            {stores.map((store: any) => (
                <StoreCard key={store._id} store={store} />
            ))}
        </div>
    );
};

export default StoresList;
