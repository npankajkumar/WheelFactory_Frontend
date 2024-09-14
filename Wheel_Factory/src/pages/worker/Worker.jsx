// import  { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// const Worker = () => {
//   const { userId } = useParams();
//   const navigate = useNavigate();
//   const [worker, setWorker] = useState(null);
//   const [stage1, setStage1] = useState([]);
//   const [stage2, setStage2] = useState([]);
//   const [stage3, setStage3] = useState([]);
//   const [stage4, setStage4] = useState([]);
//   const [error, setError] = useState('');
//   const [wheels, setWheels] = useState([]);
//   const [selectedWheel, setSelectedWheel] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   useEffect(() => {
//     const fetchWorkerData = async () => {
//       try {
//         const response = await fetch(`http://localhost:3000/workers`);
//         if (!response.ok) {
//           throw new Error('Worker data not found');
//         }
//         const workersData = await response.json();
//         const currentWorker = workersData.find(worker => worker.userId === userId);
//         if (currentWorker) {
//           setWorker(currentWorker);
//         } else {
//           throw new Error('Worker not found');
//         }
//       } catch (err) {
//         console.error('Error fetching worker data:', err.message);
//         setError('An error occurred while fetching worker data.');
//       }
//     };

//     const fetchStageData = async () => {
//       try {
//         const [stage1Response, stage2Response, stage3Response, stage4Response] = await Promise.all([
//           fetch('http://localhost:3000/stage1'),
//           fetch('http://localhost:3000/stage2'),
//           fetch('http://localhost:3000/stage3'),
//           fetch('http://localhost:3000/stage4')
//         ]);

//         const [stage1Data, stage2Data, stage3Data, stage4Data] = await Promise.all([
//           stage1Response.json(),
//           stage2Response.json(),
//           stage3Response.json(),
//           stage4Response.json()
//         ]);

//         setStage1(stage1Data);
//         setStage2(stage2Data);
//         setStage3(stage3Data);
//         setStage4(stage4Data);
//       } catch (err) {
//         console.error('Error fetching stage data:', err.message);
//         setError('An error occurred while fetching stage data.');
//       }
//     };

//     const fetchWheelData = async () => {
//       try {
//         const response = await fetch('http://localhost:3000/wheels');
//         if (!response.ok) {
//           throw new Error('Wheel data not found');
//         }
//         const wheelsData = await response.json();
//         setWheels(wheelsData);
//       } catch (err) {
//         console.error('Error fetching wheel data:', err.message);
//         setError('An error occurred while fetching wheel data.');
//       }
//     };

//     fetchWorkerData();
//     fetchStageData();
//     fetchWheelData();
//   }, [userId]);

//   const filterStageData = (stageData) => {
//     return stageData.filter(item => item.userId === userId && item.status === 'pending');
//   };

//   const handleProcessClick = (stage) => {
//     const stagePaths = {
//       '1': `/inventory`,
//       '2': `/soldering`,
//       '3': `/painting`,
//       '4': `/packaging`
//     };

//     navigate(stagePaths[stage] || '/');
//   };

//   const handleDetailsClick = (wheelId) => {
//     const wheel = wheels.find(w => w.wheelId === wheelId);
//     if (wheel) {
//       setSelectedWheel(wheel);
//       setIsModalOpen(true);
//     }
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setSelectedWheel(null);
//   };

