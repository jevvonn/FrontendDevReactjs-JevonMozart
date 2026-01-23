import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { isAuthenticated } from "../service/auth.service";

const Authenticated = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const check = await isAuthenticated();
      if (!check) navigate("/login");
    };

    checkAuth();
  }, [navigate]);

  return <>{children}</>;
};

export default Authenticated;
