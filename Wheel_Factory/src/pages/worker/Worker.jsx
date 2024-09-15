import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Worker() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [workerType, setWorkerType] = useState(null); 
  const [allStages, setAllStages] = useState([]);
  const [error, setError] = useState('');
  const [pendingTasks, setPendingTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [stageFilter, setStageFilter] = useState('');
  const [damageTypeFilter, setDamageTypeFilter] = useState('');

  const userIdToWorkerTypeMap = {
    'USR002': '1', // Inventory worker
    'USR003': '2', // Soldering worker
    'USR004': '3', // Painting worker
    'USR005': '4', // Packaging worker
  };

  useEffect(() => {
  
    const workerTypeFromUserId = userIdToWorkerTypeMap[userId];
    console.log(workerTypeFromUserId);
    setWorkerType(workerTypeFromUserId);

    const fetchPendingTasks = async () => {
      try {
        let response;
        if (workerTypeFromUserId) {
          switch (workerTypeFromUserId) {
            case '1':
              response = await axios.get('http://localhost:5041/api/Orders/Inventory');
              break;
            case '2':
              response = await axios.get('http://localhost:5041/api/task/Soldering');
              break;
            case '3':
              response = await axios.get('http://localhost:5041/api/task/Painting');
              break;
            case '4':
              response = await axios.get('http://localhost:5041/api/task/Packaging');
              break;
            default:
              console.log('Invalid worker type');
              return;
          }
          setPendingTasks(response.data); 
        }
      } catch (error) {
        setError('Error fetching pending tasks');
        console.error(error);
      }
    };

    if (workerTypeFromUserId) {
      fetchPendingTasks();
    }
  }, [userId]); 

  const handleProcessClick = (orderId) => {
    console.log("Navigating to Inventory with orderId:", orderId);
    setIsModalOpen(false);
    switch (workerType) {
      case '1':
        navigate('/inventory',{ state: { orderId} });
        break;
      case '2':
        navigate('/soldering',{state : {orderId}});
        break;
      case '3':
        navigate('/painting',{state:{orderId}});
        break;
      case '4':
        navigate('/packaging',{state:{orderId}});
        break;
      default:
        console.log('Invalid worker type');
    }
  };

  const handleDetailsClick = (orderId) => {
    const task = pendingTasks.find(task => task.orderId === orderId);
    if (task) {
      setSelectedTask(task);
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
  };

  if (error) {
    return <p className="text-red-500 text-center mt-8">{error}</p>;
  }

  if (!pendingTasks.length) {
    return <p className="text-center mt-8">Loading...</p>;
  }

  const filteredOrders = pendingTasks.filter(order =>
    (!stageFilter || order.Stage === stageFilter) &&
    (!damageTypeFilter || order.DamageType === damageTypeFilter)
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <div className="overflow-x-auto bg-white shadow-md rounded-lg p-2">
      <header className="flex justify-between items-center p-5 bg-gray-900 text-white rounded-lg shadow-md mb-8">
        <div className="flex space-x-4">
          <button
            className="flex items-center justify-center px-4 py-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white font-medium"
            onClick={() => navigate('/login')}
          >
            PREVIOUS
          </button>
          <h1 className="text-2xl font-bold">ORDERS LIST</h1>
        </div>
        <button
          className="flex items-center justify-center px-4 py-2 rounded-md bg-red-500 hover:bg-red-600 text-white font-medium transition"
          onClick={() => navigate('/')}
        >
          LOGOUT
        </button>
      </header>

      <h2 className="text-3xl font-bold text-center mb-6">PENDING ORDERS LIST</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 shadow-md">
          <thead className="bg-gray-900 text-white font-semibold font-serif">
            <tr>
              <th className="p-4 text-left">Order ID</th>
              <th className="p-4 text-left">Year</th>
              <th className="p-4 text-left">Make</th>
              <th className="p-4 text-left">Model</th>
              <th className="p-4 text-left">Image</th>
              <th className="p-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((task) => (
              <tr key={task.orderId} className="border-t">
                <td className="p-4">{task.orderId}</td>
                <td className="p-4">{task.year}</td>
                <td className="p-4">{task.make}</td>
                <td className="p-4">{task.model}</td>
                <td className="p-4">{task.imageUrl}</td>
                <td className="p-4">
                  <button
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                    onClick={() => handleDetailsClick(task.orderId)}
                  >
                    Next
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-md w-1/2">
            {selectedTask && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Order ID: {selectedTask.orderId}</h2>
                <div className="space-y-2">
                  <div>
                    <strong>Status:</strong> {selectedTask.status}
                  </div>
                  <div>
                    <strong>DamageType:</strong> {selectedTask.damageType}
                  </div>
                  <div>
                    <strong>Notes:</strong> {selectedTask.notes}
                  </div>
                </div>
                <div className="mt-4 flex justify-end space-x-4">
                  <button
                    className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                    onClick={() => handleProcessClick(selectedTask.orderId)}
                  >
                    Process
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}