// import { useState, useEffect,useMemo } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { Formik, Form, Field } from "formik";

// const ManagerDashboard = () => {
//   const [currentOrders, setCurrentOrders] = useState([]);
//   const [completedOrders, setCompletedOrders] = useState([]);
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [viewOrderDetails, setViewOrderDetails] = useState(null);
//   const [viewCompletedDetails, setViewCompletedDetails] = useState(null);
//   const [activeMenuItem, setActiveMenuItem] = useState('currentOrders');
//   const [damageTypes, setDamageTypes] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [scrappedOrders,setScrappedOrders]=useState(null);
//   const [stageFilter, setStageFilter] = useState("");
//   const [damageTypeFilter, setDamageTypeFilter] = useState("");

//   const menuItems = [
//     { name: 'Current Orders', id: 'currentOrders' },
//     { name: 'Completed Orders', id: 'completedOrders' },
//     { name: 'Add New Order', id: 'add' },
//     {name: 'Scrapped Orders',id:'scrappedOrders'}
//   ];
//   const navigate = useNavigate();
 

//   useEffect(() => {
//     const fetchOrders = async () => {
//       const currentOrdersResponse = await axios.get('http://localhost:5041/api/Orders/current');  
//       const completedOrdersResponse = await axios.get('http://localhost:5041/api/Orders/completed');
//       const scrappedOrdersResponse = await axios.get('http://localhost:5041/api/Orders/scraped');
//       setCurrentOrders(currentOrdersResponse.data);
//       setCompletedOrders(completedOrdersResponse.data);
//       setScrappedOrders(scrappedOrdersResponse.data);
//       console.log(currentOrdersResponse.data);

//     };

//     fetchOrders();
//   }, []);

//   const handleAddOrder = async (values) => {
//     const formData = new FormData();
//     formData.append('clientName', values.clientName);
//     formData.append('year', values.year);
//     formData.append('make', values.make);
//     formData.append('model', values.model);
//     formData.append('damageType', values.damageType);
//     formData.append('imageUrl', values.imageUrl); 
//     formData.append('notes', values.notes);
//     formData.append('status', values.status);
  
//     try {
//       await axios.post("http://localhost:5041/api/Orders", formData, {
//         headers: {
//           "Content-Type": 'multipart/form-data',
//         },
//       });
//       setShowAddModal(false);
//       alert("Form submitted successfully");
//     } catch (error) {
//       console.error('Error submitting form:', error);
//       alert('Failed to submit');
//     }
//   };

//   const handleLogout = () => {
//     navigate('/');
//   };

//   const fetchOrderDetails = async (orderId) => {
//     try {
//       const response = await axios.get(`http://localhost:5041/api/Orders/${orderId}`);
//       setSelectedOrder(response.data);  
//       setIsModalOpen(true);  
//     } catch (error) {
//       console.error('Error fetching order details:', error);
//       alert('Failed to fetch order details');
//     }
//   };
  
//   const fetchScrappedDetails = async (orderId) => {
//     try {
//       const response = await axios.get(`http://localhost:5041/api/Orders/scrapped/${orderId}`);
//       setSelectedOrder(response.data);  
//       setIsModalOpen(true);  
//     } catch (error) {
//       console.error('Error fetching order details:', error);
//       alert('Failed to fetch order details');
//     }
//   };



//   const fetchCompletedDetails = async (orderId) => {
//     try {
//       const FirstEndpoint = `http://localhost:5041/api/Orders/${orderId}`;
//       const secondEndpoint = `http://localhost:5041/api/task/soldering/${orderId}`;
//       const ThirdEndpoint = `http://localhost:5041/api/task/painting/${orderId}`;
//       const FourthEndpoint = `http://localhost:5041/api/Task/packaging/${orderId}`;
//       const taskResponse = await axios.get(FirstEndpoint);
//       let additionalData = null;
//       let additionalsecond=null;
//       let additionalthird=null;
//       try {
//         if (secondEndpoint) {
//           const additionalResponse = await axios.get(secondEndpoint);
//           additionalData = additionalResponse.data;
//         }
//         if (ThirdEndpoint) {
//           const SecondResponse = await axios.get(ThirdEndpoint);
//           additionalsecond = SecondResponse.data;
//         }
//         if (ThirdEndpoint) {
//           const ThirdResponse = await axios.get(FourthEndpoint);
//           additionalthird = ThirdResponse.data;
//         }
        