//   if (error) {
//     return <p>{error}</p>;
//   }
//   if (!worker) {
//     return <p>Loading...</p>;
//   }
//   return (
//     <div>
//       <header className="flex justify-between items-center p-5 rounded-md bg-black shadow-md border border-gray-200">
//         <div className="flex space-x-4">
//           <button 
//             className="border border-gray-300 font-bold text-white p-2 rounded-md shadow-sm hover:bg-gray-200 hover:text-black transition"
//             onClick={() => navigate('/login')} 
//           >
//             PREVIOUS
//           </button>
//           <h1 className="text-xl text-white pt-1 font-bold">ORDERS LIST</h1>
//         </div>
//         <button 
//           className="border border-red-400 p-2 rounded-md shadow-sm font-bold text-red-500 hover:bg-red-100 transition"
//           onClick={() => navigate('/')}
//         >
//           LOGOUT
//         </button>
//       </header>
//       <h3>PENDING ORDERS LIST</h3>
//       <table className="min-w-full divide-y divide-gray-900 table-auto w-full text-left border-collapse">
//         <thead>
//         <tr className="bg-gray-900">
//     <th className="px-6 py-3 text-left text-l font-bold text-white uppercase tracking-wider">
//         S.No
//       </th>
//       <th className="px-6 py-3 text-left text-l font-bold text-white uppercase tracking-wider">
//         OrderId
//       </th>
//       <th className="px-6 py-3 text-left text-l font-bold text-white uppercase tracking-wider">
//         Year
//       </th>
//       <th className="px-6 py-3 text-left text-l font-bold text-white uppercase tracking-wider">
//         Make
//       </th>
//       <th className="px-6 py-3 text-left text-l font-bold text-white uppercase tracking-wider">
//         Model
//       </th>
//       <th className="px-6 py-3 text-left text-l font-bold text-white uppercase tracking-wider">
//         DamageType
//       </th>
//       <th className="px-6 py-3 text-left text-l font-bold text-white uppercase tracking-wider">
//         Notes
//       </th>
//       <th className="px-6 py-3 text-left text-l font-bold text-white uppercase tracking-wider">
//         Process
//       </th>
//     </tr>
//         </thead>
//         <tbody>
//           {filterStageData(stage1).map((item) => (
//             <tr key={item.wheelId} className="border border-gray-500">
//               <td className="border border-gray-500 p-2">{item.SNo}</td>
//               <td className="border border-gray-500 p-2">{item.OrderId}</td>
//               <td className="border border-gray-500 p-2">{item.Year}</td>
//               <td className="border border-gray-500 p-2">{item.Make}</td>
//               <td className="border border-gray-500 p-2">{item.Model}</td>
//               <td className="border border-gray-500 p-2">{item.DamageType}</td>
//               <td className="border border-gray-500 p-2">{item.Notes}</td>
//               <td className="border border-gray-500 p-2">
//                 <button
//                   className="bg-red-500 text-white p-2 rounded-md hover:bg-green-700 ml-2"
//                   onClick={() => handleDetailsClick(item.wheelId)}
//                 >
//                  Process
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//         <tbody>
//           {filterStageData(stage2).map((item) => (
//             <tr key={item.wheelId} className="border border-gray-500">
//               <td className="border border-gray-500 p-2">{item.SNo}</td>
//               <td className="border border-gray-500 p-2">{item.OrderId}</td>
//               <td className="border border-gray-500 p-2">{item.Year}</td>
//               <td className="border border-gray-500 p-2">{item.Make}</td>
//               <td className="border border-gray-500 p-2">{item.Model}</td>
//               <td className="border border-gray-500 p-2">{item.DamageType}</td>
//               <td className="border border-gray-500 p-2">{item.Notes}</td>
//               <td className="border border-gray-500 p-2">
//                 <button
//                   className="bg-red-500 text-white p-2 rounded-md hover:bg-green-700 ml-2"
//                   onClick={() => handleDetailsClick(item.wheelId)}
//                 >
//                  Process
//                 </button>
//                 <button
//                   className="bg-red-500 text-white p-2 rounded-md hover:bg-green-700 ml-2"
//                   onClick={() => handleDetailsClick(item.wheelId)}
//                 >
//                  Details
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//         <tbody>
//           {filterStageData(stage3).map((item) => (
//             <tr key={item.wheelId} className="border border-gray-500">
//               <td className="border border-gray-500 p-2">{item.SNo}</td>
//               <td className="border border-gray-500 p-2">{item.OrderId}</td>
//               <td className="border border-gray-500 p-2">{item.Year}</td>
//               <td className="border border-gray-500 p-2">{item.Make}</td>
//               <td className="border border-gray-500 p-2">{item.Model}</td>
//               <td className="border border-gray-500 p-2">{item.DamageType}</td>
//               <td className="border border-gray-500 p-2">{item.Notes}</td>
//               <td className="border border-gray-500 p-2">
//                 <button
//                   className="bg-red-500 text-white p-2 rounded-md hover:bg-green-700 ml-2"
//                   onClick={() => handleDetailsClick(item.wheelId)}
//                 >
//                  Process
//                 </button>
//                 <button
//                   className="bg-red-500 text-white p-2 rounded-md hover:bg-green-700 ml-2"
//                   onClick={() => handleDetailsClick(item.wheelId)}
//                 >
//                  Details
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//         <tbody>
//           {filterStageData(stage4).map((item) => (
//             <tr key={item.wheelId} className="border border-gray-500">
//              <td className="border border-gray-500 p-2">{item.SNo}</td>
//              <td className="border border-gray-500 p-2">{item.OrderId}</td>
//               <td className="border border-gray-500 p-2">{item.Year}</td>
//               <td className="border border-gray-500 p-2">{item.Make}</td>
//               <td className="border border-gray-500 p-2">{item.Model}</td>
//               <td className="border border-gray-500 p-2">{item.DamageType}</td>
//               <td className="border border-gray-500 p-2">{item.Notes}</td>
//               <td className="border border-gray-500 p-2">
//                 <button
//                   className="bg-red-500 text-white p-2 rounded-md hover:bg-green-700 ml-2"
//                   onClick={() => handleDetailsClick(item.wheelId)}
//                 >
//                  Process
//                 </button>
//                 <button
//                   className="bg-red-500 text-white p-2 rounded-md hover:bg-green-700 ml-2"
//                   onClick={() => handleDetailsClick(item.wheelId)}
//                 >
//                  Details
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>  
//       </table>
//       {isModalOpen && selectedWheel && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-white p-4 rounded-md shadow-lg">
//             <h2 className="text-xl font-bold mb-2">Wheel Details</h2>
//             <p><strong>Wheel ID:</strong> {selectedWheel.wheelId}</p>
//             <p><strong>Client Name:</strong> {selectedWheel.clientName}</p>
//             <p><strong>Color Preference:</strong> {selectedWheel.colorPreference}</p>
//             <p><strong>Status:</strong> {selectedWheel.status}</p>
//             <button
//               className="mt-4 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700"
//               onClick={() => handleProcessClick(selectedWheel.stage)}
//             >
//               Process
//             </button>
//             <button
//               className="mt-2 bg-red-500 text-white p-2 rounded-md hover:bg-red-700"
//               onClick={closeModal}
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Worker;


