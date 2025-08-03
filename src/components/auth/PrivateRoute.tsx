import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";
import { Spinner } from "../ui/spinner";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading)
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Spinner variant="ellipsis" />
      </div>
    );

  if (!user) return <Navigate to="/login" />;

  return <>{children}</>;
};

export default PrivateRoute;
