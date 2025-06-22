import { Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "../pages/LoginForm";
import AdminDashboard from "../pages/AdminDashboard";
import NotFound from "../pages/NotFound";

const AppRoutes = ({ isAuthenticated }) => {
  return (
    <Routes>
      <Route path="/login" element={<LoginForm />} />
      <Route
        path="/admin"
        element={isAuthenticated ? <AdminDashboard /> : <Navigate to="/login" />}
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
