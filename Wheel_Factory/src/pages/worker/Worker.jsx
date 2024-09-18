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
    'Worker1': '1', // Inventory worker
    'Worker2': '2', // Soldering worker
    'Worker3': '3', // Painting worker
    'Worker4': '4', // Packaging workerf
  };

  useEffect(() => {
    const workerTypeFromUserId = userIdToWorkerTypeMap[userId];
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
              response = await axios.get('http://localhost:5041/api/task/soldering');
              break;
            case '3':
              response = await axios.get('http://localhost:5041/api/task/painting');
              break;
            case '4':
              response = await axios.get('http://localhost:5041/api/task/packaging');
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
    setIsModalOpen(false);
    switch (workerType) {
      case '1':
        navigate('/inventory', { state: { orderId } });
        break;
      case '2':
        navigate('/soldering', { state: { orderId } });
        break;
      case '3':
        navigate('/painting', { state: { orderId } });
        break;
      case '4':
        navigate('/packaging', { state: { orderId } });
        break;
      default:
        console.log('Invalid worker type');
    }
  };

  const handleDetailsClick = async (orderId) => {
    try {
      let taskEndpoint, additionalEndpoint, SecondEndpoint;
      switch (workerType) {
        case '1': // Inventory
          taskEndpoint = `http://localhost:5041/api/Orders/${orderId}`;
          break;
        case '2': // Soldering
          taskEndpoint = `http://localhost:5041/api/Orders/${orderId}`;
          break;
        case '3': // Painting
          taskEndpoint = `http://localhost:5041/api/Orders/${orderId}`;
          additionalEndpoint = `http://localhost:5041/api/Task/soldering/${orderId}`;
          break;
        case '4': // Packaging
          taskEndpoint = `http://localhost:5041/api/Orders/${orderId}`;
          additionalEndpoint = `http://localhost:5041/api/Task/soldering/${orderId}`;
          SecondEndpoint = `http://localhost:5041/api/Task/painting/${orderId}`;
          break;
        default:
          throw new Error('Invalid worker type');
      }

      const taskResponse = await axios.get(taskEndpoint);
      let additionalData = null;
      let SecondData = null;
      if (additionalEndpoint) {
        const additionalResponse = await axios.get(additionalEndpoint);
        additionalData = additionalResponse.data;
      }
      if (SecondEndpoint) {
        const SecondResponse = await axios.get(SecondEndpoint);
        SecondData = SecondResponse.data;
      }

      setSelectedTask({ ...taskResponse.data, additionalData, SecondData });
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error fetching task details:', error);
      setError('Failed to fetch task details');
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
  };

  if (error) {
    return <p className="text-red-500 text-center mt-8">{error}</p>;
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
          onClick={() =>{localStorage.clear(); navigate('/')}}
        >
          LOGOUT
        </button>
      </header>

      <h2 className="text-3xl font-bold text-center mb-6">PENDING ORDERS LIST</h2>

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
          <option value="scraped">Scraped</option>
          <option value="lipcrack">Lip Crack</option>
          <option value="chipped">Chipped</option>
          <option value="paintfade">Paint Fade</option>
        </select>
      </div>

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

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <button
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded disabled:opacity-50"
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="text-lg">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded disabled:opacity-50"
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
          <div className="bg-white p-2 rounded-md shadow-md w-1/2">
            {selectedTask && (
              <div>
                {/* <h3 className="text-lg font-semibold">Inventory Details</h3> */}
                <div className="space-y-1">
                  <div>
                    <strong>Order Id:</strong> {selectedTask.orderId}
                  </div>
                  <div>
                    <strong>Status:</strong> {selectedTask.status}
                  </div>
                  <div>
                    <strong>Damage Type:</strong> {selectedTask.damageType}
                  </div>
                  <div>
                    <strong>Notes:</strong> {selectedTask.notes}
                  </div>
                  <div>
                    <strong>Image:</strong> <img src={selectedTask.imageUrl} className='mt-1'style={{ maxWidth: '5%', height: 'auto' }} />
                  </div>
                  {selectedTask.additionalData && selectedTask.additionalData.length > 0 && (
                    <div className="mt-4 border-t pt-4">
                      {/* <h3 className="text-lg font-semibold">Soldering Details</h3> */}
                      <div className=""> 
                        <div>
                          <strong>ImageUrl:</strong><img src= {selectedTask.additionalData[0].imageUrl} className="mt-1" style={{ maxWidth: '5%', height: 'auto' }}  />
                        </div>
                        <div>
                          <strong>SandBlasting notes:</strong> {selectedTask.additionalData[0].notes}
                        </div>
                        <div>
                          <strong>SandBlasting Level:</strong> {selectedTask.additionalData[0].sandBlastingLevel}
                        </div>
                      </div>
                    </div>
                  )}
                  {selectedTask.SecondData && selectedTask.SecondData.length > 0 && (
                    <div className="mt-4 border-t pt-4">
                      {/* <h3 className="text-lg font-semibold">Painting Details</h3> */}
                      <div className="">
                        <div>
                          <strong>ImageUrl:</strong><img src= {selectedTask.SecondData[0].imageUrl} className='mt-1' style={{ maxWidth: '5%', height: 'auto' }}/>                       </div>
                        <div>
                          <strong>PaintColor:</strong> {selectedTask.SecondData[0].pColor}
                        </div>
                        <div>
                          <strong>PaintType:</strong> {selectedTask.SecondData[0].pType}
                        </div>
                        <div>
                          <strong>Notes:</strong> {selectedTask.SecondData[0].notes}
                        </div>
                      </div>
                    </div>
                  )}
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
