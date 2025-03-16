import {Navigate, Outlet} from "react-router-dom";



export default function protectedRoutes({role, allowedRole}){
    return role === allowedRole ? (<Outlet />) : (<Navigate to="/unauthorized" />);
}