import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";


const ManagerDashboard = () => {
const [currentOrders, setCurrentOrders] = useState([]);
const [completedOrders, setCompletedOrders] = useState([]);
const [showAddModal, setShowAddModal] = useState(false);
const [viewOrderDetails, setViewOrderDetails] = useState(null);
const [activeMenuItem, setActiveMenuItem] = useState('currentOrders');
const [damageTypes, setDamageTypes] = useState([]);

const menuItems = [
  { name: 'Current Orders', id: 'currentOrders' },
  { name: 'Completed Orders', id: 'completedOrders' },
  { name: 'Add New Order', id: 'addNewOrder' }
];

const navigate = useNavigate();

useEffect(() => {
  // Dummy API Calls (Replace with actual API)
  const fetchOrders = async () => {
    const currentOrdersResponse = await axios.get("http://localhost:3000/currentOrders");
    const completedOrdersResponse = await axios.get("http://localhost:3000/completedOrders");
    setCurrentOrders(currentOrdersResponse.data);
    setCompletedOrders(completedOrdersResponse.data);
  };

  const fetchDamageTypes = async () => {
    const response = await axios.get("https://dummyapi/damageTypes");
    setDamageTypes(response.data);
  };

  fetchOrders();
  fetchDamageTypes();
}, []);

const handleAddOrder = async (values) => {
  await axios.post("http://localhost:3000/wheels", values);
  alert("Order added successfully!");
  setShowAddModal(false);
};

const handleLogout = () => {
  navigate('/');
};

return (
  <div className="flex h-screen bg-white-100 relative">
    <div className="w-64 bg-teal-600 text-white">
      <div className="flex items-center bg-gray-900 justify-center h-20 border-b border-gray-800">
        <span className="text-xl font-semibold">ACTIVITY</span>
      </div>
      <nav className="mt-5">
        {menuItems.map((item) => (
          <a
            key={item.id}
            href="#"
            className={`block px-6 py-2 mt-2 text-l font-semibold text-white-300 ${
              activeMenuItem === item.id ? 'bg-gray-800 text-white' : 'hover:bg-gray-800 hover:text-white'
            }`}
            onClick={() => {
              if (item.id === 'addNewOrder') {
                setShowAddModal(true); // Open the modal
              } else {
                setActiveMenuItem(item.id);
              }
            }}
          >
            {item.name}
          </a>
        ))}
      </nav>
    </div>
    <main className="flex-1 overflow-x-hidden overflow-y-auto bg-white-800">
      <div>
        {/* Navbar */}
        <header className="flex justify-between items-center p-5  bg-gray-900 shadow-md border border-gray-200">
          <div className="flex space-x-8">
            <h1 className="flex items-center text-xl justify-between text-white pt-1 font-xs">
              MANAGER DASHBOARD
            </h1>
          </div>
          <button
            className="flex items-center justify-center px-4 py-2 rounded-md bg-red-500 hover:bg-red-600 text-white font-medium transition"
            onClick={handleLogout}
          >
            LOGOUT
          </button>
        </header>
        {activeMenuItem === 'currentOrders' && (
          <CurrentOrders
            currentOrders={currentOrders}
            viewOrderDetails={viewOrderDetails}
            setViewOrderDetails={setViewOrderDetails}
          />
        )}

        {activeMenuItem === 'completedOrders' && (
          <CompletedOrders
            completedOrders={completedOrders}
            setViewOrderDetails={setViewOrderDetails}
          />
        )}
      </div>
    </main>
    {showAddModal && (
      <>
        <div
          className="fixed inset-0 bg-black opacity-80 z-50"
          onClick={() => setShowAddModal(false)} 
        ></div>
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-1/2">
            <h2 className="text-2xl font-bold mb-4">Add New Order</h2>
            <Formik
              initialValues={{
                OrderId: "",
                year: "",
                make: "",
                model: "",
                damageType: "",
                notes: ""
              }}
              onSubmit={handleAddOrder}
            >
              <Form>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="OrderId" className="block font-bold">Order ID</label>
                    <Field name="OrderId" type="text" className="border p-2 rounded w-full" />
                  </div>
                  <div>
                    <label htmlFor="year" className="block font-bold">Year</label>
                    <Field name="year" type="text" className="border p-2 rounded w-full" />
                  </div>
                  <div>
                    <label htmlFor="make" className="block font-bold">Make</label>
                    <Field name="make" type="text" className="border p-2 rounded w-full" />
                  </div>
                  <div>
                    <label htmlFor="model" className="block font-bold">Model</label>
                    <Field name="model" type="text" className="border p-2 rounded w-full" />
                  </div>
                  <div>
                    <label htmlFor="damageType" className="block font-bold">Damage Type</label>
                    <Field as="select" name="damageType" className="border p-2 rounded w-full">
                      <option value="">Select Damage Type</option>
                      {damageTypes.map((type) => (
                        <option key={type.id} value={type.name}>
                          {type.name}
                        </option>
                      ))}
                    </Field>
                  </div>
                  <div>
                    <label htmlFor="notes" className="block font-bold">Notes</label>
                    <Field name="notes" as="textarea" className="border p-2 rounded w-full" />
                  </div>
                </div>
                <div className="mt-6 flex justify-end space-x-4">
                  <button
                    type="submit"
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-teal-600"
                  >
                    Add Order
                  </button>
                  <button
                    type="button"
                    className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
                    onClick={() => setShowAddModal(false)}
                  >
                    Cancel
                  </button>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </>
    )}
  </div>
);
};
const CurrentOrders = ({
currentOrders,
viewOrderDetails,
setViewOrderDetails
})  => {
const [currentPage, setCurrentPage] = useState(1);
const [stageFilter, setStageFilter] = useState("");
const [damageTypeFilter, setDamageTypeFilter] = useState("");
const ordersPerPage = 10;

const filteredOrders = currentOrders.filter(order => 
  (!stageFilter || order.stage === stageFilter) &&
  (!damageTypeFilter || order.DamageType === damageTypeFilter)
);

const indexOfLastOrder = currentPage * ordersPerPage;
const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
const currentOrdersPage = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);

