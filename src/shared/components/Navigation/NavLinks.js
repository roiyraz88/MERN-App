import React, {useContext} from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../contex/auth-contex";
import './NavLinks.css';

function NavLinks(props){
    const auth = useContext(AuthContext);

    return <ul className="nav-links">
        <li>
            <NavLink to="/" exsct>ALL USERS</NavLink>
        </li>
        {auth.isLoggedIn && <li>
            <NavLink to="/u1/places" exsct>MY PLACES</NavLink>
        </li>}
        {auth.isLoggedIn && <li>
            <NavLink to="/places/new" exsct>ADD PLACE</NavLink>
        </li>}
        {!auth.isLoggedIn && <li>
            <NavLink to="/auth" exsct>AUTHENTICATE</NavLink>
        </li>}
        {auth.isLoggedIn && (
            <li>
                <button onClick={auth.logout}>
                    LOGOUT
                </button>
            </li>
        )}
    </ul>
}

export default NavLinks;