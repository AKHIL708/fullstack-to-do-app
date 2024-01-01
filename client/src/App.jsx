// App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import TodoApplication from "./components/todoApp/TodoApplication.jsx";
import Login from "./components/login/Login.jsx";
import PrivateRoute from "./utils/PrivateRoute.js";

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/:userId"
        element={<PrivateRoute element={<TodoApplication />} />}
      />
      <Route
        path="*"
        element={<PrivateRoute element={<TodoApplication />} />}
      />

    </Routes>
  );
};

export default App;