const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

return (
  <div className="overflow-x-auto bg-white shadow-md rounded-lg p-6 mt-8">
    <h2 className="text-xl font-bold mb-4">Current Orders</h2>
    <div className="mb-4 flex space-x-4">
     <select
        className="border p-2 rounded"
        value={stageFilter}
        onChange={(e) => setStageFilter(e.target.value)}
      >
        <option value="">All Stages</option>
        <option value="inventory">Inventory</option>
        <option value="soldering">Soldering</option>
        <option value="painting">Painting</option>
        <option value="packaging">Packaging</option>
      </select>
      <select
        className="border p-2 rounded"
        value={damageTypeFilter}
        onChange={(e) => setDamageTypeFilter(e.target.value)}
      >
        <option value="">All Damage Types</option>
        <option value="scrapped">Scrapped</option>
        <option value="lipcrack">Lip Crack</option>
        <option value="chipped">Chipped</option>
        <option value="paintfade">Paint Fade</option>
      </select>
    </div>
    <table className="min-w-full divide-y divide-gray-900 table-auto w-full text-left border-collapse">
      <thead>
        <tr className="bg-gray-900">
        <th className="px-6 py-3 text-left text-l font-bold text-white uppercase tracking-wider">
            S No
          </th>
          <th className="px-6 py-3 text-left text-l font-bold text-white uppercase tracking-wider">
            Order ID
          </th>
          <th className="px-6 py-3 text-left text-l font-bold text-white uppercase tracking-wider">
            Stage
          </th>
          <th className="px-6 py-3 text-left text-l font-bold text-white uppercase tracking-wider">
            DamageType
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
              {order.Sno}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              {order.orderId}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-950">
              {order.stage}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-950">
              {order.DamageType}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-950">
            <button
                  type="button"
                  className="bg-green-500 text-white font-semibold px-4 py-2 rounded hover:bg-blue-400"
                onClick={() => setViewOrderDetails(order)}
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
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-teal-500 text-white rounded "
      >
        Previous
      </button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-teal-500 text-white rounded "
      >
        Next
      </button>
    </div>
  </div>
);
};

const CompletedOrders = ({
completedOrders,
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
    </div>
    <table className="min-w-full divide-y divide-gray-200 table-auto w-full text-left border-black">
      <thead>
        <tr className="bg-gray-900">
        <th className="px-6 py-3 text-left text-l font-bold text-white uppercase tracking-wider">
            S No
          </th>
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
              {order.Sno}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              {order.orderId}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-950">
              {order.completionDate}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-950">
            <button
                  type="button"
                  className="bg-green-500 text-white font-semibold px-4 py-2 rounded hover:bg-blue-400"
                onClick={() => setViewOrderDetails(order)}
              >
                View Details
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
)
}
export default ManagerDashboard;











































































































