import React, { useState } from "react";
import { AiOutlineHome as Home } from "react-icons/ai";
import { AiOutlineFolder as Topic } from "react-icons/ai";
import { AiTwotoneFolderOpen as Chapter } from "react-icons/ai";
import { AiOutlineSetting as Setting } from "react-icons/ai";
import { NavLink } from "react-router-dom";
const iconMap = {
    Home: <Home />,
    Nonlinear: <Topic />,
    Setting: <Setting />,
    Chapter: <Chapter />
};
const linkMap ={
    Home: "/",
    Nonlinear: "/calculator",
    Setting: "/setting"
}
function MenuItem(props){
    const { title, names} = props;
    return (
        <ul className="menu_items">
            <div className={`menu_title ${title}`}></div>
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
    const Topics = ["Nonlinear"];
    const dashboard = ["Home"];
    const setting = ["Setting"];
    return(
    <nav className="sidebar">
        <div className="menu_content">
            <MenuItem title="menu_dahsboard" names={dashboard}/>
                <MenuItem title="menu_chapter" names= {Topics}/>
            <MenuItem title="menu_setting" names={setting}/>
        </div>
    </nav>
    )
}
export default SideBar;