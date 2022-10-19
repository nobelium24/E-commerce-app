
import React from 'react'
import { Routes, Route, useNavigate, Router } from "react-router-dom"
import { Link } from "react-router-dom"
export default function Sidenav() {
    const navigate = useNavigate()

    const openNav = () => {
        document.getElementById("mySidebar").style.width = "250px";
        document.getElementById("main").style.marginLeft = "250px";
    }

    const closeNav = () => {
        document.getElementById("mySidebar").style.width = "0";
        document.getElementById("main").style.marginLeft = "0";
    }
    // const logoutt = () => {
    //     navigate('/')
    //     var reply = window.confirm("Warning:: You are going to be logged out!")
    //     if (localStorage.token && reply == true) {
    //         // window.location.reload()
    //         localStorage.removeItem('token')
    //         alert("Logged out successfully")
    //     }
    //     else if (localStorage.getItem("token") === null) {
    //         alert("You are not logged in.")
    //     }

    //     else {
    //         alert("Thank you for staying back.")
    //     }

    // }
    return (
        <>
            <div id="mySidebar" className="sidebar">
                <a href="javascript:void(0)" className="closebtn" onClick={closeNav}>&times;</a>
                <Link className="nav-link" to="/signup">User Sign Up</Link>
                <Link className="nav-link" to="/signin">User Sign In</Link>
                <Link className="nav-link" to="/adminsignup">Admin Sign Up</Link>
                <Link className="nav-link" to="/adminsignin">Admin Sign In</Link>

            </div>

            <div id="main">
                <button className="openbtn" onClick={openNav}>&#9776; </button>
            </div>
        </>
    )
}