/* eslint-disable react/prop-types */

// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Formik, Field, Form } from "formik";
// import axios from "axios";

// const ManagerDashboard = () => {
//   const [currentOrders, setCurrentOrders] = useState([]);
//   const [completedOrders, setCompletedOrders] = useState([]);
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [viewOrderDetails, setViewOrderDetails] = useState(null);
//   const [isCompletedView, setIsCompletedView] = useState(false);
//   const [damageTypes, setDamageTypes] = useState([]);

//   const navigate = useNavigate();

//   useEffect(() => {
//     // Dummy API Calls (Replace these with actual API later)
//     const fetchOrders = async () => {
//       const currentOrdersResponse = await axios.get(
//         "http://dummyapi/currentOrders"
//       );
//       const completedOrdersResponse = await axios.get(
//         "http://dummyapi/completedOrders"
//       );
//       setCurrentOrders(currentOrdersResponse.data);
//       setCompletedOrders(completedOrdersResponse.data);
//     };

//     const fetchDamageTypes = async () => {
//       // Dummy API for damage types
//       const response = await axios.get("http://dummyapi/damageTypes");
//       setDamageTypes(response.data);
//     };

//     fetchOrders();
//     fetchDamageTypes();
//   }, []);

//   const handleAddOrder = async (values) => {
//     await axios.post("https://dummyapi/wheels", values);
//     alert("Order added successfully!");
//     setShowAddModal(false);
//   };

//   const handleLogout = () => {
//     navigate("/");
//   };

//   return (
//     <div className="p-4">
//       {/* Navbar */}
//       <header className="flex justify-between items-center p-5 rounded-md bg-gray-900 shadow-md border border-gray-200">
//         <div className="flex space-x-4">
//           <button
//             className="flex items-center justify-center px-4 py-2 rounded-md  bg-gray-700 hover:bg-gray-600 text-white font-medium"
//             onClick={() => setShowAddModal(true)}
//           >
//             ADD NEW ORDER
//           </button>
//           <h1 className="text-xl text-white pt-1 font-xs">
//             MANAGER DASHBOARD
//           </h1>
//         </div>
//         <button
//           className="flex items-center justify-center px-4 py-2 rounded-md bg-red-500 hover:bg-red-600 text-white font-medium transition"
//           onClick={handleLogout}
//         >
//           LOGOUT
//         </button>
//       </header>

//       {/* Buttons for Switching Views */}
//       <div className="pl-5 mt-4 flex space-x-4">
//         <button
//           className="bg-teal-500 text-white p-2 rounded shadow-md hover:bg-teal-700"
//           onClick={() => setIsCompletedView(false)}
//         >
//           Current Orders
//         </button>
//         <button
//           className="bg-teal-500 text-white p-2 rounded shadow-md hover:bg-teal-700"
//           onClick={() => setIsCompletedView(true)}
//         >
//           Completed Orders
//         </button>
//       </div>

//       {/* Order Table */}
//       {isCompletedView ? (
//         <CompletedOrders
//           completedOrders={completedOrders}
//           viewOrderDetails={viewOrderDetails}
//           setViewOrderDetails={setViewOrderDetails}
//         />
//       ) : (
//         <CurrentOrders
//           currentOrders={currentOrders}
//           viewOrderDetails={viewOrderDetails}
//           setViewOrderDetails={setViewOrderDetails}
//         />
//       )}

