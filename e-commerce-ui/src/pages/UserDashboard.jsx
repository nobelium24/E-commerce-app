import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { Toc } from "@mui/icons-material"
import { ShoppingCart } from "@mui/icons-material"
import Sidenav2 from "./SideNav2"
const UserDashboard = () => {
    const navigate = useNavigate()
    const [name, setName] = useState("")
    const token = JSON.parse(localStorage.token)
    useEffect(() => {
        if (localStorage.userDetails) {
            setName(JSON.parse(localStorage.userDetails))
        }
    }, [])
    const url2 = "https://nobelium-store.herokuapp.com/admin/getproducts"
    const url3 = "https://nobelium-store.herokuapp.com/users/postcart"
    const url4 = "https://nobelium-store.herokuapp.com/users/dashcheck"
    const [display, setdisplay] = useState([])
    const [toCart, setToCart] = useState("")
    const [quantity, setQuantity] = useState("")
    useEffect(() => {
        axios.get(url2,
            {
                headers: {
                    "authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            }
        ).then((res) => {

            let result = res
            // setdisplay(result.data)
            setdisplay(result.data)

            // console.log(result);
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

                    }
                    else {
                        navigate('/signin')
                    }
                })
        })

    }, [])
    // console.log(toCart.productName, toCart.price, toCart.description, toCart._id, quantity );

    // console.log(toCart);

    const getCart = (product) => {

        if (quantity === "") {
            alert("Please input quantity")
        }
        else {
            let productName = product.productName
            let price = product.price
            let description = product.description
            let p_id = product._id
            let pImg = product.products
            let email = name.email

            let subTotal = Number(price) * Number(quantity)
            let newCart = { productName, price, description, p_id, pImg, quantity, subTotal, email }
            // console.log(newCart, subTotal);
            axios.post(url3, newCart).then((res) => {
                // console.log(res);
            })
            alert("Added to cart")
            navigate('/dashboard')
        }

    }


     const logOut = () => {
        navigate('/')
        var reply = window.confirm("Warning:: You are going to be logged out!")
        if (localStorage.token && reply == true) {
            // window.location.reload()
            localStorage.removeItem('token')
            alert("Logged out successfully")
        }
        else if (localStorage.getItem("token") === null) {
            alert("You are not logged in.")
        }

        else {
            alert("Thank you for staying back.")
        }

    }


    return (
        <>
        <div id="main">
            <Sidenav2 />
            <nav className="navbar navbar-expand-md navbar-dark bg-dark" id="mainnav">
                <div className="container-fluid">
                    <a className="navbar-brand text-light mb-2" href="#">Nobelium store</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse w-75" id="navbarSupportedContent">
                        <form className="d-flex" style={{ width: "60%" }} id="navForm">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>
                        <ul className="navbar-nav d-flex align-items-center justify-content-around w-25 me-auto mb-2 mb-lg-0" id="listNav">
                            <li className="nav-item text-white">
                                <a className="nav-link">Welcome {name.firstname}</a>
                            </li>
                            <li>
                                <Link to="/cart"><ShoppingCart className="text-white" /></Link>
                            </li>
                            <li className="nav-item text-white">
                                <a onClick={logOut}>Log Out</a>
                            </li>
                        </ul>

                    </div>
                </div>
            </nav>
            <main className={"container"} style={{marginTop:"70px", width: "100%", display: "flex", flexWrap: "wrap" }} id={"wole1"}>
                {display.map((product, wole) => (
                    <div key={wole} className="card card-body m-3 bg bg-dark text-light" style={{ width: "40%", height: "530px" }}>
                        <img src={product.products} alt="" style={{ width: "100%", height: "60%" }}/>
                        <p>Name:{product.productName}</p>
                        <p>Description: {product.description}</p>
                        <p>Price: {product.price}</p>
                        {/* <p>Sub-total: {product.price*quantity}</p> */}
                        <div className="w-100">
                            <p>Quantity</p>
                            <div className="w-100 d-flex">
                                <input type="number"
                                    className="form-control w-25 mx-2"
                                    onChange={(e) => setQuantity(e.target.value)}
                                />
                                {/* <button className="btn btn-primary w-50" onClick={() => setToCart(i)}>Buy</button> */}
                                <button className="btn btn-primary w-50" onClick={() => getCart(product)}>Buy</button>
                            </div>
                        </div>

 
                    </div>
                )
                )}
            </main>
        </div>
        </>
    )
}
export default UserDashboard