import { useState, useEffect,useMemo } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { toast } from '@/hooks/use-toast';

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
  const [scrappedOrders,setScrappedOrders]=useState(null);
  const [stageFilter, setStageFilter] = useState("");
  const [damageTypeFilter, setDamageTypeFilter] = useState("");

  const menuItems = [
    { name: 'Current Orders', id: 'currentOrders' },
    { name: 'Completed Orders', id: 'completedOrders' },
    { name: 'Add New Order', id: 'add' },
    {name: 'Scrapped Orders',id:'scrappedOrders'}
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
      console.log(currentOrdersResponse.data);

    };

    fetchOrders();
  }, []);

  const handleAddOrder = async (values) => {
    const formData = new FormData();
    formData.append('clientName', values.clientName);
    formData.append('year', values.year);
    formData.append('make', values.make);
    formData.append('model', values.model);
    formData.append('damageType', values.damageType);
    formData.append('imageUrl', values.imageUrl); 
    formData.append('notes', values.notes);
    formData.append('status', values.status);
  
    try {
      await axios.post("http://localhost:5041/api/Orders", formData, {
        headers: {
          "Content-Type": 'multipart/form-data',
        },
      });
      setShowAddModal(false);
      toast.success("Added order sucessfully", { duration: 5000 });
      } catch (error) {
      console.error('Error submitting form:', error);
      toast.error(error.response.data, { duration: 5000 });
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
      alert('Failed to fetch order details');
    }
  };
  
  const fetchScrappedDetails = async (orderId) => {
    try {
      const response = await axios.get(`http://localhost:5041/api/Orders/scrapped/${orderId}`);
      setSelectedOrder(response.data);  
      setIsModalOpen(true);  
    } catch (error) {
      console.error('Error fetching order details:', error);
      alert('Failed to fetch order details');
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
      let additionalsecond=null;
      let additionalthird=null;
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
      setViewCompletedDetails({ ...taskResponse.data, additionalData,additionalsecond,additionalthird });  
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error fetching completed order details:', error);
      alert('Failed to fetch completed order details');
    }
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
      </div>
      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-white-800">
        <div>
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
              viewOrderDetails={fetchOrderDetails}
              setViewOrderDetails={setViewOrderDetails}
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

          {isModalOpen && selectedOrder && (
            <div
              className="fixed inset-0 bg-black opacity-80 z-50"
              onClick={() => setIsModalOpen(false)}
            ></div>
          )}
          {isModalOpen && selectedOrder && (
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-xl w-1/2">
                <h2 className="text-2xl font-bold mb-4">Order Details</h2>
                <p><strong>Order ID:</strong> {selectedOrder.orderId}</p>
                <p><strong>Client Name:</strong> {selectedOrder.clientName}</p>
                <p><strong>Year:</strong> {selectedOrder.year}</p>
                <p><strong>Make:</strong> {selectedOrder.make}</p>
                <p><strong>Model:</strong> {selectedOrder.model}</p>
                <p><strong>Damage Type:</strong> {selectedOrder.damageType}</p>
                <p><strong>Status:</strong> {selectedOrder.status}</p>
                <p><strong>Notes:</strong> {selectedOrder.notes}</p>
                {selectedOrder.imageUrl && (
                  <img src={selectedOrder.imageUrl} alt="Order Image" className="mt-1" style={{ maxWidth: '20%', height: 'auto' }}  />
                )}
                <div className="mt-6 flex justify-end space-x-4">
                  <button
                    className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
          {isModalOpen && viewCompletedDetails && (
            <div
              className="fixed inset-0 bg-black opacity-80 z-50"
              onClick={() => setIsModalOpen(false)}
            ></div>
          )}
          {isModalOpen && viewCompletedDetails && (
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div className="bg-white p-4 rounded-lg shadow-xl w-1/2 h-auto">
                <h2 className="text-2xl font-bold mb-2">Order Details</h2>
                <p><strong>Order ID:</strong> {viewCompletedDetails.orderId}</p>
                <p><strong>Year:</strong> {viewCompletedDetails.year}</p>
                <p><strong>Make:</strong> {viewCompletedDetails.make}</p>
                <p><strong>Model:</strong> {viewCompletedDetails.model}</p>
                <p><strong>Damage Type:</strong> {viewCompletedDetails.damageType}</p>
                <p><strong>Image</strong><img src= {viewCompletedDetails.imageUrl}className='mt-1'style={{ maxWidth: '5%', height: 'auto' }}/></p>

                {viewCompletedDetails.additionalData ? (
            <div className="mb-2">
              <p><strong>SandBlastingNotes</strong> {viewCompletedDetails.additionalData[0].notes}</p>
              <p><strong>SandBlastingLevel:</strong> {viewCompletedDetails.additionalData[0].sandBlastingLevel}</p>
              <p><strong>Image</strong><img src= {viewCompletedDetails.additionalData[0].imageUrl}className='mt-1'style={{ maxWidth: '5%', height: 'auto' }}/></p>

             </div>
          ) : (
            <p>No additional details available.</p>
          )}
          {viewCompletedDetails.additionalsecond ? (
            <div className="mb-2">
              <p><strong>PaintingNotes</strong> {viewCompletedDetails.additionalsecond[0].notes}</p>
              <p><strong>PaintColor</strong> {viewCompletedDetails.additionalsecond[0].pColor}</p>
              <p><strong>PaintType</strong> {viewCompletedDetails.additionalsecond[0].pType}</p>
              <p><strong>Image</strong><img src= {viewCompletedDetails.additionalsecond[0].imageUrl}className='mt-1'style={{ maxWidth: '5%', height: 'auto' }}/></p>

              </div>
          ):(<p> no data</p>)}
           {viewCompletedDetails.additionalthird ? (
            <div className="mb-2">
              <p><strong>PackagingNotes</strong> {viewCompletedDetails.additionalthird[0].notes}</p>
              <p><strong>Rating</strong> {viewCompletedDetails.additionalthird[0].iRating}</p>
              <p><strong>Image</strong><img src= {viewCompletedDetails.additionalthird[0].iRating}className='mt-1'style={{ maxWidth: '5%', height: 'auto' }}/></p>

              </div>
          ):(<p> no data</p>)}
                <div className="mt-6 flex justify-end space-x-4">
                  <button
                    className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}

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
          <form className="mt-4 space-y-4" onSubmit={formik.handleSubmit}>
            <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-8">
              {/* Left Column */}
              <div className="flex-1 space-y-4">
                {/* Client Name */}
                <div>
                  <label className="text-lg font-bold text-black">Client Name:</label>
                  <input
                    type="text"
                    name="clientName"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    value={formik.values.clientName}
                    onChange={formik.handleChange}
                  />
                </div>
                {/* Year */}
                <div>
                  <label className="text-lg font-bold text-black">Year:</label>
                  <input
                    type="text"
                    name="year"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    value={formik.values.year}
                    onChange={formik.handleChange}
                  />
                </div>

                {/* Make */}
                <div>
                  <label className="text-lg font-bold text-black">Make:</label>
                  <input
                    type="text"
                    name="make"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    value={formik.values.make}
                    onChange={formik.handleChange}
                  />
                </div>

                {/* Model */}
                <div>
                  <label className="text-lg font-bold text-black">Model:</label>
                  <input
                    type="text"
                    name="model"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    value={formik.values.model}
                    onChange={formik.handleChange}
                  />
                </div>
                </div>
                <div>
                <div>
                  <label className="text-lg font-bold text-black">Image:</label>
                  <input
                    id="image"
                    name="imageUrl"
                    type="file"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    onChange={(event) => {
                      formik.setFieldValue("imageUrl", event.currentTarget.files[0]);
                    }}
                  />
                </div>

                {/* Damage Type */}
                <div>
                  <label className="text-lg font-bold text-black">Damage Type:</label>
                  <input
                    name="damageType"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md h-10"
                    value={formik.values.damageType}
                    onChange={formik.handleChange}
                  ></input>
                </div>


                
                {/* Notes */}
                <div>
                  <label className="text-lg font-bold text-black">Notes:</label>
                  <textarea
                    name="notes"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md h-30"
                    value={formik.values.notes}
                    onChange={formik.handleChange}
                  ></textarea>
                </div>

                {/* Status */}
                <div>
                  <label className="text-lg font-bold text-black">Status:</label>
                  <input
                    name="status"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md h-10"
                    value={formik.values.status}
                    onChange={formik.handleChange}
                  ></input>
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-4">
              <button
                type="submit"
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-teal-600"
                onClick={()=>{toast({title:"Added Successfully"})}}>
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
          </form>
        )}
      
              
      </Formik>
              
    </div>
  </div>
  </>
          )}
        </div>
      </main>
    </div>
  );
};
const CurrentOrders = ({
  currentOrders,
  viewOrderDetails,
  setViewOrderDetails
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [stageFilter, setStageFilter] = useState("");
  const [damageTypeFilter, setDamageTypeFilter] = useState("");
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
    <div className="overflow-x-auto bg-white shadow-md rounded-lg p-6 mt-8">
      <h2 className="text-xl font-bold mb-4">Current Orders</h2>
      <div className="mb-4 flex space-x-4">
        
        <select
          className="border p-2 rounded"
          value={stageFilter}
          onChange={(e) => setStageFilter(e.target.value)} 
        >
          <option value="">All Stages</option>
          <option value="inventory">inventory</option>
          <option value="soldering">soldering</option>
          <option value="Painting">Painting</option>
          <option value="packaging">packaging</option>
        </select>
       
        <select
          className="border p-2 rounded"
          value={damageTypeFilter}
          onChange={() => setDamageTypeFilter(order.damageType)} 
        >
          <option value="">All Damage Types</option>
          <option value="scraped">Scraped</option>
          <option value="lipcrack">Lip Crack</option>
          <option value="chipped">Chipped</option>
          <option value="paintfade">Paint Fade</option>
        </select>
      </div>
      {/* Orders Table */}
      <table className="min-w-full divide-y divide-gray-900 table-auto w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-900">
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
                {order.orderId}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-950">
                {order.status}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-950">
                {order.damageType}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-950">
                <button
                  type="button"
                  className="bg-green-500 text-white font-semibold px-4 py-2 rounded hover:bg-blue-400"
                  onClick={() => viewOrderDetails(order.orderId)}
                >
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination */}
      <div className="mt-4 flex justify-between items-center">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-teal-500 text-white rounded"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-teal-500 text-white rounded"
        >
          Next
        </button>
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
