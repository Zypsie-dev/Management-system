import { Outlet } from 'react-router-dom';
import NavBar from './NavBar'
import SideBar from './SideBar'
import { useState } from 'react';
function Layout(){
    const [isOpen, setOpen] = useState(false)
    return(
        <>
            <NavBar isOpen={isOpen} toggle = {setOpen}/>
            <SideBar isOpen={isOpen} toggle = {setOpen}/>
            <Outlet />
        </>
    );
}
export default Layout;