import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Worker = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [worker, setWorker] = useState(null);
  const [stage1, setStage1] = useState([]);
  const [stage2, setStage2] = useState([]);
  const [stage3, setStage3] = useState([]);
  const [stage4, setStage4] = useState([]);
  const [error, setError] = useState('');
  const [wheels, setWheels] = useState([]);
  const [selectedWheel, setSelectedWheel] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchWorkerData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/workers`);
        if (!response.ok) {
          throw new Error('Worker data not found');
        }
        const workersData = await response.json();
        const currentWorker = workersData.find(worker => worker.userId === userId);
        if (currentWorker) {
          setWorker(currentWorker);
        } else {
          throw new Error('Worker not found');
        }
      } catch (err) {
        console.error('Error fetching worker data:', err.message);
        setError('An error occurred while fetching worker data.');
      }
    };

    const fetchStageData = async () => {
      try {
        const [stage1Response, stage2Response, stage3Response, stage4Response] = await Promise.all([
          fetch('http://localhost:3000/stage1'),
          fetch('http://localhost:3000/stage2'),
          fetch('http://localhost:3000/stage3'),
          fetch('http://localhost:3000/stage4')
        ]);

        const [stage1Data, stage2Data, stage3Data, stage4Data] = await Promise.all([
          stage1Response.json(),
          stage2Response.json(),
          stage3Response.json(),
          stage4Response.json()
        ]);

        setStage1(stage1Data);
        setStage2(stage2Data);
        setStage3(stage3Data);
        setStage4(stage4Data);
      } catch (err) {
        console.error('Error fetching stage data:', err.message);
        setError('An error occurred while fetching stage data.');
      }
    };

    const fetchWheelData = async () => {
      try {
        const response = await fetch('http://localhost:3000/wheels');
        if (!response.ok) {
          throw new Error('Wheel data not found');
        }
        const wheelsData = await response.json();
        setWheels(wheelsData);
      } catch (err) {
        console.error('Error fetching wheel data:', err.message);
        setError('An error occurred while fetching wheel data.');
      }
    };

    fetchWorkerData();
    fetchStageData();
    fetchWheelData();
  }, [userId]);

  const filterStageData = (stageData) => {
    return stageData.filter(item => item.userId === userId && item.status === 'pending');
  };

  const handleProcessClick = (stage) => {
    const stagePaths = {
      '1': `/inventory`,
      '2': `/soldering`,
      '3': `/painting`,
      '4': `/packaging`
    };

    navigate(stagePaths[stage] || '/');
  };

  const handleDetailsClick = (wheelId) => {
    const wheel = wheels.find(w => w.wheelId === wheelId);
    if (wheel) {
      setSelectedWheel(wheel);
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedWheel(null);
  };

  if (error) {
    return <p>{error}</p>;
  }
  if (!worker) {
    return <p>Loading...</p>;
  }
  return (
    <div>
      <header className="flex justify-between items-center p-5 rounded-md bg-black shadow-md border border-gray-200">
        <div className="flex space-x-4">
          <button 
            className="border border-gray-300 font-bold text-white p-2 rounded-md shadow-sm hover:bg-gray-200 hover:text-black transition"
            onClick={() => navigate('/login')} 
          >
            PREVIOUS
          </button>
          <h1 className="text-xl text-white pt-1 font-bold">ORDERS LIST</h1>
        </div>
        <button 
          className="border border-red-400 p-2 rounded-md shadow-sm font-bold text-red-500 hover:bg-red-100 transition"
          onClick={() => navigate('/')}
        >
          LOGOUT
        </button>
      </header>
      <h1>{worker.name}</h1>
      <p>Role: {worker.role}</p>
      <h3>ORDERS DATA</h3>
      <table className="table-auto border-collapse border border-gray-300">
        <tbody>
          {filterStageData(stage1).map((item) => (
            <tr key={item.wheelId} className="border border-gray-500">
              <td className="border border-gray-500 p-2">{item.wheelId}</td>
              <td className="border border-gray-500 p-2">{item.status}</td>
              <td className="border border-gray-500 p-2">
                <button
                  className="bg-green-500 text-white p-2 rounded-md hover:bg-green-700 ml-2"
                  onClick={() => handleDetailsClick(item.wheelId)}
                >
                  Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tbody>
          {filterStageData(stage2).map((item) => (
            <tr key={item.wheelId} className="border border-gray-500">
              <td className="border border-gray-500 p-2">{item.wheelId}</td>
              <td className="border border-gray-500 p-2">{item.status}</td>
              <td className="border border-gray-500 p-2">
                <button
                  className="bg-green-500 text-white p-2 rounded-md hover:bg-green-700 ml-2"
                  onClick={() => handleDetailsClick(item.wheelId)}
                >
                  Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tbody>
          {filterStageData(stage3).map((item) => (
            <tr key={item.wheelId} className="border border-gray-500">
              <td className="border border-gray-500 p-2">{item.wheelId}</td>
              <td className="border border-gray-500 p-2">{item.status}</td>
              <td className="border border-gray-500 p-2">
                <button
                  className="bg-green-500 text-white p-2 rounded-md hover:bg-green-700 ml-2"
                  onClick={() => handleDetailsClick(item.wheelId)}
                >
                  Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tbody>
          {filterStageData(stage4).map((item) => (
            <tr key={item.wheelId} className="border border-gray-500">
              <td className="border border-gray-500 p-2">{item.wheelId}</td>
              <td className="border border-gray-500 p-2">{item.status}</td>
              <td className="border border-gray-500 p-2">
                <button
                  className="bg-green-500 text-white p-2 rounded-md hover:bg-green-700 ml-2"
                  onClick={() => handleDetailsClick(item.wheelId)}
                >
                  Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>  
      </table>
      {isModalOpen && selectedWheel && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-md shadow-lg">
            <h2 className="text-xl font-bold mb-2">Wheel Details</h2>
            <p><strong>Wheel ID:</strong> {selectedWheel.wheelId}</p>
            <p><strong>Client Name:</strong> {selectedWheel.clientName}</p>
            <p><strong>Color Preference:</strong> {selectedWheel.colorPreference}</p>
            <p><strong>Status:</strong> {selectedWheel.status}</p>
            <button
              className="mt-4 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700"
              onClick={() => handleProcessClick(selectedWheel.stage)}
            >
              Process
            </button>
            <button
              className="mt-2 bg-red-500 text-white p-2 rounded-md hover:bg-red-700"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Worker;

