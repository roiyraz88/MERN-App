import React from "react";
import { NavLink } from "react-router-dom";
import './NavLinks.css';

function NavLinks(props){
    return <ul className="nav-links">
        <li>
            <NavLink to="/" exsct>ALL USERS</NavLink>
        </li>
        <li>
            <NavLink to="/u1/places" exsct>MY PLACE</NavLink>
        </li>
        <li>
            <NavLink to="/places/new" exsct>ADD PLACE</NavLink>
        </li>
        <li>
            <NavLink to="/auth" exsct>AUTHENTICATE</NavLink>
        </li>
    </ul>
}

export default NavLinks;