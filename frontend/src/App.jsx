// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App
import React, { useState, useEffect } from "react";
import { getWorkouts, addWorkout, deleteWorkout } from "./api";

function App() {
  const [workouts, setWorkouts] = useState([]);
  const [exercise, setExercise] = useState("");
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");

  // APIからデータを取得
  useEffect(() => {
    const fetchData = async () => {
      const data = await getWorkouts();
      setWorkouts(data);
    };
    fetchData();
  }, []);

  // 新しいデータを追加
  const handleAddWorkout = async () => {
    const newWorkout = { exercise, sets, reps, weight, date: new Date().toISOString().split("T")[0] };
    const savedWorkout = await addWorkout(newWorkout);
    setWorkouts([...workouts, savedWorkout]);
  };

  // データを削除
  const handleDeleteWorkout = async (id) => {
    await deleteWorkout(id);
    setWorkouts(workouts.filter((workout) => workout.id !== id));
  };

  return (
    <div>
      <h1>筋トレ記録</h1>
      <div className="App">
        <h1>トレーニング統計</h1>
        <WorkoutChart />
      </div>
      <div>
        <input type="text" placeholder="種目" value={exercise} onChange={(e) => setExercise(e.target.value)} />
        <input type="number" placeholder="セット数" value={sets} onChange={(e) => setSets(e.target.value)} />
        <input type="number" placeholder="回数" value={reps} onChange={(e) => setReps(e.target.value)} />
        <input type="number" placeholder="重量(kg)" value={weight} onChange={(e) => setWeight(e.target.value)} />
        <button onClick={handleAddWorkout}>追加</button>
      </div>
      <ul>
        {workouts.map((workout) => (
          <li key={workout.id}>
            {workout.date} - {workout.exercise} {workout.sets}セット × {workout.reps}回 ({workout.weight}kg)
            <button onClick={() => handleDeleteWorkout(workout.id)}>削除</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;