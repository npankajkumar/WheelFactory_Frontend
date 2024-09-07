import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Worker = () => {
  const {userId } = useParams(); 
  const [worker, setWorker] = useState(null); 
  const [stage1Data, setStage1Data] = useState([]);
  const [stage2Data, setStage2Data] = useState([]);
  const [stage3Data, setStage3Data] = useState([]);
  const [stage4Data, setStage4Data] = useState([]);
  const [error, setError] = useState(''); 

  useEffect(() => {
   
    const fetchWorkerData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/workers/${userId}`);
        const workerData = await response.json();
        if (workerData) {
          setWorker(workerData);
        } else {
          setError('Worker data not found');
        }
      } catch (err) {
        console.error('Error fetching worker data:', err);
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

        const [stage1, stage2, stage3, stage4] = await Promise.all([
          stage1Response.json(),
          stage2Response.json(),
          stage3Response.json(),
          stage4Response.json()
        ]);
        setStage1Data(stage1.filter(item => item.userId === userId));
        setStage2Data(stage2.filter(item => item.userId === userId));
        setStage3Data(stage3.filter(item => item.userId === userId));
        setStage4Data(stage4.filter(item => item.userId === userId));
      } catch (err) {
        console.error('Error fetching stage data:', err);
        setError('An error occurred while fetching stage data.');
      }
    };

    fetchWorkerData();
    fetchStageData();
  }, [userId]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!worker) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Stage 1 Data:</h2>
      <ul>
        {stage1Data.map((item) => (
          <li key={item.wheelId}>{item.make} - {item.model} ({item.status})</li>
        ))}
      </ul>
      <h2>Stage 2 Data:</h2>
      <ul>
        {stage2Data.map((item) => (
          <li key={item.wheelId}>{item.sandblastingNote} - {item.sandblastingAmount} ({item.status})</li>
        ))}
      </ul>
      <h2>Stage 3 Data:</h2>
      <ul>
        {stage3Data.map((item) => (
          <li key={item.wheelId}>{item.paintingNote} - {item.color} ({item.status})</li>
        ))}
      </ul>
      <h2>Stage 4 Data:</h2>
      <ul>
        {stage4Data.map((item) => (
          <li key={item.wheelId}>{item.packagingNote} - Rating: {item.finalInspectionRating} ({item.status})</li>
        ))}
      </ul>
    </div>
  );
};

export default Worker;
