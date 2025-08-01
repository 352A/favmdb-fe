import { Routes, Route } from "react-router-dom";
import Layout from "@/layout/Layout";
import Dashboard from "@/routes/Dashboard";
import Signup from "@/routes/Signup";
import Login from "@/routes/Login";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  );
}
