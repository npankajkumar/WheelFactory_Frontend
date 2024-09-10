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

    fetchOrders();
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
      <header className="flex justify-between items-center p-5 rounded-md bg-black shadow-md border border-gray-200">
        <div className="flex space-x-4">
          <button
            className="border border-gray-300 font-bold text-white p-2 rounded-md shadow-sm hover:bg-gray-200 hover:text-black transition"
            onClick={() => setShowAddModal(true)}
          >
            ADD NEW ORDER
          </button>
          <h1 className="text-xl text-white pt-1 font-bold">
            MANAGER DASHBOARD
          </h1>
        </div>
        <button
          className="border border-red-400 p-2 rounded-md shadow-sm font-bold text-red-500 hover:bg-red-100 transition"
          onClick={handleLogout}
        >
          LOGOUT
        </button>
      </header>

      {/* Buttons for Switching Views */}
      <div className="mt-4 flex space-x-4">
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded shadow-md w-1/2">
            <h2 className="text-2xl font-bold mb-4">Add New Order</h2>
            <Formik
              initialValues={{ orderId: "", stage: "", worker: "" }}
              onSubmit={handleAddOrder}
            >
              <Form>
                <label htmlFor="orderId" className="block font-bold">
                  Order ID
                </label>
                <Field
                  name="orderId"
                  type="text"
                  className="border p-2 rounded w-full"
                />
                <label htmlFor="stage" className="block font-bold mt-4">
                  Stage
                </label>
                <Field
                  name="stage"
                  type="text"
                  className="border p-2 rounded w-full"
                />
                <label htmlFor="worker" className="block font-bold mt-4">
                  Worker
                </label>
                <Field
                  name="worker"
                  type="text"
                  className="border p-2 rounded w-full"
                />
                <div className="mt-4">
                  <button
                    type="submit"
                    className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-700"
                  >
                    Submit
                  </button>
                  <button
                    type="button"
                    className="ml-4 bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-500"
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
    <div className="overflow-x-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Current Orders</h2>
      <table className="table-auto w-full text-left border-collapse">
        <thead>
          <tr>
            <th className="border px-4 py-2">Order ID</th>
            <th className="border px-4 py-2">Stage</th>
            <th className="border px-4 py-2">Worker</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentOrders.map((order) => (
            <tr key={order.orderId}>
              <td className="border px-4 py-2">{order.orderId}</td>
              <td className="border px-4 py-2">{order.stage}</td>
              <td className="border px-4 py-2">{order.worker}</td>
              <td className="border px-4 py-2">
                <button
                  className="text-teal-500 hover:underline"
                  onClick={() => setViewOrderDetails(order)}
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {viewOrderDetails && <OrderDetailsModal order={viewOrderDetails} />}
    </div>
  );
};

const CompletedOrders = ({
  completedOrders,
  viewOrderDetails,
  setViewOrderDetails,
}) => {
  return (
    <div className="overflow-x-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Completed Orders</h2>
      <table className="table-auto w-full text-left border-collapse">
        <thead>
          <tr>
            <th className="border px-4 py-2">Order ID</th>
            <th className="border px-4 py-2">Stage</th>
            <th className="border px-4 py-2">Worker</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {completedOrders.map((order) => (
            <tr key={order.orderId}>
              <td className="border px-4 py-2">{order.orderId}</td>
              <td className="border px-4 py-2">{order.stage}</td>
              <td className="border px-4 py-2">{order.worker}</td>
              <td className="border px-4 py-2">
                <button
                  className="text-teal-500 hover:underline"
                  onClick={() => setViewOrderDetails(order)}
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {viewOrderDetails && <OrderDetailsModal order={viewOrderDetails} />}
    </div>
  );
};

const OrderDetailsModal = ({ order }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded shadow-md w-1/2">
        <h2 className="text-2xl font-bold mb-4">Order Details</h2>
        <p>Order ID: {order.orderId}</p>
        <p>Stage: {order.stage}</p>
        <p>Worker: {order.worker}</p>
        <button className="mt-4 bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-500">
          Close
        </button>
      </div>
    </div>
  );
};

export default ManagerDashboard;