//       {/* Modal for Adding New Order */}
//       {showAddModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 backdrop-blur-sm">
//           <div className="bg-white p-8 rounded shadow-md w-2/3">
//             <h2 className="text-2xl font-bold mb-4">Add New Order</h2>
//             <Formik
//               initialValues={{
//                 clientName: "",
//                 year: "",
//                 make: "",
//                 model: "",
//                 damageType: "",
//                 notes: "",
//               }}
//               onSubmit={handleAddOrder}
//             >
//               <Form>
//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <label htmlFor="clientName" className="block font-bold">
//                       Client Name
//                     </label>
//                     <Field
//                       name="clientName"
//                       type="text"
//                       className="border p-2 rounded w-full"
//                     />
//                   </div>
//                   <div>
//                     <label htmlFor="year" className="block font-bold">
//                       Year
//                     </label>
//                     <Field
//                       name="year"
//                       type="text"
//                       className="border p-2 rounded w-full"
//                     />
//                   </div>
//                   <div>
//                     <label htmlFor="make" className="block font-bold">
//                       Make
//                     </label>
//                     <Field
//                       name="make"
//                       type="text"
//                       className="border p-2 rounded w-full"
//                     />
//                   </div>
//                   <div>
//                     <label htmlFor="model" className="block font-bold">
//                       Model
//                     </label>
//                     <Field
//                       name="model"
//                       type="text"
//                       className="border p-2 rounded w-full"
//                     />
//                   </div>
//                   <div>
//                     <label htmlFor="damageType" className="block font-bold">
//                       Damage Type
//                     </label>
//                     <Field
//                       as="select"
//                       name="damageType"
//                       className="border p-2 rounded w-full"
//                     >
//                       <option value="">Select Damage Type</option>
//                       {damageTypes.map((type) => (
//                         <option key={type.id} value={type.name}>
//                           {type.name}
//                         </option>
//                       ))}
//                     </Field>
//                   </div>
//                   <div>
//                     <label htmlFor="notes" className="block font-bold">
//                       Notes
//                     </label>
//                     <Field
//                       name="notes"
//                       as="textarea"
//                       className="border p-2 rounded w-full"
//                     />
//                   </div>
//                 </div>
//                 <div className="mt-6 flex justify-end space-x-4">
//                   <button
//                     type="submit"
//                     className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-700"
//                   >
//                     Add Order
//                   </button>
//                   <button
//                     type="button"
//                     className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-500"
//                     onClick={() => setShowAddModal(false)}
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </Form>
//             </Formik>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// const CurrentOrders = ({
//   currentOrders,
//   viewOrderDetails,
//   setViewOrderDetails,
// }) => {
//   return (
//     <div className="overflow-x-auto bg-white shadow-md rounded-lg p-6 mt-8">
//       <h2 className="text-xl  font-bold mb-4">Current Orders</h2>
//       <table className="min-w-full divide-y divide-gray-200 table-auto w-full text-left border-collapse">
//         <thead>
//           <tr>
//             <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Order ID
//             </th>
//             <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Stage
//             </th>
//             <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Worker
//             </th>
//             <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Actions
//             </th>
//           </tr>
//         </thead>
//         <tbody className="bg-white divide-y divide-gray-200">
//           {currentOrders.map((order) => (
//             <tr key={order.orderId}>
//               <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                 {order.orderId}
//               </td>
//               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                 {order.stage}
//               </td>
//               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                 {order.worker}
//               </td>
//               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                 <button
//                   className="text-teal-600 hover:text-teal-900"
//                   onClick={() => setViewOrderDetails(order)}
//                 >
//                   View Details
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// const CompletedOrders = ({
//   completedOrders,
//   viewOrderDetails,
//   setViewOrderDetails,
// }) => {
//   return (
//     <div className="overflow-x-auto bg-white shadow-md rounded-lg p-6 mt-8">
//       <h2 className="text-xl  font-bold mb-4">Completed Orders</h2>
//       <table className="min-w-full divide-y divide-gray-200 table-auto w-full text-left border-collapse">
//         <thead>
//           <tr>
//             <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Order ID
//             </th>
//             <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Completion Date
//             </th>
//             <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Actions
//             </th>
//           </tr>
//         </thead>
//         <tbody className="bg-white divide-y divide-gray-200">
//           {completedOrders.map((order) => (
//             <tr key={order.orderId}>
//               <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                 {order.orderId}
//               </td>
//               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                 {order.completionDate}
//               </td>
//               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                 <button
//                   className="text-teal-600 hover:text-teal-900"
//                   onClick={() => setViewOrderDetails(order)}
//                 >
//                   View Details
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ManagerDashboard;

// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Formik, Field, Form } from "formik";
// import axios from "axios";

// const ManagerDashboard = () => {
//   const [currentOrders, setCurrentOrders] = useState([]);
//   const [completedOrders, setCompletedOrders] = useState([]);
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [viewOrderDetails, setViewOrderDetails] = useState(null);
//   const [isCompletedView, setIsCompletedView] = useState(false);
//   const [damageTypes, setDamageTypes] = useState([]);

//   const navigate = useNavigate();

//   useEffect(() => {
//     // Dummy API Calls (Replace these with actual API later)
//     const fetchOrders = async () => {
//       const currentOrdersResponse = await axios.get(
//         "http://localhost:3000/currentOrders"
//       );
//       const completedOrdersResponse = await axios.get(
//         "http://localhost:3000/completedOrders"
//       );
//       setCurrentOrders(currentOrdersResponse.data);
//       setCompletedOrders(completedOrdersResponse.data);
//     };

