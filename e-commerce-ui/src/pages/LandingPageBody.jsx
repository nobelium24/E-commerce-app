import duck from "../freepik17.jpg"
import duck2 from "../fruit4.jpg"
import duck3 from "../showcase6.jpeg"
import axios from "axios"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { height } from "@mui/system"
import Sidenav from "./Sidenav"
const LandingPageBody = () => {

    const url2 = "https://nobelium-store.herokuapp.com/admin/getproducts"
    const [display, setdisplay] = useState([])
    useEffect(() => {
        axios.get(url2).then((res) => {
            // console.log(res);
            // console.log(res.data)
            let result = res
            // console.log(result.data)
            setdisplay(result.data)
            // console.log(display);
        })
    }, [])
    return (
        <>
            <div id="main">
            <div className="d-flex w-100 justify-content-between align-items-center px-3 shadow-lg py-3" id="nameDiv">
                    <Sidenav/>
                    <p className="display-6">Nobelium Stores</p>
                </div>
                <div id="div4" className="">
                    <div className="w-100 bg bg-dark" id="div2">
                        <div id="subdiv1">
                            <h1 className="display-4">
                                Welcome to Nobelium Stores
                            </h1>
                            <p className="display-6 text-muted">Home of diverse products</p>
                            <button id="button1" className="px-2">Make a purchase</button>
                        </div>
                        <div id="sibdiv1">
                            <img src={duck} id="image1" alt="fruits" />
                        </div>
                    </div>

                </div>
                <main className={"container w-100"} style={{ display: "flex", flexWrap: "wrap" }} id={"wole1"}>
                    {display.map((i, wole) => (
                        <div key={wole} className="card card-body m-3 bg bg-dark text-light" style={{ width: "40%", height: "430px" }}>
                            <img src={i.products} alt="" style={{ width: "100%", height: "60%" }} />
                            <p>Name: {i.productName}</p>
                            <p>Description: {i.description}</p>
                            <p>Price: {i.price}</p>
                            <Link className="btn btn-primary w-50" to="/signup">Buy</Link>
                        </div>
                    )
                    )}
                </main>
            </div>
        </>
    )
}
export default LandingPageBody