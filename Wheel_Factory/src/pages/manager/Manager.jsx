// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Formik, Field, Form } from "formik";
// import axios from "axios";

// const ManagerDashboard = () => {
//   const [currentOrders, setCurrentOrders] = useState([]);
//   const [completedOrders, setCompletedOrders] = useState([]);
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [viewOrderDetails, setViewOrderDetails] = useState(null);
//   const [isCompletedView, setIsCompletedView] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Dummy API Calls (Replace these with actual API later)
//     const fetchOrders = async () => {
//       const currentOrdersResponse = await axios.get(
//         "https://dummyapi/currentOrders"
//       );
//       const completedOrdersResponse = await axios.get(
//         "https://dummyapi/completedOrders"
//       );

//       setCurrentOrders(currentOrdersResponse.data);
//       setCompletedOrders(completedOrdersResponse.data);
//     };

//     fetchOrders();
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
//         <div className="flex  space-x-4">
//           <button
//             className="flex items-center justify-center px-4 py-2 rounded-md bg-gray-700 hover:bg-gray-600 text-white font-medium"
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
//       <div className="mt-4 flex space-x-4">
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
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//           <div className="bg-white p-8 rounded shadow-md w-1/2">
//             <h2 className="text-2xl font-bold mb-4">Add New Order</h2>
//             <Formik
//               initialValues={{ orderId: "", stage: "", worker: "",make:" ",model:"",year:"",damagetype:"",notes:"" }}
//               onSubmit={handleAddOrder}
//             >
//               <Form>
//                 <label htmlFor="orderId" className="block font-bold">
//                   Order ID
//                 </label>
//                 <Field
//                   name="orderId"
//                   type="text"
//                   className="border p-2 rounded w-full"
//                 />
//                 <label htmlFor="stage" className="block font-bold mt-4">
//                   Stage
//                 </label>
//                 <Field
//                   name="stage"
//                   type="text"
//                   className="border p-2 rounded w-full"
//                 />
//                 <label htmlFor="worker" className="block font-bold mt-4">
//                   Worker
//                 </label>
//                 <Field
//                   name="worker"
//                   type="text"
//                   className="border p-2 rounded w-full"
//                 />
//                 <div className="mt-4">
//                   <button
//                     type="submit"
//                     className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-700"
//                   >
//                     Submit
//                   </button>
//                   <button
//                     type="button"
//                     className="ml-4 bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-500"
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
//             <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
//             <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stage</th>
//             <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Worker</th>
//             <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//           </tr>
//         </thead>
//         <tbody className="bg-white divide-y divide-gray-200">
//           {currentOrders.map((order) => (
//             <tr key={order.orderId}>
//               <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.orderId}</td>
//               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.stage}</td>
//               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.worker}</td>
//               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                 <button
//                   className="text-teal-500 hover:underline"
//                   onClick={() => setViewOrderDetails(order)}
//                 >
//                   View
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       {viewOrderDetails && <OrderDetailsModal order={viewOrderDetails} />}
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
//       <h2 className="text-xl font-bold mb-4">Completed Orders</h2>
//       <table className="min-w-full divide-y divide-gray-200 table-auto w-full text-left border-collapse">
//         <thead>
//           <tr>
//             <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
//             <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stage</th>
//             <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Worker</th>
//             <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {completedOrders.map((order) => (
//             <tr key={order.orderId}>
//               <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border">{order.orderId}</td>
//               <td className="border px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.stage}</td>
//               <td className="border px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.worker}</td>
//               <td className="border px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                 <button
//                   className="text-teal-500 hover:underline"
//                   onClick={() => setViewOrderDetails(order)}
//                 >
//                   View
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       {viewOrderDetails && <OrderDetailsModal order={viewOrderDetails} />}
//     </div>
//   );
// };

// const OrderDetailsModal = ({ order }) => {
//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//       <div className="bg-white p-8 rounded shadow-md w-1/2">
//         <h2 className="text-2xl font-bold mb-4">Order Details</h2>
//         <p>Order ID: {order.orderId}</p>
//         <p>Stage: {order.stage}</p>
//         <p>Worker: {order.worker}</p>
//         <button className="mt-4 bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-500">
//           Close
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ManagerDashboard;






import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form } from "formik";
import axios from "axios";