//     const fetchDamageTypes = async () => {
//       // Dummy API for damage types
//       const response = await axios.get("https://dummyapi/damageTypes");
//       setDamageTypes(response.data);
//     };

//     fetchOrders();
//     fetchDamageTypes();
//   }, []);

//   const handleAddOrder = async (values) => {
//     await axios.post("https://dummyapi/wheels", values);
//     alert("Order added successfully!");
//     setShowAddModal(false);
//   };

//   const handleLogout = () => {
//     navigate("/");
//   };

//   return (
//     <div className="p-4">
//       {/* Navbar */}
//       <header className="flex justify-between items-center p-5 rounded-md bg-gray-900 shadow-md border border-gray-200">
//         <div className="flex space-x-4">
//           <button
//             className="flex items-center justify-center px-4 py-2 rounded-md  bg-gray-700 hover:bg-gray-600 text-white font-medium"
//             onClick={() => setShowAddModal(true)}
//           >
//             ADD NEW ORDER
//           </button>
//           <h1 className="text-xl text-white pt-1 font-xs">
//             MANAGER DASHBOARD
//           </h1>
//         </div>
//         <button
//           className="flex items-center justify-center px-4 py-2 rounded-md bg-red-500 hover:bg-red-600 text-white font-medium transition"
//           onClick={handleLogout}
//         >
//           LOGOUT
//         </button>
//       </header>

//       {/* Buttons for Switching Views */}
//       <div className="pl-5 mt-4 flex space-x-4">
//         <button
//           className="bg-teal-500 text-white p-2 rounded shadow-md hover:bg-teal-700"
//           onClick={() => setIsCompletedView(false)}
//         >
//           Current Orders
//         </button>
//         <button
//           className="bg-teal-500 text-white p-2 rounded shadow-md hover:bg-teal-700"
//           onClick={() => setIsCompletedView(true)}
//         >
//           Completed Orders
//         </button>
//       </div>

//       {/* Order Table */}
//       {isCompletedView ? (
//         <CompletedOrders
//           completedOrders={completedOrders}
//           viewOrderDetails={viewOrderDetails}
//           setViewOrderDetails={setViewOrderDetails}
//         />
//       ) : (
//         <CurrentOrders
//           currentOrders={currentOrders}
//           viewOrderDetails={viewOrderDetails}
//           setViewOrderDetails={setViewOrderDetails}
//         />
//       )}

//       {/* Modal for Adding New Order */}
//       {showAddModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 backdrop-blur-sm">
//           <div className="bg-white p-8 rounded shadow-md w-2/3">
//             <h2 className="text-2xl font-bold mb-4">Add New Order</h2>
//             <Formik
//               initialValues={{
//                 clientName: "",
//                 year: "",
//                 make: "",
//                 model: "",
//                 damageType: "",
//                 notes: "",
//               }}
//               onSubmit={handleAddOrder}
//             >
//               <Form>
//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <label htmlFor="clientName" className="block font-bold">
//                       Client Name
//                     </label>
//                     <Field
//                       name="clientName"
//                       type="text"
//                       className="border p-2 rounded w-full"
//                     />
//                   </div>
//                   <div>
//                     <label htmlFor="year" className="block font-bold">
//                       Year
//                     </label>
//                     <Field
//                       name="year"
//                       type="text"
//                       className="border p-2 rounded w-full"
//                     />
//                   </div>
//                   <div>
//                     <label htmlFor="make" className="block font-bold">
//                       Make
//                     </label>
//                     <Field
//                       name="make"
//                       type="text"
//                       className="border p-2 rounded w-full"
//                     />
//                   </div>
//                   <div>
//                     <label htmlFor="model" className="block font-bold">
//                       Model
//                     </label>
//                     <Field
//                       name="model"
//                       type="text"
//                       className="border p-2 rounded w-full"
//                     />
//                   </div>
//                   <div>
//                     <label htmlFor="damageType" className="block font-bold">
//                       Damage Type
//                     </label>
//                     <Field
//                       as="select"
//                       name="damageType"
//                       className="border p-2 rounded w-full"
//                     >
//                       <option value="">Select Damage Type</option>
//                       {damageTypes.map((type) => (
//                         <option key={type.id} value={type.name}>
//                           {type.name}
//                         </option>
//                       ))}
//                     </Field>
//                   </div>
//                   <div>
//                     <label htmlFor="notes" className="block font-bold">
//                       Notes
//                     </label>
//                     <Field
//                       name="notes"
//                       as="textarea"
//                       className="border p-2 rounded w-full"
//                     />
//                   </div>
//                 </div>
//                 <div className="mt-6 flex justify-end space-x-4">
//                   <button
//                     type="submit"
//                     className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-700"
//                   >
//                     Add Order
//                   </button>
//                   <button
//                     type="button"
//                     className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-500"
//                     onClick={() => setShowAddModal(false)}
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </Form>
//             </Formik>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// const CurrentOrders = ({
//   currentOrders,
//   //viewOrderDetails,
//   setViewOrderDetails,
// }) => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const ordersPerPage = 10;

