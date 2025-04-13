import {Outlet} from "react-router";
import Sidebar from "../../components/dashboardComponents/sidebar.jsx";


function Dashboard(){

    return (
        <div className='flex' >
            <Sidebar/>
            <Outlet/>
        </div>
    )
}

export default Dashboard;