// import { useEffect, useState } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import axios from 'axios';

// const Inventory = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [orderData, setOrderData] = useState(null);
//   const orderId = location.state?.orderId;

//   useEffect(() => {
//     if (orderId) {
//       axios.get(`http://localhost:5041/api/Orders/${orderId}`)
//         .then(response => {
//           console.log("API Response:", response.data);
//           setOrderData(response.data); 

//         })
//         .catch(error => console.error("Error fetching data:", error));
//     }
//   }, [orderId]);

//   // const handleSubmit = async () => {
//   //   const requestBody = {
//   //     clientName: orderData?.clientName || '',
//   //     year: orderData?.year || '',
//   //     make: orderData?.make || '',
//   //     model: orderData?.model || '',
//   //     damageType: orderData?.damageType || '',
//   //     imageUrl: orderData?.imageUrl || '',
//   //     notes: orderData?.notes || '',
//   //     status: orderData?.status || ''
//   //   };
//   //   try {
//   //     await axios.put(`http://localhost:5041/api/Orders/Inventory/${orderId}`, requestBody, {
//   //       headers: {
//   //         'Content-Type': 'multipart/form-data',
//   //       },
//   //     });
//   //     alert('Order submitted successfully!');
//   //   } catch (error) {
//   //     console.error('Error submitting form', error);
//   //     alert('Error submitting form');
//   //   }
//   // };
//   const handleSubmit = async () => {
//     const formData = new FormData();
//     formData.append('clientName', orderData?.clientName || '');
//     formData.append('year', orderData?.year || '');
//     formData.append('make', orderData?.make || '');
//     formData.append('model', orderData?.model || '');
//     formData.append('damageType', orderData?.damageType || '');
//     formData.append('imageUrl', orderData?.imageUrl || ''); 
//     formData.append('notes', orderData?.notes || '');
//     formData.append('status', orderData?.status || '');
  
//     try {
//       await axios.put(`http://localhost:5041/api/Orders/Inventory/${orderId}`, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
     
//       alert('Order submitted successfully!');
//     } catch (error) {
//       console.error('Error submitting form', error);
//       alert('Error submitting form');
//     }
//   };
  
  
//   const handleScrap = async () => {
//     const requestBody = {
//       clientName: orderData?.clientName || '',
//       year: orderData?.year || '',
//       make: orderData?.make || '',
//       model: orderData?.model || '',
//       damageType: orderData?.damageType || '',
//       notes: orderData?.notes || '',
//       imageUrl: null,
//       status: orderData?.status || ''
//     };
//     try {
//       await axios.put(`http://localhost:5041/api/Orders/scrap/${orderId}`,requestBody,{
//         headers:
//         {
//           'Content-Type':'application/json'
//         },
//       });
//       alert('Order marked as scrap successfully!');
//     } catch (error) {
//       console.error('Error marking order as scrap', error);
//       alert('Error marking order as scrap');
//     }
//   };

