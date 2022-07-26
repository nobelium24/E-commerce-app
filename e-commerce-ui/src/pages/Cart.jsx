import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import { Delete } from "@mui/icons-material"
const Cart = () => {
    const [name, setName] = useState("")
    const [display, setDisplay] = useState([])
    
    useEffect(() => {
        if (localStorage.userDetails) {
            setName(JSON.parse(localStorage.userDetails))
        }
    }, [])

    const url = "http://localhost:3700/users/getcart"
    const url2 = "http://localhost:3700/users/deletecart"
    useEffect(() => {
        axios.get(url).then((res) => {
            console.log(res);
            setDisplay(res.data)
        })
    }, [])
    let sub
    const deleteProducts = (i) => {
        axios.post(url2, i).then((res) => {
            console.log(res, 33);
        })
    }
     

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
                        <ul className="navbar-nav d-flex align-items-center justify-content-around w-25 me-auto mb-2 mb-lg-0">
                            <li className="nav-item text-white">
                                <a className="nav-link">Welcome {name.firstname}</a>
                            </li>
                            <li>
                                {/* <Link to="/cart"><ShoppingCart className="text-white" /></Link> */}
                            </li>
                            <li className="nav-item text-white">
                                <Link className="nav-link" to={"/"}>Log Out</Link>
                            </li>
                        </ul>

                    </div>
                </div>
            </nav>

            <main className="w-75 container-fluid d-flex flex-column justify-content-center align-items-center">
                {display.map((i, wole) => (
                    <div key={wole} className="w-50 card shadow bg-dark text-light d-flex flex-column justify-content-center align-items-center my-2 py-3">
                        
                        <img src={i.image} alt="" className="w-50" />
                        <h5>Product Name: {i.productName}</h5>
                        <h5>Description: {i.description}</h5>
                        <h5>Price: {i.price}</h5>
                        <h5>Sub-total: {sub=i.price*i.quantity}</h5>
                        <button className="btn btn-danger w-25" onClick={() => deleteProducts(i)}><Delete />Remove</button>
                        {/* {i.reduce((accumulator, object)=>(
                        <h1>{accumulator + object.price}</h1>
                       ))} */}
                    </div>
                ))}
            </main>
            <div className="w-25">
                <button className="btn btn-success" onClick={()=>console.log(sub)}>Checkout</button>
            </div>
        </>
    )
}
export default Cart