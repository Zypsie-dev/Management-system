import { Outlet } from 'react-router-dom';
import NavBar from './NavBar'
import SideBar from './SideBar'

function Layout(){
    return(
        <>
            <NavBar />
            <SideBar />
            <Outlet />
        </>
    );
}
export default Layout;