import axios from "axios";

// const API_URL = "http://127.0.0.1:8000/api/workouts/";

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

// Django API のベースURL
const API_URL = "http://127.0.0.1:8000/api/auth/";

const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// JWT トークンをセットする関数
export const setAuthToken = (token) => {
    if (token) {
        api.defaults.headers["Authorization"] = `Bearer ${token}`;
        localStorage.setItem("access_token", token);
    } else {
        delete api.defaults.headers["Authorization"];
        localStorage.removeItem("access_token");
    }
};

export default api;