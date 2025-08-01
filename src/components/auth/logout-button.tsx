import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "../ui/button";

export const LogoutButton = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout();
      toast.success("Logged out successfully");
      navigate("/login");
    } catch {
      toast.error("Logout failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant="link"
      onClick={handleLogout}
      disabled={loading}
      className={`w-full cursor-pointer disabled:cursor-not-allowed disabled:opacity-50`}
    >
      {loading ? "Logging out..." : "Logout"}
    </Button>
  );
};
