import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import { Toc } from "@mui/icons-material"
import { ShoppingCart } from "@mui/icons-material"
const UserDashboard = () => {
    const [name, setName] = useState("")
    useEffect(() => {
        if (localStorage.userDetails) {
            setName(JSON.parse(localStorage.userDetails))
        }
    }, [])
    const url2 = "http://localhost:3700/admin/getproducts"
    const url3 = "http://localhost:3700/users/postcart"
    const [display, setdisplay] = useState([])
    const [toCart, setToCart] = useState("")
    const [quantity, setQuantity] = useState("")
    useEffect(() => {
        axios.get(url2).then((res) => {
            let result = res
            setdisplay(result.data)
            // console.log(result);
        })

    }, [])
    // console.log(toCart.productName, toCart.price, toCart.description, toCart._id, quantity );

    // console.log(toCart);

    const getCart = (product) => {
        let productName = product.productName
        let price = product.price
        let description = product.description
        let p_id = product._id
        let pImg = product.products
        let newCart = { productName, price, description, p_id, pImg, quantity }
        console.log(newCart);
        axios.post(url3, newCart).then((res) => {
            console.log(res);
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
                                <Link to="/cart"><ShoppingCart className="text-white" /></Link>
                            </li>
                            <li className="nav-item text-white">
                                <Link className="nav-link" to={"/"}>Log Out</Link>
                            </li>
                        </ul>

                    </div>
                </div>
            </nav>
            <main className={"container-fluid"} style={{ width: "100%", display: "flex", flexWrap: "wrap" }} id={"wole1"}>
                {display.map((product, wole) => (
                    <div key={wole} className="card card-body m-3 shadow bg-dark text-light" style={{ width: "200px", minWidth: "" }}>
                        <img src={product.products} alt="" />
                        <p>Name:{product.productName}</p>
                        <p>Description: {product.description}</p>
                        <p>Price: {product.price}</p>
                        {/* <p>Sub-total: {product.price*quantity}</p> */}
                        <div className="w-100">
                            <p>Quantity</p>
                            <div className="w-100 d-flex">
                                <input type="number" className="form-control w-25 mx-2" onChange={(e) => setQuantity(e.target.value)} />
                                {/* <button className="btn btn-primary w-50" onClick={() => setToCart(i)}>Buy</button> */}
                                <button className="btn btn-primary w-50" onClick={() => getCart(product)}>Buy</button>
                            </div>
                        </div>


                    </div>
                )
                )}
            </main>
        </>
    )
}
export default UserDashboard