//   const indexOfLastOrder = currentPage * ordersPerPage;
//   const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
//   const currentOrdersPage = currentOrders.slice(indexOfFirstOrder, indexOfLastOrder);

//   const totalPages = Math.ceil(currentOrders.length / ordersPerPage);

//   return (
//     <div className="overflow-x-auto bg-white shadow-md rounded-lg p-6 mt-8">
//       <h2 className="text-xl font-bold mb-4">Current Orders</h2>
//       <table className="min-w-full divide-y divide-gray-200 table-auto w-full text-left border-collapse">
//         <thead>
//           <tr>
//             <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Order ID
//             </th>
//             <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Stage
//             </th>
//             <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               DamageType
//             </th>
//             <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Actions
//             </th>
//           </tr>
//         </thead>
//         <tbody className="bg-white divide-y divide-gray-200">
//           {currentOrdersPage.map((order) => (
//             <tr key={order.orderId}>
//               <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                 {order.orderId}
//               </td>
//               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                 {order.stage}
//               </td>
//               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                 {order.DamageType}
//               </td>
//               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                 <button
//                   className="text-teal-600 hover:text-teal-900"
//                   onClick={() => setViewOrderDetails(order)}
//                 >
//                   View Details
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <div className="mt-4 flex justify-between items-center">
//         <button
//           onClick={() => setCurrentPage(currentPage - 1)}
//           disabled={currentPage === 1}
//           className="px-4 py-2 bg-teal-500 text-white rounded disabled:bg-gray-300"
//         >
//           Previous
//         </button>
//         <span>
//           Page {currentPage} of {totalPages}
//         </span>
//         <button
//           onClick={() => setCurrentPage(currentPage + 1)}
//           disabled={currentPage === totalPages}
//           className="px-4 py-2 bg-teal-500 text-white rounded disabled:bg-gray-300"
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// const CompletedOrders = ({
//   completedOrders,
//   //viewOrderDetails,
//   setViewOrderDetails,
// }) => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const ordersPerPage = 10;

//   const indexOfLastOrder = currentPage * ordersPerPage;
//   const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
//   const currentOrdersPage = completedOrders.slice(indexOfFirstOrder, indexOfLastOrder);

//   const totalPages = Math.ceil(completedOrders.length / ordersPerPage);

//   return (
//     <div className="overflow-x-auto bg-white shadow-md rounded-lg p-6 mt-8">
//       <h2 className="text-xl font-bold mb-4">Completed Orders</h2>
//       <table className="min-w-full divide-y divide-gray-200 table-auto w-full text-left border-collapse">
//         <thead>
//           <tr>
//             <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Order ID
//             </th>
//             <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Completion Date
//             </th>
//             <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Actions
//             </th>
//           </tr>
//         </thead>
//         <tbody className="bg-white divide-y divide-gray-200">
//           {currentOrdersPage.map((order) => (
//             <tr key={order.orderId}>
//               <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                 {order.orderId}
//               </td>
//               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                 {order.completionDate}
//               </td>
//               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                 <button
//                   className="text-teal-600 hover:text-teal-900"
//                   onClick={() => setViewOrderDetails(order)}
//                 >
//                   View Details
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <div className="mt-4 flex justify-between items-center">
//         <button
//           onClick={() => setCurrentPage(currentPage - 1)}
//           disabled={currentPage === 1}
//           className="px-4 py-2 bg-teal-500 text-white rounded disabled:bg-gray-300"
//         >
//           Previous
//         </button>
//         <span>
//           Page {currentPage} of {totalPages}
//         </span>
//         <button
//           onClick={() => setCurrentPage(currentPage + 1)}
//           disabled={currentPage === totalPages}
//           className="px-4 py-2 bg-teal-500 text-white rounded disabled:bg-gray-300"
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };
