// import { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// export default function Worker() {
//   const { userId } = useParams();
//   const navigate = useNavigate();
//   const [workerType, setWorkerType] = useState(null); 
//   const [allStages, setAllStages] = useState([]);
//   const [error, setError] = useState('');
//   const [pendingTasks, setPendingTasks] = useState([]);
//   const [selectedTask, setSelectedTask] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(10);
//   const [stageFilter, setStageFilter] = useState('');
//   const [damageTypeFilter, setDamageTypeFilter] = useState('');

//   const userIdToWorkerTypeMap = {
//     'USR002': '1', // Inventory worker
//     'USR003': '2', // Soldering worker
//     'USR004': '3', // Painting worker
//     'USR005': '4', // Packaging worker
//   };

//   useEffect(() => {
  
//     const workerTypeFromUserId = userIdToWorkerTypeMap[userId];
//     console.log(workerTypeFromUserId);
//     setWorkerType(workerTypeFromUserId);

//     const fetchPendingTasks = async () => {
//       try {
//         let response;
//         if (workerTypeFromUserId) {
//           switch (workerTypeFromUserId) {
//             case '1':
//               response = await axios.get('http://localhost:5041/api/Orders/Inventory');
//               break;
//             case '2':
//               response = await axios.get('http://localhost:5041/api/task/soldering');
//               break;
//             case '3':
//               response = await axios.get('http://localhost:5041/api/task/painting');
//               break;
//             case '4':
//               response = await axios.get('http://localhost:5041/api/task/Packaging');
//               break;
//             default:
//               console.log('Invalid worker type');
//               return;
//           }
//           setPendingTasks(response.data); 
//         }
//       } catch (error) {
//         setError('Error fetching pending tasks');
//         console.error(error);
//       }
//     };

//     if (workerTypeFromUserId) {
//       fetchPendingTasks();
//     }
//   }, [userId]); 

//   const handleProcessClick = (orderId) => {
//     console.log("Navigating to Inventory with orderId:", orderId);
//     setIsModalOpen(false);
//     switch (workerType) {
//       case '1':
//         navigate('/inventory',{ state: { orderId} });
//         break;
//       case '2':
//         navigate('/soldering',{state : {orderId}});
//         break;
//       case '3':
//         navigate('/painting',{state:{orderId}});
//         break;
//       case '4':
//         navigate('/packaging',{state:{orderId}});
//         break;
//       default:
//         console.log('Invalid worker type');
//     }
//   };
//   // const handleDetailsClick = async (orderId) => {
//   //   const task = pendingTasks.find(task => task.orderId === orderId);
//   //   if (task) {
//   //     try {
//   //       const response = await axios.get(`http://localhost:5041/api/Task/soldering/${orderId}`);
//   //       setSelectedTask(response.data);
//   //       setIsModalOpen(true);
//   //     } catch (error) {
//   //       console.error('Error fetching task details:', error);
//   //       setError('Failed to fetch task details');
//   //     } finally {
//   //       setLoading(false);
//   //     }
//   //   } else {
//   //     setError('Task not found');
//   //     setLoading(false);
//   //   }
//   // };
//   // 
//   const handleDetailsClick = async (orderId) => {
//     try {
//       let taskEndpoint, additionalEndpoint;
//       switch (workerType) {
//         case '1': // Inventory
//           taskEndpoint = `http://localhost:5041/api/Orders/${orderId}`;
//           break;
//         case '2': // Soldering
//           taskEndpoint = `http://localhost:5041/api/Orders/${orderId}`;
//           break;
//         case '3': // Painting
//           taskEndpoint = `http://localhost:5041/api/Orders/${orderId}`;
//           additionalEndpoint = `http://localhost:5041/api/Task/soldering/${orderId}`;
//           break;
//         case '4': // Packaging
//           taskEndpoint = `http://localhost:5041/api/Orders/${orderId}`;
//           additionalEndpoint = `http://localhost:5041/api/Task/packaging/${orderId}`;
//           break;
//         default:
//           throw new Error('Invalid worker type');
//       }
  
//       const taskResponse = await axios.get(taskEndpoint);
//       let additionalData = null;
  
//       if (additionalEndpoint) {
//         const additionalResponse = await axios.get(additionalEndpoint);
//         additionalData = additionalResponse.data;
//       }
  
//       setSelectedTask({ ...taskResponse.data, additionalData });
//       setIsModalOpen(true);
//     } catch (error) {
//       console.error('Error fetching task details:', error);
//       setError('Failed to fetch task details');
//     }
//   };
  
  

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setSelectedTask(null);
//   };

//   if (error) {
//     return <p className="text-red-500 text-center mt-8">{error}</p>;
//   }


//   const filteredOrders = pendingTasks.filter(order =>
//     (!stageFilter || order.Stage === stageFilter) &&
//     (!damageTypeFilter || order.DamageType === damageTypeFilter)
//   );

//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);

//   const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);
//   return (
//     <div className="overflow-x-auto bg-white shadow-md rounded-lg p-2">
//       <header className="flex justify-between items-center p-5 bg-gray-900 text-white rounded-lg shadow-md mb-8">
//         <div className="flex space-x-4">
//           <button
//             className="flex items-center justify-center px-4 py-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white font-medium"
//             onClick={() => navigate('/login')}
//           >
//             PREVIOUS
//           </button>
//           <h1 className="text-2xl font-bold">ORDERS LIST</h1>
//         </div>
//         <button
//           className="flex items-center justify-center px-4 py-2 rounded-md bg-red-500 hover:bg-red-600 text-white font-medium transition"
//           onClick={() => navigate('/')}
//         >
//           LOGOUT
//         </button>
//       </header>

//       <h2 className="text-3xl font-bold text-center mb-6">PENDING ORDERS LIST</h2>
//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white border border-gray-300 shadow-md">
//           <thead className="bg-gray-900 text-white font-semibold font-serif">
//             <tr>
//               <th className="p-4 text-left">Order ID</th>
//               <th className="p-4 text-left">Year</th>
//               <th className="p-4 text-left">Make</th>
//               <th className="p-4 text-left">Model</th>
//               <th className="p-4 text-left">Image</th>
//               <th className="p-4 text-left">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {currentItems.map((task) => (
//               <tr key={task.orderId} className="border-t">
//                 <td className="p-4">{task.orderId}</td>
//                 <td className="p-4">{task.year}</td>
//                 <td className="p-4">{task.make}</td>
//                 <td className="p-4">{task.model}</td>
//                 <td className="p-4">{task.imageUrl}</td>
//                 <td className="p-4">
//                   <button
//                     className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
//                     onClick={() => handleDetailsClick(task.orderId)}
//                   >
//                     Next
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       {isModalOpen && (
//       <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//         <div className="bg-white p-6 rounded-md shadow-md w-1/2">
//           {selectedTask && (
//             <div>
//               <h2 className="text-xl font-semibold mb-4">Order ID: {selectedTask.orderId}</h2>
//               <div className="space-y-2">
//                 <div>
//                   <strong>Status:</strong> {selectedTask.status}
//                 </div>
//                 <div>
//                   <strong>DamageType:</strong> {selectedTask.damageType}
//                 </div>
//                 <div>
//                   <strong>Notes:</strong> {selectedTask.notes}
//                 </div>
//                 {selectedTask.additionalData && (selectedTask.additionalData).length > 0 && (
//                   <div className="mt-4 border-t pt-4">
//                     <h3 className="text-lg font-semibold">Additional Details</h3>
//                     <div>
//                       <strong>SandBlasting Notes:</strong> {selectedTask.additionalData.notes }
//                     </div>
//                     <div>
//                       <strong>SandBlasting Level:</strong> {selectedTask.additionalData.sandBlastingLevel }
//                     </div>
//                     <div>
//                       <strong>Image URL:</strong> {selectedTask.additionalData.imageUrl }
//                     </div>
//                   </div>
//                 )}
//               </div>
//               <div className="mt-4 flex justify-end space-x-4">
//                 <button
//                   className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
//                   onClick={closeModal}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
//                   onClick={() => handleProcessClick(selectedTask.orderId)}
//                 >
//                   Process
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     )}
//     </div>
//   )};

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
      let taskEndpoint, additionalEndpoint,SecondEndpoint;
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
      let SecondData=null;
      if (additionalEndpoint) {
        const additionalResponse = await axios.get(additionalEndpoint);
        additionalData = additionalResponse.data;
      }
      if (SecondEndpoint) {
        const SecondResponse = await axios.get(SecondEndpoint);
        SecondData = SecondResponse.data;
      }

      setSelectedTask({ ...taskResponse.data, additionalData ,SecondData});
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
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
          <div className="bg-white p-2   rounded-md shadow-md w-1/2">
            {selectedTask && (
              <div>
                <h3 className="text-lg font-semibold">Inventory Details</h3>
                <div className="space-y-1">
                  <div>
                  <strong>Order Id</strong> {selectedTask.orderId}
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
                  {selectedTask && selectedTask.additionalData && selectedTask.additionalData.length > 0 && (
                  <div className="mt-4 border-t pt-4">
                    <h3 className="text-lg font-semibold">Soldering Details</h3>
                    <div className="space-y-1">
                    <div>
                      <strong>ImageUrl</strong> {selectedTask.additionalData[0].imageUrl }
                    </div>
                    <div>
                      <strong>SandBlasting notes:</strong> {selectedTask.additionalData[0].notes }
                    </div>
                    <div>
                      <strong>SandBlasting Level:</strong> {selectedTask.additionalData[0].sandBlastingLevel }
                    </div>
                    </div>
                  </div>
                )}
                {selectedTask && selectedTask.SecondData && selectedTask.SecondData.length > 0 && (
                  <div className="mt-4 border-t pt-4">
                    <h3 className="text-lg font-semibold">Painting Details</h3>
                    <div className="space-y-1">
                    <div>
                      <strong>ImageUrl</strong> {selectedTask.SecondData[0].imageUrl }
                    </div>
                    <div>
                      <strong>PaintColor:</strong> {selectedTask.SecondData[0].pColor}
                    </div>
                    <div>
                      <strong>PaintType:</strong> {selectedTask.SecondData[0].pType }
                    </div>
                    <div>
                      <strong>Notes:</strong> {selectedTask.SecondData[0].notes }
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

        