//       } catch (error) {
//         console.warn('Error fetching additional details, proceeding without additional data');
//       }
//       setViewCompletedDetails({ ...taskResponse.data, additionalData,additionalsecond,additionalthird });  
//       setIsModalOpen(true);
//     } catch (error) {
//       console.error('Error fetching completed order details:', error);
//       alert('Failed to fetch completed order details');
//     }
//   };
//   return (
//     <div className="flex h-screen bg-white-100 relative">
//       <div className="w-64 bg-teal-600 text-white">
//         <div className="flex items-center bg-gray-900 justify-center h-20 border-b border-gray-800">
//           <span className="text-xl font-semibold">ACTIVITY</span>
//         </div>
//         <nav className="mt-5">
//           {menuItems.map((item) => (
//             <a
//               key={item.id}
//               href="#"
//               className={`block px-6 py-2 mt-2 text-l font-semibold text-white-300 ${
//                 activeMenuItem === item.id ? 'bg-gray-800 text-white' : 'hover:bg-gray-800 hover:text-white'
//               }`}
//               onClick={() => {
//                 if (item.id === 'add') {
//                   setShowAddModal(true); 
//                 } else {
//                   setActiveMenuItem(item.id);
//                 }
//               }}
//             >
//               {item.name}
//             </a>
//           ))}
//         </nav>
//       </div>
//       <main className="flex-1 overflow-x-hidden overflow-y-auto bg-white-800">
//         <div>
//           <header className="flex justify-between items-center p-5  bg-gray-900 shadow-md border border-gray-200">
//             <div className="flex space-x-8">
//               <h1 className="flex items-center text-xl justify-between text-white pt-1 font-xs">
//                 MANAGER DASHBOARD
//               </h1>
//             </div>
//             <button
//               className="flex items-center justify-center px-4 py-2 rounded-md bg-red-500 hover:bg-red-600 text-white font-medium transition"
//               onClick={handleLogout}
//             >
//               LOGOUT
//             </button>
//           </header>
//           {activeMenuItem === 'currentOrders' && (
//             <CurrentOrders
//               currentOrders={currentOrders}
//               viewOrderDetails={fetchOrderDetails}
//               setViewOrderDetails={setViewOrderDetails}
//             />
//           )}

//           {activeMenuItem === 'completedOrders' && (
//             <CompletedOrders
//               completedOrders={completedOrders}
//               setViewOrderDetails={fetchCompletedDetails}
//             />
//           )}
//             {activeMenuItem === 'scrappedOrders' && (
//             <ScrappedOrdersTable
//               scrappedOrders={scrappedOrders}
//               setViewOrderDetails={fetchScrappedDetails}
//             />
//           )}

