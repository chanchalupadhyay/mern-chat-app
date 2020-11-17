import React from "react";
import { Link } from "react-router-dom";
import "./styles/navbar.css"

const navigation = () => (


    <nav className="navbar navbar-expand-lg bg-dark m-2 text-white ">


            <ul className=" navbar-flex">
                <li className="navbar-item"><Link className="nav-link" to="/register">Register</Link></li>
                <li className="navbar-item"><Link className="nav-link"to="/logout">Logout</Link></li>
            </ul>
    </nav>

 
)
export default navigation;