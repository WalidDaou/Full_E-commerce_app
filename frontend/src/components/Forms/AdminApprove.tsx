// // AdminApprove.js

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const AdminApprove = () => {
//   const [stores, setStores] = useState([]);

//   useEffect(() => {
//     // Fetch the list of stores when the component mounts
//     fetchStores();
//   }, []);

//   const fetchStores = async () => {
//     try {
//       const response = await axios.get('/api/stores/list'); // Adjust the API endpoint
//       setStores(response.data);
//     } catch (error) {
//       console.error('Error fetching stores:', error);
//     }
//   };

//   const handleApprove = async (storeId) => {
//     try {
//       await axios.put(`/api/stores/approve/${storeId}`); // Adjust the API endpoint
//       // Optionally, you can update the local state to reflect the approval without making another API call
//       setStores((prevStores) =>
//         prevStores.map((store) =>
//           store._id === storeId ? { ...store, approved: true } : store
//         )
//       );
//     } catch (error) {
//       console.error('Error approving store:', error);
//     }
//   };

//   const handleReject = (storeId) => {
//     // Implement rejection logic if needed
//     console.log('Rejected store with ID:', storeId);
//   };

//   return (
//     <div>
//       <h1>Admin Approval Dashboard</h1>
//       {stores.map((store) => (
//         <div key={store._id} style={{ border: '1px solid #ddd', padding: '10px', margin: '10px' }}>
//           <h3>{store.name}</h3>
//           <p>Description: {store.description}</p>
//           <p>Location: {store.location}</p>
//           <p>Approved: {store.approved ? 'Yes' : 'No'}</p>
//           <button onClick={() => handleApprove(store._id)}>Approve</button>
//           <button onClick={() => handleReject(store._id)}>Reject</button>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default AdminApprove;
