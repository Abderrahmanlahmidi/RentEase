import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../context/userContext";
import { useContext } from "react";

export default function ProtectedProfile() {
    const { user, loading } = useContext(UserContext);

    if (loading) {
        return <div>Loading...</div>;
    }

    return user ? <Outlet /> : <Navigate to="/unauthorized" />;
}