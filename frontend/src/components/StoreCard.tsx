

import React from 'react';

const StoreCard = ({ store }: { store: any }) => {
    return (
        <div className="store-card">
            <h2>{store.name}</h2>
            <p>{store.description}</p>
            <p>{store.location}</p>

        </div>
    );
};

export default StoreCard;
