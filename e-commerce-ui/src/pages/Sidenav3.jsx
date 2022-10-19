import React from 'react'
import { Routes, Route, useNavigate, Router } from "react-router-dom"
import { ShoppingCart } from "@mui/icons-material"
import { Link } from "react-router-dom"
export default function Sidenav3() {
    const navigate = useNavigate()

    const openNav = () => {
        document.getElementById("mySidebar").style.width = "250px";
        document.getElementById("main").style.marginLeft = "250px";
    }

    const closeNav = () => {
        document.getElementById("mySidebar").style.width = "0";
        document.getElementById("main").style.marginLeft = "0";
    }
    const logOut = () => {
        navigate('/')
        var reply = window.confirm("Warning:: You are going to be logged out!")
        if (localStorage.adminToken && reply == true) {
            // window.location.reload()
            localStorage.removeItem('adminToken')
            alert("Logged out successfully")
        }
        else if (localStorage.getItem("adminToken") == null) {
            alert("You are not logged in.")
        }

        else {
            alert("Thank you for staying back.")
        }

    }
    return (
        <>
            <div id="mySidebar" className="sidebar">
                <a href="javascript:void(0)" className="closebtn" onClick={closeNav}>&times;</a>
                <Link className="nav-link" to="/adminsignup">Admin Sign Up</Link>
                <Link className="nav-link" to="/adminsignin">Admin Sign In</Link>
                <Link to="/cart"><ShoppingCart className="text-dark" />Cart</Link>
                <a className="nav-link" onClick={logOut}>Log Out</a>

            </div>

            <div id="main">
                <button className="openbtn" onClick={openNav}>&#9776; </button>
            </div>
        </>
    )
}