import React, { useState } from "react";
import { AiOutlineDashboard as Dashboard } from "react-icons/ai";
import { MdOutlineInventory2 as Inventory } from "react-icons/md";
import { AiOutlineSetting as Setting } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import iconPath from "../resources/main_logo.png";
const iconMap = {
    Dashboard: <Dashboard/>,
    Inventoty: <Inventory/>,
    Setting: <Setting/>
};
const linkMap ={
    Dashboard: "/",
    Inventoty: "/inventory",
    Setting: "/setting"
}
function MenuItem(props){
    const names = props.names;
    return (
        <ul className="menu_items">
            {names.map((name,index) => (
                    <li key={index} className="item">
                        <NavLink to= { linkMap[name]} className={({ isActive }) => (isActive ? "nav_link submenu_item active" : "nav_link submenu_item")}>
                            <span className="navlink_icon">
                                {iconMap[name]}
                            </span>
                            <span className="navlink">{name}</span>
                        </NavLink>
                    </li>
                    )
                )
            }
        </ul>
    );
}

function SideBar (){
    const Topics = ["Dashboard","Inventoty","Setting"];
    return(
    <nav className="sidebar">
        <div className="sideHead">
            <img src= {iconPath} className="main_logo"/>
            <h4>Management System</h4>
        </div>
        <div className="sideContent">
            <MenuItem names= {Topics}/>
        </div>
        <div className="sideFoot">
        </div>
    </nav>
    )
}
export default SideBar;