//           {isModalOpen && selectedOrder && (
//             <div
//               className="fixed inset-0 bg-black opacity-80 z-50"
//               onClick={() => setIsModalOpen(false)}
//             ></div>
//           )}
//           {isModalOpen && selectedOrder && (
//             <div className="fixed inset-0 flex items-center justify-center z-50">
//               <div className="bg-white p-6 rounded-lg shadow-xl w-1/2">
//                 <h2 className="text-2xl font-bold mb-4">Order Details</h2>
//                 <p><strong>Order ID:</strong> {selectedOrder.orderId}</p>
//                 <p><strong>Client Name:</strong> {selectedOrder.clientName}</p>
//                 <p><strong>Year:</strong> {selectedOrder.year}</p>
//                 <p><strong>Make:</strong> {selectedOrder.make}</p>
//                 <p><strong>Model:</strong> {selectedOrder.model}</p>
//                 <p><strong>Damage Type:</strong> {selectedOrder.damageType}</p>
//                 <p><strong>Status:</strong> {selectedOrder.status}</p>
//                 <p><strong>Notes:</strong> {selectedOrder.notes}</p>
//                 {selectedOrder.imageUrl && (
//                   <img src={selectedOrder.imageUrl} alt="Order Image" className="mt-1" style={{ maxWidth: '20%', height: 'auto' }}  />
//                 )}
//                 <div className="mt-6 flex justify-end space-x-4">
//                   <button
//                     className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
//                     onClick={() => setIsModalOpen(false)}
//                   >
//                     Close
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}
//           {isModalOpen && viewCompletedDetails && (
//             <div
//               className="fixed inset-0 bg-black opacity-80 z-50"
//               onClick={() => setIsModalOpen(false)}
//             ></div>
//           )}
//           {isModalOpen && viewCompletedDetails && (
//             <div className="fixed inset-0 flex items-center justify-center z-50">
//               <div className="bg-white p-6 rounded-lg shadow-xl w-1/2">
//                 <h2 className="text-2xl font-bold mb-4">Order Details</h2>
//                 <p><strong>Order ID:</strong> {viewCompletedDetails.orderId}</p>
//                 <p><strong>Year:</strong> {viewCompletedDetails.year}</p>
//                 <p><strong>Make:</strong> {viewCompletedDetails.make}</p>
//                 <p><strong>Model:</strong> {viewCompletedDetails.model}</p>
//                 <p><strong>Damage Type:</strong> {viewCompletedDetails.damageType}</p>
//                 {viewCompletedDetails.additionalData ? (
//             <div className="mb-4">
//               <p><strong>SandBlastingNotes</strong> {viewCompletedDetails.additionalData[0].notes}</p>
//               <p><strong>SandBlastingLevel:</strong> {viewCompletedDetails.additionalData[0].sandBlastingLevel}</p>
//              </div>
//           ) : (
//             <p>No additional details available.</p>
//           )}
//           {viewCompletedDetails.additionalsecond ? (
//             <div className="mb-4">
//               <p><strong>PaintingNotes</strong> {viewCompletedDetails.additionalsecond[0].notes}</p>
//               <p><strong>PaintColor</strong> {viewCompletedDetails.additionalsecond[0].pColor}</p>
//               <p><strong>PaintType</strong> {viewCompletedDetails.additionalsecond[0].pType}</p>
//               </div>
//           ):(<p> no data</p>)}
//            {viewCompletedDetails.additionalthird ? (
//             <div className="mb-4">
//               <p><strong>PackagingNotes</strong> {viewCompletedDetails.additionalthird[0].notes}</p>
//               <p><strong>Rating</strong> {viewCompletedDetails.additionalthird[0].iRating}</p>
//               </div>
//           ):(<p> no data</p>)}
//                 <div className="mt-6 flex justify-end space-x-4">
//                   <button
//                     className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
//                     onClick={() => setIsModalOpen(false)}
//                   >
//                     Close
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}

//           {showAddModal && (
//             <>
              
//   <div
//     className="fixed inset-0 bg-black opacity-80 z-50"
//     onClick={() => setShowAddModal(false)} 
//   ></div>
//   <div className="fixed inset-0 flex items-center justify-center z-50">
//     <div className="bg-white p-6 rounded-lg shadow-xl w-1/2">
//       <h2 className="text-2xl font-bold mb-4">Add New Order</h2>
//       <Formik
//         initialValues={{
//           clientName: "",
//           year: "",
//           make: "",
//           model: "",
//           damageType: "",
//           imageUrl: null, 
//           notes: "",
//           status: ""
//         }}
//         onSubmit={handleAddOrder}
//       >
      
//         {formik => (
//           <form className="mt-4 space-y-4" onSubmit={formik.handleSubmit}>
//             <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-8">
//               {/* Left Column */}
//               <div className="flex-1 space-y-4">
//                 {/* Client Name */}
//                 <div>
//                   <label className="text-lg font-bold text-black">Client Name:</label>
//                   <input
//                     type="text"
//                     name="clientName"
//                     className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
//                     value={formik.values.clientName}
//                     onChange={formik.handleChange}
//                   />
//                 </div>
//                 {/* Year */}
//                 <div>
//                   <label className="text-lg font-bold text-black">Year:</label>
//                   <input
//                     type="text"
//                     name="year"
//                     className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
//                     value={formik.values.year}
//                     onChange={formik.handleChange}
//                   />
//                 </div>

//                 {/* Make */}
//                 <div>
//                   <label className="text-lg font-bold text-black">Make:</label>
//                   <input
//                     type="text"
//                     name="make"
//                     className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
//                     value={formik.values.make}
//                     onChange={formik.handleChange}
//                   />
//                 </div>

