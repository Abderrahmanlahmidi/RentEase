import {Navigate, Outlet} from "react-router-dom";

export default function protectedProfile({user}) {
    return user ? (<Outlet/>) : (<Navigate to="/unauthorized"/>);
}