//   return (
//     <div className="p-4">
//       <header className="flex justify-between items-center p-5 rounded-md bg-black shadow-md border border-gray-200">
//         <div className="flex space-x-4">
//           <button
//             className="border border-gray-300 font-bold text-white p-2 rounded-md shadow-sm hover:bg-gray-200 hover:text-black transition"
//             onClick={() => navigate('/workers/:userId')}
//           >
//             PREVIOUS
//           </button>
//           <h1 className="text-xl text-white pt-1 font-bold">LEVEL-1 INVENTORY MANAGEMENT</h1>
//         </div>
//         <button
//           className="border border-red-400 hover:text-black p-2 rounded-md shadow-sm font-bold text-red-500 hover:bg-red-600 transition"
//           onClick={() => navigate('/')}
//         >
//           LOGOUT
//         </button>
//       </header>
//       <div className="mt-4 space-y-4">
//         <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-8">
//           <div className="flex-1 space-y-4">
//             <div>
//               <h2 className="text-lg font-bold text-black">Order Id:</h2>
//               <p className="mt-1 text-gray-700">{orderData?.orderId || 'N/A'}</p>
//             </div>
//             <div>
//               <h2 className="text-lg font-bold text-black">Client Name:</h2>
//               <p className="mt-1 text-gray-700">{orderData?.clientName || 'N/A'}</p>
//             </div>
//             <div>
//               <h2 className="text-lg font-bold text-black">Year:</h2>
//               <p className="mt-1 text-gray-700">{orderData?.year || 'N/A'}</p>
//             </div>
//             <div>
//               <h2 className="text-lg font-bold text-black">Make:</h2>
//               <p className="mt-1 text-gray-700">{orderData?.make || 'N/A'}</p>
//             </div>
//             <div>
//               <h2 className="text-lg font-bold text-black">Model:</h2>
//               <p className="mt-1 text-gray-700">{orderData?.model || 'N/A'}</p>
//             </div>
//           </div>
//           <div className="flex-1 space-y-4">
//             <div>
//               <h2 className="text-lg font-bold text-black">Status:</h2>
//               <p className="mt-1 text-gray-700">{orderData?.status || 'N/A'}</p>
//             </div>
//             <div>
//               <h2 className="text-lg font-bold text-black">Damage Type:</h2>
//               <p className="mt-1 text-gray-700">{orderData?.damageType || 'N/A'}</p>
//             </div>
//             <div>
//               <h2 className="text-lg font-bold text-black">Notes:</h2>
//               <p className="mt-1 text-gray-700">{orderData?.notes || 'N/A'}</p>
//             </div>
//                       <div>
//             <h2 className="text-lg font-bold text-black">Image:</h2>
//               <img src={orderData?.imageUrl}
//               className="mt-1" style={{ maxWidth: '10%', height: 'auto' }} />
            
           
//           </div>
//           </div>
//         </div>
//       </div>
//       <div className="flex justify-center space-x-4 mt-4">
//         <button
//           className="border-2 border-red-500 text-black font-bold px-4 py-2 rounded hover:bg-red-500 hover:text-black transition ease-in-out duration-300"
//           onClick={handleSubmit}
//         >
//           Submit
//         </button>
//         <button
//           className="border-2 border-red-500 text-black font-bold px-4 py-2 rounded hover:bg-red-500 hover:text-black transition ease-in-out duration-300"
//           onClick={handleScrap}
//         >
//           Scrap
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Inventory;
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const Inventory = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [orderData, setOrderData] = useState(null);
  const [error, setError] = useState(null);
  const orderId = location.state?.orderId;

  useEffect(() => {
    if (orderId) {
      const fetchOrderData = async () => {
        try {
          const token = localStorage.getItem('authorization');
          if (!token) {
            throw new Error('Authorization token not found');
          }
          const response = await axios.get(`http://localhost:5041/api/Orders/${orderId}`, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          });
          setOrderData(response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
          setError('Failed to load order data. Please try again later.');
        }
      };

      fetchOrderData();
    }
  }, [orderId]);

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('clientName', orderData?.clientName || '');
    formData.append('year', orderData?.year || '');
    formData.append('make', orderData?.make || '');
    formData.append('model', orderData?.model || '');
    formData.append('damageType', orderData?.damageType || '');
    formData.append('imageUrl', orderData?.imageUrl || '');
    formData.append('notes', orderData?.notes || '');
    formData.append('status', orderData?.status || '');

    try {
      const token = localStorage.getItem('authorization');
      if (!token) {
        throw new Error('Authorization token not found');
      }
      await axios.put(`http://localhost:5041/api/Orders/Inventory/${orderId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Order submitted successfully!');
    } catch (error) {
      console.error('Error submitting form', error);
      alert('Error submitting form');
    }
  };

  const handleScrap = async () => {
    const requestBody = {
      clientName: orderData?.clientName || '',
      year: orderData?.year || '',
      make: orderData?.make || '',
      model: orderData?.model || '',
      damageType: orderData?.damageType || '',
      notes: orderData?.notes || '',
      imageUrl: null,
      status: orderData?.status || '',
    };

    try {
      const token = localStorage.getItem('authorization');
      if (!token) {
        throw new Error('Authorization token not found');
      }
      await axios.put(`http://localhost:5041/api/Orders/scrap/${orderId}`, requestBody, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Order marked as scrap successfully!');
    } catch (error) {
      console.error('Error marking order as scrap', error);
      alert('Error marking order as scrap');
    }
  };

  return (
    <div className="p-4">
      <header className="flex justify-between items-center p-5 rounded-md bg-black shadow-md border border-gray-200">
        <div className="flex space-x-4">
          <button
            className="border border-gray-300 font-bold text-white p-2 rounded-md shadow-sm hover:bg-gray-200 hover:text-black transition"
            onClick={() => navigate('/workers/:userId')}
          >
            PREVIOUS
          </button>
          <h1 className="text-xl text-white pt-1 font-bold">LEVEL-1 INVENTORY MANAGEMENT</h1>
        </div>
        <button
          className="border border-red-400 hover:text-black p-2 rounded-md shadow-sm font-bold text-red-500 hover:bg-red-600 transition"
          onClick={() => navigate('/')}
        >
          LOGOUT
        </button>
      </header>
      <div className="mt-4 space-y-4">
        <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-8">
          <div className="flex-1 space-y-4">
            <div>
              <h2 className="text-lg font-bold text-black">Order Id:</h2>
              <p className="mt-1 text-gray-700">{orderData?.orderId || 'N/A'}</p>
            </div>
            <div>
              <h2 className="text-lg font-bold text-black">Client Name:</h2>
              <p className="mt-1 text-gray-700">{orderData?.clientName || 'N/A'}</p>
            </div>
            <div>
              <h2 className="text-lg font-bold text-black">Year:</h2>
              <p className="mt-1 text-gray-700">{orderData?.year || 'N/A'}</p>
            </div>
            <div>
              <h2 className="text-lg font-bold text-black">Make:</h2>
              <p className="mt-1 text-gray-700">{orderData?.make || 'N/A'}</p>
            </div>
            <div>
              <h2 className="text-lg font-bold text-black">Model:</h2>
              <p className="mt-1 text-gray-700">{orderData?.model || 'N/A'}</p>
            </div>
          </div>
          <div className="flex-1 space-y-4">
            <div>
              <h2 className="text-lg font-bold text-black">Status:</h2>
              <p className="mt-1 text-gray-700">{orderData?.status || 'N/A'}</p>
            </div>
            <div>
              <h2 className="text-lg font-bold text-black">Damage Type:</h2>
              <p className="mt-1 text-gray-700">{orderData?.damageType || 'N/A'}</p>
            </div>
            <div>
              <h2 className="text-lg font-bold text-black">Notes:</h2>
              <p className="mt-1 text-gray-700">{orderData?.notes || 'N/A'}</p>
            </div>
            <div>
              <h2 className="text-lg font-bold text-black">Image:</h2>
              <img src={orderData?.imageUrl}
                className="mt-1" style={{ maxWidth: '10%', height: 'auto' }} />
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center space-x-4 mt-4">
        <button
          className="border-2 border-red-500 text-black font-bold px-4 py-2 rounded hover:bg-red-500 hover:text-black transition ease-in-out duration-300"
          onClick={handleSubmit}
        >
          Submit
        </button>
        <button
          className="border-2 border-red-500 text-black font-bold px-4 py-2 rounded hover:bg-red-500 hover:text-black transition ease-in-out duration-300"
          onClick={handleScrap}
        >
          Scrap
        </button>
      </div>
    </div>
  );
};

export default Inventory;