//                 {/* Model */}
//                 <div>
//                   <label className="text-lg font-bold text-black">Model:</label>
//                   <input
//                     type="text"
//                     name="model"
//                     className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
//                     value={formik.values.model}
//                     onChange={formik.handleChange}
//                   />
//                 </div>
//                 </div>
//                 <div>

//                 Image Upload */
//                 <div>
//                   <label className="text-lg font-bold text-black">Image:</label>
//                   <input
//                     id="image"
//                     name="image"
//                     type="file"
//                     className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
//                     onChange={(event) => {
//                       formik.setFieldValue("imageUrl", event.currentTarget.files[0]);
//                     }}
//                   />
//                 </div>

//                 {/* Damage Type */}
//                 <div>
//                   <label className="text-lg font-bold text-black">Damage Type:</label>
//                   <textarea
//                     name="damageType"
//                     className="mt-1 block w-full p-2 border border-gray-300 rounded-md h-10"
//                     value={formik.values.damageType}
//                     onChange={formik.handleChange}
//                   ></textarea>
//                 </div>

//                 {/* Notes */}
//                 <div>
//                   <label className="text-lg font-bold text-black">Notes:</label>
//                   <textarea
//                     name="notes"
//                     className="mt-1 block w-full p-2 border border-gray-300 rounded-md h-10"
//                     value={formik.values.notes}
//                     onChange={formik.handleChange}
//                   ></textarea>
//                 </div>

//                 {/* Status */}
//                 <div>
//                   <label className="text-lg font-bold text-black">Status:</label>
//                   <textarea
//                     name="status"
//                     className="mt-1 block w-full p-2 border border-gray-300 rounded-md h-10"
//                     value={formik.values.status}
//                     onChange={formik.handleChange}
//                   ></textarea>
//                 </div>
//               </div>
//             </div>
//             <div className="mt-6 flex justify-end space-x-4">
//               <button
//                 type="submit"
//                 className="bg-red-500 text-white px-4 py-2 rounded hover:bg-teal-600"
//               >
//                 Add Order
//               </button>
//               <button
//                 type="button"
//                 className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
//                 onClick={() => setShowAddModal(false)}
//               >
//                 Cancel
//               </button>
//             </div>
//           </form>
//         )}
      
              
//       </Formik>
              
//     </div>
//   </div>
//   </>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// };
// const CurrentOrders = ({
//   currentOrders,
//   viewOrderDetails,
//   setViewOrderDetails
// }) => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [stageFilter, setStageFilter] = useState("");
//   const [damageTypeFilter, setDamageTypeFilter] = useState("");
//   const ordersPerPage = 10;

//   const filteredOrders = currentOrders.filter(order => 
//     (!stageFilter || order.status === stageFilter) &&
//     (!damageTypeFilter || order.damageType === damageTypeFilter)
//   );
  

//   const indexOfLastOrder = currentPage * ordersPerPage;
//   const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
//   const currentOrdersPage = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
//   const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

//   return (
//     <div className="overflow-x-auto bg-white shadow-md rounded-lg p-6 mt-8">
//       <h2 className="text-xl font-bold mb-4">Current Orders</h2>
//       <div className="mb-4 flex space-x-4">
        
//         <select
//           className="border p-2 rounded"
//           value={stageFilter}
//           onChange={(e) => setStageFilter(e.target.value)} 
//         >
//           <option value="">All Stages</option>
//           <option value="inventory">inventory</option>
//           <option value="soldering">soldering</option>
//           <option value="Painting">Painting</option>
//           <option value="packaging">packaging</option>
//         </select>
       
