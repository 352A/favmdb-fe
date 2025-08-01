import { Outlet } from "react-router-dom";
import PrivateRoute from "@/components/auth/PrivateRoute";

export default function Layout() {
  return (
    <PrivateRoute>
      <Outlet />
    </PrivateRoute>
  );
}
