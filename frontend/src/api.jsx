import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/workouts/";

// 全データを取得
export const getWorkouts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// 新しいデータを追加
export const addWorkout = async (workout) => {
  const response = await axios.post(API_URL, workout);
  return response.data;
};

// データを削除
export const deleteWorkout = async (id) => {
  await axios.delete(`${API_URL}${id}/`);
};