import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
const UserDashboard = () => {
    const [name, setName] = useState("")
    useEffect(() => {
        if (localStorage.userDetails) {
            setName(JSON.parse(localStorage.userDetails))
        }
    }, [])
    const url2 = "http://localhost:3700/admin/getproducts"
    const [display, setdisplay] = useState([])
    const [toCart, setToCart] = useState("")
    useEffect(() => {
        axios.get(url2).then((res) => {
            let result = res 
            setdisplay(result.data) 
            // console.log(result);
        })
        
    }, [])
    console.log(toCart);
   

   

    return (
        <>
            <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand text-light mb-2" href="#">Nobelium store</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse w-75" id="navbarSupportedContent">
                        <form className="d-flex" style={{ width: "60%" }}>
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item text-light">
                                <a className="nav-link">Welcome {name.firstname}</a>
                            </li>
                            <li className="nav-item text-light">
                                <Link className="nav-link" to={"/"}>Log Out</Link>
                            </li>
                        </ul>

                    </div>
                </div>
            </nav>
            <main className={""} style={{ width: "100%", display: "flex", flexWrap: "wrap" }} id={"wole1"}>
                {display.map((i, wole) => (
                    <div key={wole} className="card card-body m-3 shadow bg-dark text-light" style={{ width: "20%" }}>
                        <img src={i.products} alt="" />
                        <p>Description: {i.description}</p>
                        <p>Price: {i.price}</p>
                        <div>
                            <p>Quantity</p>
                            <input type="number" className="form-control" />
                        </div>
                        <button className="btn btn-primary w-50" onClick={()=>setToCart(i)}>Buy</button>
                    </div>
                )
                )}
            </main>
        </>
    )
}
export default UserDashboard