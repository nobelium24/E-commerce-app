import duck from "../body.jpg"
import duck2 from "../stutern.jpg"
import duck3 from "../showcase6.jpeg"
import axios from "axios"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
const LandingPageBody = () => {
    
    const url2 = "http://localhost:3700/admin/getproducts"
    const [display, setdisplay] = useState([])
    useEffect(() => {
        axios.get(url2).then((res) => {
            console.log(res);
            console.log(res.data)
            let result = res
            console.log(result.data)
            setdisplay(result.data)
            console.log(display);
        })
    }, [])
    return (
        <>
            <div id="div4" className="">
                <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    </div>
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img src={duck} alt="" id="img2" className="d-block w-100" />
                        </div>
                        <div className="carousel-item">
                            <img src={duck2} alt="" id="img2" className="d-block w-100" />
                        </div>
                        <div className="carousel-item">
                            <img src={duck3} alt="" id="img2" className="d-block w-100" />
                        </div>
                    </div>
                </div>

            </div>
            <main className={""} style={{ width: "100%", display: "flex", flexWrap: "wrap" }} id={"wole1"}>
                {display.map((i, wole) => (
                    <div key={wole} className="card card-body m-3 shadow bg-dark text-light" style={{ width: "20%" }}>
                        <img src={i.products} alt="" />
                        <p>Description: {i.description}</p>
                        <p>Price: {i.price}</p>
                        <Link className="btn btn-primary w-50" to="/signp">Buy</Link>
                    </div>
                )
                )}
            </main>
        </>
    )
}
export default LandingPageBody