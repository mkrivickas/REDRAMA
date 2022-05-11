import React from "react";
import { useState, useEffect } from "react";

//import react pro sidebar components
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";

import { FiHome, FiLogOut, FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi";
import { BiTrendingDown } from "react-icons/bi";
import {BiTrendingUp } from "react-icons/bi";
import {FcSettings } from "react-icons/fc";

//import sidebar css from react-pro-sidebar module and our custom css 
import "react-pro-sidebar/dist/css/styles.css";
// import "./Sidebar.css";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import logo from './logo.png';

const Sidebar = (props) => (
<>
  <div class="area"> 
  {/* <div class="main-header"><ul>
              <li className="logo icon-logo">
                <img src={logo} width="50"  />
                </li>
</ul>  
    </div> */}
       <nav class="main-menu">
           
<ul>
                <li className="has-subnav">
                <Link className='LinkName titleAndLogo' to="/"><img className='imgLogo logo'  src={logo} /><span className="nav-text">
                REDRAMA</span></Link>
                </li>

                <li className="has-subnav ">
               <Link className='LinkName' to="/pajamos"><i className="icon-up "><BiTrendingUp /></i><span className="nav-text ">Pajamos</span></Link>  
                </li>

                <li className="has-subnav">
                <Link className='LinkName' to="/islaidos"><i className="icon-up"><BiTrendingDown /></i><span className="nav-text "> Išlaidos</span></Link>  
                </li>

                <li className="has-subnav">
                <Link className='LinkName' to="/admin"><i className="icon-up"><FcSettings color= "#f1de6d"/></i><span className="nav-text " >Valdymas</span></Link>
                </li>
               </ul>

            <ul className="logout">
                <li className="logoutLine">
                <i className="logoutIcon" onClick={()=>{props.logout()}} ><FiLogOut color="#f1de6d"/></i><span className="nav-text">Atsijungti</span>
                </li>  
               
            </ul>
        </nav>
   </div>
  
  </>  
)
export default Sidebar;
