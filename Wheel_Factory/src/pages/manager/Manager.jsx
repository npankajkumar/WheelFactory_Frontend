import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ManagerDashboard = () => {
  const [wheels, setWheels] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newOrder, setNewOrder] = useState({
    wheelId: "",
    clientName: "",
    color: "",
    currentStage: 1,
    status: "in-progress",
  });
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      const wheelsResponse = await fetch("http://localhost:3000/wheels");
      const completedOrdersResponse = await fetch(
        "http://localhost:3000/completedOrders"
      );
      setWheels(await wheelsResponse.json());
      setCompletedOrders(await completedOrdersResponse.json());
    };
    fetchData();
  }, []);

  const handleAddOrder = async () => {
    await fetch("http://localhost:3000/wheels", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newOrder),
    });
    alert("Order added successfully!");
    setShowAddModal(false);
    setNewOrder({
      wheelId: "",
      clientName: "",
      color: "",
      currentStage: 1,
      status: "in-progress",
    });
  };

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="p-4">
      <header className="flex justify-between items-center p-5 rounded-md bg-black shadow-md border border-gray-200">
        <div className="flex space-x-4">
        <button
          className="border border-gray-300 font-bold text-white p-2 rounded-md shadow-sm hover:bg-gray-200 hover:text-black transition"
          onClick={() => setShowAddModal(true)}
        >
          ADD NEW ORDER
        </button>
          <h1 className="text-xl text-white pt-1 font-bold">MANAGER DASHBOARD</h1>
        </div>
        <button 
          className="border border-red-400 p-2 rounded-md shadow-sm font-bold text-red-500 hover:bg-red-100 transition"
          onClick={handleLogout}
        >
          LOGOUT
        </button>
      </header>
      <div className="mt-4">
        <h2 className="text-lg font-bold">Orders Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
          {wheels.map((wheel) => (
            <div key={wheel.wheelId} className="p-4 border rounded-md shadow">
              <h3 className="font-bold">Wheel ID: {wheel.wheelId}</h3>
              <p>Client Name: {wheel.clientName}</p>
              <p>Color Preference: {wheel.colorPreference}</p>
              <p>Status: {wheel.status}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4">
        <h2 className="text-lg font-bold">Completed Orders</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
          {completedOrders.map((order) => (
            <div key={order.orderId} className="p-4 border rounded-md shadow">
              <h3 className="font-bold">Order ID: {order.orderId}</h3>
              <p>Client Name: {order.clientName}</p>
              <p>Completion Date: {order.completionDate}</p>
            </div>
          ))}
        </div>
      </div>
       
      {showAddModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-5 rounded-md shadow-md">
            <h2 className="text-xl font-bold mb-4">Add New Order</h2>
            <div className="space-y-2">
              <input
                type="text"
                placeholder="Wheel ID"
                value={newOrder.wheelId}
                onChange={(e) =>
                  setNewOrder({ ...newOrder, wheelId: e.target.value })
                }
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Client Name"
                value={newOrder.clientName}
                onChange={(e) =>
                  setNewOrder({ ...newOrder, clientName: e.target.value })
                }
                className="w-full p-2 border rounded"
              />{" "}
              <input
                type="text"
                placeholder="Color"
                value={newOrder.color}
                onChange={(e) =>
                  setNewOrder({ ...newOrder, color: e.target.value })
                }
                className="w-full p-2 border rounded"
              />{" "}
              <button
                className="bg-green-500 text-white p-3 rounded-md shadow-md hover:bg-green-700 transition"
                onClick={handleAddOrder}
              >
                {" "}
                Submit{" "}
              </button>{" "}
              <button
                className="ml-4 bg-red-500 text-white p-3 rounded-md shadow-md hover
                    transition"
                onClick={() => setShowAddModal(false)}
              >
                {" "}
                Cancel{" "}
              </button>{" "}
            </div>{" "}
          </div>{" "}
        </div>
      )}{" "}
    </div>
  );
};
export default ManagerDashboard;
