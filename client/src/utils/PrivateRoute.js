// PrivateRoute.jsx
import React from "react";
import { Navigate, Route } from "react-router-dom";

const PrivateRoute = ({ element }) => {
  const token = localStorage.getItem("token");

  return token ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