const ManagerDashboard = () => {
  const [currentOrders, setCurrentOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [viewOrderDetails, setViewOrderDetails] = useState(null);
  const [isCompletedView, setIsCompletedView] = useState(false);
  const [damageTypes, setDamageTypes] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    // Dummy API Calls (Replace these with actual API later)
    const fetchOrders = async () => {
      const currentOrdersResponse = await axios.get(
        "https://dummyapi/currentOrders"
      );
      const completedOrdersResponse = await axios.get(
        "https://dummyapi/completedOrders"
      );
      setCurrentOrders(currentOrdersResponse.data);
      setCompletedOrders(completedOrdersResponse.data);
    };

    const fetchDamageTypes = async () => {
      // Dummy API for damage types
      const response = await axios.get("https://dummyapi/damageTypes");
      setDamageTypes(response.data);
    };

    fetchOrders();
    fetchDamageTypes();
  }, []);

  const handleAddOrder = async (values) => {
    await axios.post("https://dummyapi/wheels", values);
    alert("Order added successfully!");
    setShowAddModal(false);
  };

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="p-4">
      {/* Navbar */}
      <header className="flex justify-between items-center p-5 rounded-md bg-gray-900 shadow-md border border-gray-200">
        <div className="flex space-x-4">
          <button
            className="flex items-center justify-center px-4 py-2 rounded-md  bg-gray-700 hover:bg-gray-600 text-white font-medium"
            onClick={() => setShowAddModal(true)}
          >
            ADD NEW ORDER
          </button>
          <h1 className="text-xl text-white pt-1 font-xs">
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

      {/* Buttons for Switching Views */}
      <div className="pl-5 mt-4 flex space-x-4">
        <button
          className="bg-teal-500 text-white p-2 rounded shadow-md hover:bg-teal-700"
          onClick={() => setIsCompletedView(false)}
        >
          Current Orders
        </button>
        <button
          className="bg-teal-500 text-white p-2 rounded shadow-md hover:bg-teal-700"
          onClick={() => setIsCompletedView(true)}
        >
          Completed Orders
        </button>
      </div>

      {/* Order Table */}
      {isCompletedView ? (
        <CompletedOrders
          completedOrders={completedOrders}
          viewOrderDetails={viewOrderDetails}
          setViewOrderDetails={setViewOrderDetails}
        />
      ) : (
        <CurrentOrders
          currentOrders={currentOrders}
          viewOrderDetails={viewOrderDetails}
          setViewOrderDetails={setViewOrderDetails}
        />
      )}

      {/* Modal for Adding New Order */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 backdrop-blur-sm">
          <div className="bg-white p-8 rounded shadow-md w-2/3">
            <h2 className="text-2xl font-bold mb-4">Add New Order</h2>
            <Formik
              initialValues={{
                clientName: "",
                year: "",
                make: "",
                model: "",
                damageType: "",
                notes: "",
              }}
              onSubmit={handleAddOrder}
            >
              <Form>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="clientName" className="block font-bold">
                      Client Name
                    </label>
                    <Field
                      name="clientName"
                      type="text"
                      className="border p-2 rounded w-full"
                    />
                  </div>
                  <div>
                    <label htmlFor="year" className="block font-bold">
                      Year
                    </label>
                    <Field
                      name="year"
                      type="text"
                      className="border p-2 rounded w-full"
                    />
                  </div>
                  <div>
                    <label htmlFor="make" className="block font-bold">
                      Make
                    </label>
                    <Field
                      name="make"
                      type="text"
                      className="border p-2 rounded w-full"
                    />
                  </div>
                  <div>
                    <label htmlFor="model" className="block font-bold">
                      Model
                    </label>
                    <Field
                      name="model"
                      type="text"
                      className="border p-2 rounded w-full"
                    />
                  </div>
                  <div>
                    <label htmlFor="damageType" className="block font-bold">
                      Damage Type
                    </label>
                    <Field
                      as="select"
                      name="damageType"
                      className="border p-2 rounded w-full"
                    >
                      <option value="">Select Damage Type</option>
                      {damageTypes.map((type) => (
                        <option key={type.id} value={type.name}>
                          {type.name}
                        </option>
                      ))}
                    </Field>
                  </div>
                  <div>
                    <label htmlFor="notes" className="block font-bold">
                      Notes
                    </label>
                    <Field
                      name="notes"
                      as="textarea"
                      className="border p-2 rounded w-full"
                    />
                  </div>
                </div>
                <div className="mt-6 flex justify-end space-x-4">
                  <button
                    type="submit"
                    className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-700"
                  >
                    Add Order
                  </button>
                  <button
                    type="button"
                    className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-500"
                    onClick={() => setShowAddModal(false)}
                  >
                    Cancel
                  </button>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      )}
    </div>
  );
};

const CurrentOrders = ({
  currentOrders,
  viewOrderDetails,
  setViewOrderDetails,
}) => {
  return (
    <div className="overflow-x-auto bg-white shadow-md rounded-lg p-6 mt-8">
      <h2 className="text-xl  font-bold mb-4">Current Orders</h2>
      <table className="min-w-full divide-y divide-gray-200 table-auto w-full text-left border-collapse">
        <thead>
          <tr>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Order ID
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Stage
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Worker
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {currentOrders.map((order) => (
            <tr key={order.orderId}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {order.orderId}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {order.stage}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {order.worker}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <button
                  className="text-teal-600 hover:text-teal-900"
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
  );
};

const CompletedOrders = ({
  completedOrders,
  viewOrderDetails,
  setViewOrderDetails,
}) => {
  return (
    <div className="overflow-x-auto bg-white shadow-md rounded-lg p-6 mt-8">
      <h2 className="text-xl  font-bold mb-4">Completed Orders</h2>
      <table className="min-w-full divide-y divide-gray-200 table-auto w-full text-left border-collapse">
        <thead>
          <tr>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Order ID
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Completion Date
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {completedOrders.map((order) => (
            <tr key={order.orderId}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {order.orderId}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {order.completionDate}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <button
                  className="text-teal-600 hover:text-teal-900"
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
  );
};

export default ManagerDashboard;

