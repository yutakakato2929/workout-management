import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import WorkoutInput from "./WorkoutInput";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
  return (
      <Router>
          <Routes>
              <Route path="/" element={<Login />} />
              <Route element={<PrivateRoute />}>
                  <Route path="/home" element={<Home />} />
                  <Route path="/workout-input" element={<WorkoutInput />} />
              </Route>
          </Routes>
      </Router>
  );
};
export default App;