import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Worker() {
  const { userId } = useParams()
  const navigate = useNavigate()
  const [worker, setWorker] = useState(null)
  const [allStages, setAllStages] = useState([])
  const [error, setError] = useState('')
  const [wheels, setWheels] = useState([])
  const [selectedWheel, setSelectedWheel] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)
  const [stageFilter, setStageFilter] = useState("")
  const [damageTypeFilter, setDamageTypeFilter] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [workerResponse, stage1Response, stage2Response, stage3Response, stage4Response, wheelsResponse] = await Promise.all([
          axios.get('http://localhost:3000/workers'),
          axios.get('http://localhost:3000/stage1'),
          axios.get('http://localhost:3000/stage2'),
          axios.get('http://localhost:3000/stage3'),
          axios.get('http://localhost:3000/stage4'),
          axios.get('http://localhost:3000/wheels')
        ])

        const workersData = workerResponse.data
        const stage1Data = stage1Response.data
        const stage2Data = stage2Response.data
        const stage3Data = stage3Response.data
        const stage4Data = stage4Response.data
        const wheelsData = wheelsResponse.data

        const currentWorker = workersData.find(worker => worker.userId === userId)
        if (currentWorker) {
          setWorker(currentWorker)
        } else {
          throw new Error('Worker not found')
        }

        setAllStages([...stage1Data, ...stage2Data, ...stage3Data, ...stage4Data])
        setWheels(wheelsData)

      } catch (err) {
        console.error('Error fetching data:', err.message)
        setError('An error occurred while fetching data.')
      }
    }

    fetchData()
  }, [userId])

  const handleProcessClick = (year) => {
    const stagePaths = {
      '2015': '/inventory',
      '2018': '/soldering',
      '2016': '/painting',
      '2017': '/packaging'
    }

    navigate(stagePaths[year] || '/')
  }

  const handleDetailsClick = (OrderId) => {
    const wheel = wheels.find(w => w.clientName === OrderId)
    if (wheel) {
      setSelectedWheel(wheel)
      setIsModalOpen(true)
    }
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedWheel(null)
  }

  if (error) {
    return <p className="text-red-500 text-center mt-8">{error}</p>
  }

  if (!worker) {
    return <p className="text-center mt-8">Loading...</p>
  }

  const filteredOrders = allStages.filter(order => 
    (!stageFilter || order.stage === stageFilter) &&
    (!damageTypeFilter || order.DamageType === damageTypeFilter)
  )

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredOrders.slice(indexOfFirstItem, indexOfLastItem)

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  return (
    <div className="container mx-auto px-4">
      <header className="flex justify-between items-center p-5 bg-gray-900 text-white rounded-lg shadow-md mb-8">
        <div className="flex space-x-4">
          <button 
            className="flex items-center justify-center px-4 py-2 rounded-md bg-orange-500 hover:bg-orange-600 text-white font-medium"
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

      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200 table-auto w-full text-left border-collapse">
          <thead className="bg-gray-900">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-l font-bold text-white uppercase tracking-wider">S.No</th>
              <th scope="col" className="px-6 py-3 text-left text-l font-bold text-white uppercase tracking-wider">OrderId</th>
              <th scope="col" className="px-6 py-3 text-left text-l font-bold text-white uppercase tracking-wider">Year</th>
              <th scope="col" className="px-6 py-3 text-left text-l font-bold text-white uppercase tracking-wider">Make</th>
              <th scope="col" className="px-6 py-3 text-left text-l font-bold text-white uppercase tracking-wider">Model</th>
              <th scope="col" className="px-6 py-3 text-left text-l font-bold text-white uppercase tracking-wider">DamageType</th>
              <th scope="col" className="px-6 py-3 text-left text-l font-bold text-white uppercase tracking-wider">Notes</th>
              <th scope="col" className="px-6 py-3 text-left text-l font-bold text-white uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentItems.map((item) => (
              <tr key={item.SNo} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.SNo}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.OrderId}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.year}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.make}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.model}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.damageType}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.notes}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button
                    className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 transition duration-300"
                    onClick={() => handleDetailsClick(item.OrderId)}
                  >
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-between items-center">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-teal-500 text-white rounded disabled:bg-gray-300"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-teal-500 text-white rounded disabled:bg-gray-300"
        >
          Next
        </button>
      </div>

      {isModalOpen && selectedWheel && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Order Details</h2>
            <p className="mb-2"><strong>OrderID:</strong> {selectedWheel.clientName}</p>
            <p className="mb-2"><strong>Year:</strong> {selectedWheel.year}</p>
            <p className="mb-2"><strong>Make: </strong>{selectedWheel.make}</p>
            <p className="mb-2"><strong>Model: </strong>{selectedWheel.model}</p>
            <p className="mb-2"><strong>Notes: </strong>{selectedWheel.notes}</p>

            <div className="mt-6 flex justify-end space-x-4">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
                onClick={() => handleProcessClick(selectedWheel.year)}
              >
                Process
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}










// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const Worker = () => {
//   const [pendingTasks, setPendingTasks] = useState([]);
//   const [selectedTask, setSelectedTask] = useState(null);
//   const [openModal, setOpenModal] = useState(false);
//   const workerType = localStorage.getItem('type'); // 1: Inventory, 2: Soldering, 3: Painting, 4: Packaging
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchPendingTasks = async () => {
//       try {
//         let response;
//         switch (workerType) {
//           case '1':
//             response = await axios.get('http://localhost:3000/api/inventory/pending');
//             break;
//           case '2':
//             response = await axios.get('http://localhost:3000/api/soldering/pending');
//             break;
//           case '3':
//             response = await axios.get('http://localhost:3000/api/painting/pending');
//             break;
//           case '4':
//             response = await axios.get('http://localhost:3000/api/packaging/pending');
//             break;
//           default:
//             console.log('Invalid worker type');
//             return;
//         }
//         setPendingTasks(response.data);
//       } catch (error) {
//         console.error('Error fetching pending tasks:', error);
//       }
//     };

//     fetchPendingTasks();
//   }, [workerType]);

//   const handleTaskClick = (task) => {
//     setSelectedTask(task);
//     setOpenModal(true);
//   };

//   const handleNext = () => {
//     setOpenModal(false);
//     switch (workerType) {
//       case '1':
//         navigate('/inventory');
//         break;
//       case '2':
//         navigate('/soldering');
//         break;
//       case '3':
//         navigate('/painting');
//         break;
//       case '4':
//         navigate('/packaging');
//         break;
//       default:
//         console.log('Invalid worker type');
//     }
//   };

//   const handleCloseModal = () => {
//     setOpenModal(false);
//   };

//   return (
//     <div className="p-6 min-h-screen bg-gray-100">
//       <header className="bg-black text-white p-4 rounded-md shadow-md mb-6">
//         <h1 className="text-2xl font-bold">
//           Welcome Worker {workerType}, Here are your Pending Tasks
//         </h1>
//       </header>

//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white border border-gray-300 shadow-md">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="p-4 text-left">Order ID</th>
//               <th className="p-4 text-left">Status</th>
//               <th className="p-4 text-left">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {pendingTasks.map((task) => (
//               <tr key={task.orderId} className="border-t">
//                 <td className="p-4">{task.orderId}</td>
//                 <td className="p-4">{task.status}</td>
//                 <td className="p-4">
//                   <button
//                     className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
//                     onClick={() => handleTaskClick(task)}
//                   >
//                     Next
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Modal for task details */}
//       {openModal && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-white p-6 rounded-md shadow-md w-1/2">
//             {selectedTask && (
//               <div>
//                 <h2 className="text-xl font-semibold mb-4">Order ID: {selectedTask.orderId}</h2>
//                 <div className="space-y-2">
//                   <div>
//                     <strong>Status:</strong> {selectedTask.status}
//                   </div>
//                   <div>
//                     <strong>Notes:</strong> {selectedTask.notes}
//                   </div>
//                 </div>
//                 <div className="mt-4 flex justify-end space-x-4">
//                   <button
//                     className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
//                     onClick={handleCloseModal}
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
//                     onClick={handleNext}
//                   >
//                     Next
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Worker;