//         <select
//           className="border p-2 rounded"
//           value={damageTypeFilter}
//           onChange={() => setDamageTypeFilter(order.damageType)} 
//         >
//           <option value="">All Damage Types</option>
//           <option value="scraped">Scraped</option>
//           <option value="lipcrack">Lip Crack</option>
//           <option value="chipped">Chipped</option>
//           <option value="paintfade">Paint Fade</option>
//         </select>
//       </div>
//       {/* Orders Table */}
//       <table className="min-w-full divide-y divide-gray-900 table-auto w-full text-left border-collapse">
//         <thead>
//           <tr className="bg-gray-900">
//             <th className="px-6 py-3 text-left text-l font-bold text-white uppercase tracking-wider">
//               Order ID
//             </th>
//             <th className="px-6 py-3 text-left text-l font-bold text-white uppercase tracking-wider">
//               Stage
//             </th>
//             <th className="px-6 py-3 text-left text-l font-bold text-white uppercase tracking-wider">
//               DamageType
//             </th>
//             <th className="px-6 py-3 text-left text-l font-bold text-white uppercase tracking-wider">
//               Actions
//             </th>
//           </tr>
//         </thead>
//         <tbody className="bg-white divide-y divide-gray-500">
//           {currentOrdersPage.map((order) => (
//             <tr key={order.orderId}>
//               <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                 {order.orderId}
//               </td>
//               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-950">
//                 {order.status}
//               </td>
//               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-950">
//                 {order.damageType}
//               </td>
//               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-950">
//                 <button
//                   type="button"
//                   className="bg-green-500 text-white font-semibold px-4 py-2 rounded hover:bg-blue-400"
//                   onClick={() => viewOrderDetails(order.orderId)}
//                 >
//                   View Details
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       {/* Pagination */}
//       <div className="mt-4 flex justify-between items-center">
//         <button
//           onClick={() => setCurrentPage(currentPage - 1)}
//           disabled={currentPage === 1}
//           className="px-4 py-2 bg-teal-500 text-white rounded"
//         >
//           Previous
//         </button>
//         <span>
//           Page {currentPage} of {totalPages}
//         </span>
//         <button
//           onClick={() => setCurrentPage(currentPage + 1)}
//           disabled={currentPage === totalPages}
//           className="px-4 py-2 bg-teal-500 text-white rounded"
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { useToast } from '../../hooks/use-toast';
import { Toast} from "@/components/ui/toast"
import {  ChevronRight, ChevronLeft } from "@/components/icons"

