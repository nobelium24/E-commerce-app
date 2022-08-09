import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { Delete } from "@mui/icons-material"
import { PaystackButton } from 'react-paystack';
// require('dotenv').config()
const Cart = () => {
    const [name, setName] = useState("")
    const [display, setDisplay] = useState([])
    const [total, setTotal] = useState("")
    const url = "http://localhost:3700/users/getcart"
    const url2 = "http://localhost:3700/users/deletecart"
    const url3 = "http://localhost:3700/users/clearcart"
    const navigate = useNavigate()
    useEffect(() => {
        if (localStorage.userDetails) {
            const something = JSON.parse(localStorage.userDetails)
            setName(JSON.parse(localStorage.userDetails))
            axios.post(url, { email: something.email }).then((res) => {

                // console.log(res);
                setDisplay(res.data)

                const sum = res.data.reduce((accumulator, object) => {
                    return Number(accumulator) + Number(object.subTotal);
                }, 0);
                // console.log(sum);
                setTotal(sum)

            })
        }
        setName(JSON.parse(localStorage.userDetails))
    }, [])

    let sub
    const deleteProducts = (i) => {
        axios.post(url2, i).then((res) => {
            // console.log(res);
        })
    }
    const something = JSON.parse(localStorage.userDetails)
    let payCart = something.email
    const checkOut = () => {
        axios.post(url3,{email:payCart} ).then((res)=>{
            // console.log(res);
        })
       
    }



    const config = {
        reference: (new Date()).getTime().toString(),
        email: name.email,
        amount: total*100,
        publicKey: `${process.env.REACT_APP_PUBLIC_KEY}`,
    };

    const handlePaystackSuccessAction = (reference) => {
        // Implementation for whatever you want to do with reference and after success call.
        console.log(reference);
    };
    const handlePaystackCloseAction = () => {
        // implementation for  whatever you want to do when the Paystack dialog closed.
        console.log('closed')
    }

    const componentProps = {
        ...config,
        text: 'Make payment',
        onSuccess: () =>
        checkOut(),
      onClose: () => alert("Oh oh..."),
    };


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

            <section className="w-100 container d-flex flex-row">
                <main className="w-75 container d-flex flex-column justify-content-center align-items-center">
                    {display.map((i, wole) => (
                        <div key={wole} className="w-75 card shadow bg-dark text-light d-flex flex-column justify-content-center align-items-center my-2 py-3">

                            <img src={i.image} alt="" className="w-50" style={{ height: "200px" }} />
                            <h5>Product Name: {i.productName}</h5>
                            {/* <h5>Description: {i.description}</h5> */}
                            {/* <h5>Price: {i.price}</h5> */}
                            <h5>Sub-total: {sub = i.price * i.quantity}</h5>
                            <button className="btn btn-danger w-25" onClick={() => deleteProducts(i)}><Delete />Remove</button>
                        </div>
                    ))}

                </main>
                <div className="card w-25 m-5 p-3 bg-dark text-light" style={{ height: "150px" }}>
                    <h5>Cart Summary</h5>
                    <p>Sub-total: {total}</p>
                    <PaystackButton {...componentProps} className="btn btn-success" onClick={checkOut} />
                    {/* <button className="btn btn-success" onClick={()=>checkOut()}>Checkout {total}</button> */}
                </div>
            </section>

        </>
    )
}
export default Cart