import React, { useState, useEffect } from "react";
import { getWorkouts, addWorkout, deleteWorkout } from "./api";
import WorkoutChart from './components/WorkoutChart';

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
      <h1>トレーニング統計</h1>
      <WorkoutChart />
    </div>
  );
}

export default App;