const ManagerDashboard = () => {
  const [currentOrders, setCurrentOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [viewOrderDetails, setViewOrderDetails] = useState(null);
  const [viewCompletedDetails, setViewCompletedDetails] = useState(null);
  const [activeMenuItem, setActiveMenuItem] = useState('currentOrders');
  const [damageTypes, setDamageTypes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [scrappedOrders, setScrappedOrders] = useState(null);
  const [stageFilter, setStageFilter] = useState("");
  const [damageTypeFilter, setDamageTypeFilter] = useState("");
  const { toast } = useToast();

  const menuItems = [
    { name: 'Current Orders', id: 'currentOrders' },
    { name: 'Completed Orders', id: 'completedOrders' },
    { name: 'Add New Order', id: 'add' },
    { name: 'Scrapped Orders', id: 'scrappedOrders' }
  ];
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      const currentOrdersResponse = await axios.get('http://localhost:5041/api/Orders/current');  
      const completedOrdersResponse = await axios.get('http://localhost:5041/api/Orders/completed');
      const scrappedOrdersResponse = await axios.get('http://localhost:5041/api/Orders/scraped');
      setCurrentOrders(currentOrdersResponse.data);
      setCompletedOrders(completedOrdersResponse.data);
      setScrappedOrders(scrappedOrdersResponse.data);
    };

    fetchOrders();
  }, []);

  const handleAddOrder = async (values) => {
    const formData = new FormData();
    Object.keys(values).forEach(key => {
      formData.append(key, values[key]);
    });
  
    try {
      await axios.post("http://localhost:5041/api/Orders", formData, {
        headers: {
          "Content-Type": 'multipart/form-data',
        },
      });
      setShowAddModal(false);
      toast({
        title: "Success",
        description: "Form submitted successfully",
        duration: 3000,
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Error",
        description: "Failed to submit form",
        duration: 3000,
        variant: "destructive",
      });
    }
  };

  const handleLogout = () => {
    navigate('/');
  };

  const fetchOrderDetails = async (orderId) => {
    try {
      const response = await axios.get(`http://localhost:5041/api/Orders/${orderId}`);
      setSelectedOrder(response.data);  
      setIsModalOpen(true);  
    } catch (error) {
      console.error('Error fetching order details:', error);
      toast({
        title: "Error",
        description: "Failed to fetch order details",
        duration: 3000,
        variant: "destructive",
      });
    }
  };

  const fetchScrappedDetails = async (orderId) => {
    try {
      const response = await axios.get(`http://localhost:5041/api/Orders/scrapped/${orderId}`);
      setSelectedOrder(response.data);  
      setIsModalOpen(true);  
    } catch (error) {
      console.error('Error fetching order details:', error);
      toast({
        title: "Error",
        description: "Failed to fetch order details",
        duration: 3000,
        variant: "destructive",
      });
    }
  };

  const fetchCompletedDetails = async (orderId) => {
    try {
      const FirstEndpoint = `http://localhost:5041/api/Orders/${orderId}`;
      const secondEndpoint = `http://localhost:5041/api/task/soldering/${orderId}`;
      const ThirdEndpoint = `http://localhost:5041/api/task/painting/${orderId}`;
      const FourthEndpoint = `http://localhost:5041/api/Task/packaging/${orderId}`;
      const taskResponse = await axios.get(FirstEndpoint);
      let additionalData = null;
      let additionalsecond = null;
      let additionalthird = null;
      try {
        if (secondEndpoint) {
          const additionalResponse = await axios.get(secondEndpoint);
          additionalData = additionalResponse.data;
        }
        if (ThirdEndpoint) {
          const SecondResponse = await axios.get(ThirdEndpoint);
          additionalsecond = SecondResponse.data;
        }
        if (ThirdEndpoint) {
          const ThirdResponse = await axios.get(FourthEndpoint);
          additionalthird = ThirdResponse.data;
        }
      } catch (error) {
        console.warn('Error fetching additional details, proceeding without additional data');
      }
      setViewCompletedDetails({ ...taskResponse.data, additionalData, additionalsecond, additionalthird });  
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error fetching completed order details:', error);
      toast({
        title: "Error",
        description: "Failed to fetch completed order details",
        duration: 3000,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-64 bg-gray-800 text-white">
        <div className="flex items-center justify-center h-20 border-b border-gray-700">
          <span className="text-xl font-semibold">ACTIVITY</span>
        </div>
        <nav className="mt-5">
          {menuItems.map((item) => (
            <a
              key={item.id}
              href="#"
              className={`block px-6 py-2 mt-2 text-sm font-semibold text-gray-300 ${
                activeMenuItem === item.id ? 'bg-gray-700 text-white' : 'hover:bg-gray-700 hover:text-white'
              }`}
              onClick={() => {
                if (item.id === 'add') {
                  setShowAddModal(true); 
                } else {
                  setActiveMenuItem(item.id);
                }
              }}
            >
              {item.name}
            </a>
          ))}
        </nav>
        <div className="absolute bottom-0 left-0 w-64 p-4 bg-gray-900">
          <h3 className="text-lg font-semibold text-white">WHEEL FACTORY @C</h3>
        </div>
      </div>
      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
        <header className="bg-white shadow-md">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">MANAGER DASHBOARD</h1>
          </div>
        </header>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {activeMenuItem === 'currentOrders' && (
            <CurrentOrders
              currentOrders={currentOrders}
              viewOrderDetails={fetchOrderDetails}
              setViewOrderDetails={setViewOrderDetails}
              stageFilter={stageFilter}
              setStageFilter={setStageFilter}
              damageTypeFilter={damageTypeFilter}
              setDamageTypeFilter={setDamageTypeFilter}
            />
          )}
          {activeMenuItem === 'completedOrders' && (
            <CompletedOrders
              completedOrders={completedOrders}
              setViewOrderDetails={fetchCompletedDetails}
            />
          )}
          {activeMenuItem === 'scrappedOrders' && (
            <ScrappedOrdersTable
              scrappedOrders={scrappedOrders}
              setViewOrderDetails={fetchScrappedDetails}
            />
          )}
        </div>
      </main>

      {isModalOpen && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl">
            <h2 className="text-2xl font-bold mb-4">Order Details</h2>
            <div className="grid grid-cols-2 gap-4">
              <p><strong>Order ID:</strong> {selectedOrder.orderId}</p>
              <p><strong>Client Name:</strong> {selectedOrder.clientName}</p>
              <p><strong>Year:</strong> {selectedOrder.year}</p>
              <p><strong>Make:</strong> {selectedOrder.make}</p>
              <p><strong>Model:</strong> {selectedOrder.model}</p>
              <p><strong>Damage Type:</strong> {selectedOrder.damageType}</p>
              <p><strong>Status:</strong> {selectedOrder.status}</p>
              <p><strong>Notes:</strong> {selectedOrder.notes}</p>
            </div>
            {selectedOrder.imageUrl && (
              <img src={selectedOrder.imageUrl} alt="Order Image" className="mt-4 max-w-full h-auto" />
            )}
            <div className="mt-6 flex justify-end">
              <button
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                onClick={() => setIsModalOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl">
            <h2 className="text-2xl font-bold mb-4">Add New Order</h2>
            <Formik
              initialValues={{
                clientName: "",
                year: "",
                make: "",
                model: "",
                damageType: "",
                imageUrl: null, 
                notes: "",
                status: ""
              }}
              onSubmit={handleAddOrder}
            >
              {formik => (
                <Form className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Client Name</label>
                      <Field name="clientName" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Year</label>
                      <Field name="year" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Make</label>
                      <Field name="make" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Model</label>
                      <Field name="model" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Damage Type</label>
                      <Field name="damageType" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Status</label>
                      <Field name="status" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Notes</label>
                    <Field name="notes" as="textarea" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Image</label>
                    <input
                      id="image"
                      name="image"
                      type="file"
                      onChange={(event) => {
                        formik.setFieldValue("imageUrl", event.currentTarget.files[0]);
                      }}
                      className="mt-1 block w-full"
                    />
                  </div>
                  <div className="flex justify-end space-x-4">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Add Order
                    </button>
                    <button
                      type="button"
                      className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                      onClick={() => setShowAddModal(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}
      <Toast />
    </div>
  );
};

const CurrentOrders = ({
  currentOrders,
  viewOrderDetails,
  setViewOrderDetails,
  stageFilter,
  setStageFilter,
  damageTypeFilter,
  setDamageTypeFilter
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;

  const filteredOrders = currentOrders.filter(order => 
    (!stageFilter || order.status === stageFilter) &&
    (!damageTypeFilter || order.damageType === damageTypeFilter)
  );

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrdersPage = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h2 className="text-lg leading-6 font-medium text-gray-900">Current Orders</h2>
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="mt-3 sm:mt-0 sm:ml-4">
            <label htmlFor="stageFilter" className="sr-only">Filter by Stage</label>
            <select
              id="stageFilter"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              value={stageFilter}
              onChange={(e) => setStageFilter(e.target.value)}
            >
              <option value="">All Stages</option>
              <option value="inventory">Inventory</option>
              <option value="soldering">Soldering</option>
              <option value="Painting">Painting</option>
              <option value="packaging">Packaging</option>
            </select>
          </div>
          <div className="mt-3 sm:mt-0 sm:ml-4">
            <label htmlFor="damageTypeFilter" className="sr-only">Filter by Damage Type</label>
            <select
              id="damageTypeFilter"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              value={damageTypeFilter}
              onChange={(e) => setDamageTypeFilter(e.target.value)}
            >
              <option value="">All Damage Types</option>
              <option value="scraped">Scraped</option>
              <option value="lipcrack">Lip Crack</option>
              <option value="chipped">Chipped</option>
              <option value="paintfade">Paint Fade</option>
            </select>
          </div>
        </div>
        <div className="mt-8 flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Order ID
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Stage
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Damage Type
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {currentOrdersPage.map((order) => (
                      <tr key={order.orderId}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.orderId}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.status}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.damageType}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => viewOrderDetails(order.orderId)}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="flex-1 flex justify-between sm:hidden">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">{indexOfFirstOrder + 1}</span> to <span className="font-medium">{Math.min(indexOfLastOrder, filteredOrders.length)}</span> of{' '}
                <span className="font-medium">{filteredOrders.length}</span> results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <span className="sr-only">Previous</span>
                  <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                </button>
                {[...Array(totalPages).keys()].map((number) => (
                  <button
                    key={number + 1}
                    onClick={() => setCurrentPage(number + 1)}
                    className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                      currentPage === number + 1
                        ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                        : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    {number + 1}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <span className="sr-only">Next</span>
                  <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const CompletedOrders = ({
  completedOrders,
  viewCompletedDetails,
  setViewOrderDetails,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [dateFilter, setDateFilter] = useState("");
  const [searchOrderId, setSearchOrderId] = useState("");
  const ordersPerPage = 10;

  const filteredOrders = completedOrders.filter(order => 
    (!dateFilter || order.completionDate.includes(dateFilter)) &&
    (!searchOrderId || order.orderId.toString().includes(searchOrderId))
  );

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrdersPage = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="overflow-x-auto bg-white shadow-md rounded-lg p-6 mt-8">
      <h2 className="text-xl font-bold mb-4">Completed Orders</h2>
      <div className="mb-4 flex space-x-4">
        <input
          type="text"
          placeholder="Search by Order ID"
          className="border p-2 rounded"
          value={searchOrderId}
          onChange={(e) => setSearchOrderId(e.target.value)}
        />
        <input
          type="text"
          placeholder="Filter by Completion Date"
          className="border p-2 rounded"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
        />
      </div>
      <table className="min-w-full divide-y divide-gray-200 table-auto w-full text-left border-black">
        <thead>
          <tr className="bg-gray-900">
            <th className="px-6 py-3 text-left text-l font-bold text-white uppercase tracking-wider">
              Order ID
            </th>
            <th className="px-6 py-3 text-left text-l font-bold text-white uppercase tracking-wider">
              Completion Date
            </th>
            <th className="px-6 py-3 text-left text-l font-bold text-white uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-500">
          {currentOrdersPage.map((order) => (
            <tr key={order.orderId}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {order.orderId}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-950">
                {order.createdAt}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-950">
                <button
                  type="button"
                  className="bg-green-500 text-white font-semibold px-4 py-2 rounded hover:bg-blue-400"
                  onClick={() => setViewOrderDetails(order.orderId)}
                >
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 flex justify-between items-center">
        <button
          className="bg-gray-500 text-white font-semibold px-4 py-2 rounded hover:bg-gray-600"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="bg-gray-500 text-white font-semibold px-4 py-2 rounded hover:bg-gray-600"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};
const ScrappedOrdersTable = ({
  scrappedOrders,
  setViewScrappedDetails,
  setScrappedOrders,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [dateFilter, setDateFilter] = useState("");
  const [searchOrderId, setSearchOrderId] = useState("");
  const ordersPerPage = 10;

  const filteredOrders = scrappedOrders.filter(order =>
    (!dateFilter || order.scrapDate.includes(dateFilter)) &&
    (!searchOrderId || order.orderId.toString().includes(searchOrderId))
  );

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrdersPage = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (!scrappedOrders || scrappedOrders.length === 0) {
    return <p>No scrapped orders available.</p>;
  }

  return (
    <div className="overflow-x-auto bg-white shadow-md rounded-lg p-6 mt-8">
      <h2 className="text-xl font-bold mb-4">Scrapped Orders</h2>
      <div className="mb-4 flex space-x-4">
        <input
          type="text"
          placeholder="Search by Order ID"
          className="border p-2 rounded"
          value={searchOrderId}
          onChange={(e) => setSearchOrderId(e.target.value)}
        />
        <input
          type="text"
          placeholder="Filter by Scrap Date"
          className="border p-2 rounded"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
        />
      </div>
      <table className="min-w-full divide-y divide-gray-200 table-auto w-full text-left border-black">
        <thead>
          <tr className="bg-gray-900">
            <th className="px-6 py-3 text-left text-l font-bold text-white uppercase tracking-wider">
              Order ID
            </th>
            <th className="px-6 py-3 text-left text-l font-bold text-white uppercase tracking-wider">
             ClientName
            </th>
            <th className="px-6 py-3 text-left text-l font-bold text-white uppercase tracking-wider">
              Year
            </th>
            <th className="px-6 py-3 text-left text-l font-bold text-white uppercase tracking-wider">
              Make
            </th>
            <th className="px-6 py-3 text-left text-l font-bold text-white uppercase tracking-wider">
              Model
            </th>
            <th className="px-6 py-3 text-left text-l font-bold text-white uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-l font-bold text-white uppercase tracking-wider">
             DamageType
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-500">
          {currentOrdersPage.map((order) => (
            <tr key={order.orderId}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {order.orderId}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-950">
                {order.clientName}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-950">
                {order.year}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-950">
                {order.make}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-950">
                {order.model}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-950">
                {order.status}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-950">
                {order.damageType}
              </td>
              
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 flex justify-between items-center">
        <button
          className="bg-gray-500 text-white font-semibold px-4 py-2 rounded hover:bg-gray-600"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="bg-gray-500 text-white font-semibold px-4 py-2 rounded hover:bg-gray-600"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};



export default ManagerDashboard;

