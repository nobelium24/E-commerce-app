import { Link } from "react-router-dom"
import LandingPageBody from "./LandingPageBody"

const LandingPage = () => {
    return (
        <>
            <nav className="navbar navbar-expand-md navbar-light bg-dark text-light">
                <div className="container-fluid">
                    <a className="navbar-brand text-light mb-2" href="#">Nobelium store</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse w-75" id="navbarSupportedContent">
                        <form className="d-flex w-75" id="navForm">
                            <input className="form-control me-2 w-100" type="search" placeholder="Search" aria-label="Search" />
                            <button className ="btn btn-outline-success" type ="submit">Search</button>
                        </form>
                        <div className="d-flex text-light dropdown">
                            <a className="nav-link dropdown-toggle text-light" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                My Account
                            </a>
                            <ul className="dropdown-menu text-light" aria-labelledby="navbarDropdown" >
                                <li><Link className="dropdown-item" to="/signup">Sign Up</Link></li>
                                <li><Link className="dropdown-item" to="/signin">Sign In</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
            <LandingPageBody />
        </>
    )
}
export default LandingPage