import { Link, useNavigate } from "react-router-dom"
import { useEffect } from 'react'
import LandingPageBody from "./LandingPageBody"
import axios from 'axios'
const LandingPage = () => {
    const navigate = useNavigate()
    const url4 = "https://nobelium-store.herokuapp.com/users/dashcheck"
    useEffect(() => {
        if (localStorage.token) {
            const token = JSON.parse(localStorage.token)
            axios.get(url4,
                {
                    headers: {
                        "authorization": `Bearer ${token}`,
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                    }
                }).then((response) => {
                    // console.log(response.data)
                    if (response.data.message == "verification successful") {
                        navigate('/dashboard')
                    }
                    else {

                    }
                }).catch(err => console.log(err.message))

        }
    }, [])

    return (
        <>
            <nav className="navbar navbar-expand-md navbar-light" id="mainnav">
                <div className="container-fluid">
                    <a className="navbar-brand mb-2 display-4" href="#">Nobelium store</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse w-75 d-flex align-items-center justify-content-center" id="navbarSupportedContent">
                        <ul class="navbar-nav w-50 d-flex justify-content-between">
                            <li className="nav-item" ><Link className="nav-link" to="/signup">User Sign Up</Link></li>
                            <li className="nav-item" ><Link className="nav-link" to="/signin">User Sign In</Link></li>
                            <li className="nav-item" ><Link className="nav-link" to="/adminsignup">Admin Sign Up</Link></li>
                            <li className="nav-item" ><Link className="nav-link" to="/adminsignin">Admin Sign In</Link></li>
                        </ul>



                    </div>
                </div>
            </nav>
            <LandingPageBody />
        </>
    )
}
export default LandingPage