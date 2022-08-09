import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { PaystackButton } from 'react-paystack';

const Checkout = () => {
    const [name, setName] = useState("")
    const [total, setTotal] = useState("")
    const something = JSON.parse(localStorage.userDetails)
    useEffect(() => {
        if (localStorage.userDetails) {
            // const something = JSON.parse(localStorage.userDetails)
            setName(JSON.parse(localStorage.userDetails))
            setTotal(JSON.parse(localStorage.totalPrice))

        }
        setName(JSON.parse(localStorage.userDetails))
    }, [])
    const config = {
        reference: (new Date()).getTime().toString(),
        email: name.email,
        amount: total,
        publicKey: "",
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
        text: 'Paystack Button Implementation',
        onSuccess: (reference) => handlePaystackSuccessAction(reference),
        onClose: handlePaystackCloseAction,
    };


    return (
        <>
            <main>
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

                <PaystackButton {...componentProps} />
            </main>
        </>
    )
}
export default Checkout