import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Delete } from "@mui/icons-material"
import axios from "axios"
import Sidenav from "./Sidenav"
import Sidenav3 from "./Sidenav3"
const Admindashboard = () => {
    const navigate = useNavigate()
    const [name, setName] = useState("")
    const token = JSON.parse(localStorage.adminToken)
    useEffect(() => {
        if (localStorage.adminDetails) {
            setName(JSON.parse(localStorage.adminDetails))
        }
    }, [])
    const url = "https://nobelium-store.herokuapp.com/admin/postproducts"
    const url2 = "https://nobelium-store.herokuapp.com/admin/getproducts"
    const url3 = "https://nobelium-store.herokuapp.com/admin/delete"
    const url4 = "https://nobelium-store.herokuapp.com/admin/dashcheck"
    const [files, setfiles] = useState("")
    const [description, setdescription] = useState("")
    const [price, setprice] = useState("")
    const [productName, setproductName] = useState("")
    const pickFile = (e) => {
        const file = e.target.files[0]
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
            const myResult = reader.result
            setfiles(myResult)
        }

    }
    const uploadProducts = () => {
        const productsData = { files, description, price, productName }
        console.log(productsData);
        // const productsDesc = { posts }
        // const productPrice = { price }
        axios.post(url, productsData).then((res) => {
            console.log(res);
        })
    }
    // const [del, setDel] = useState("")
    const deleteProducts = (i) => {
        axios.post(url3, i).then((res) => {
            console.log(res, 33);
        })
    }
    const [display, setdisplay] = useState([])
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
            setdisplay(result.data)
            axios.get(url4,
                {
                    headers: {
                        "authorization": `Bearer ${token}`,
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                    }
                }).then((res) => {
                    console.log(res.data);
                    if (res.data.message == "verification successful") {

                    }
                    else {
                        navigate("/")
                    }
                })

        }).catch((err) => {
            console.log(err);
        })
    }, [])
    const logOut = () => {
        navigate('/')
        var reply = window.confirm("Warning:: You are going to be logged out!")
        if (localStorage.adminToken && reply == true) {
            // window.location.reload()
            localStorage.removeItem('adminToken')
            alert("Logged out successfully")
        }
        else if (localStorage.getItem("adminToken") == null) {
            alert("You are not logged in.")
        }

        else {
            alert("Thank you for staying back.")
        }

    }



    return (
        <>
            <div id="main">
                <Sidenav3 />
                <nav className="navbar navbar-expand-md navbar-dark bg-dark" id="mainnav">
                    <div className="container-fluid">
                        <a className="navbar-brand text-light mb-2" href="#">Nobelium store admin page</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse w-75" id="navbarSupportedContent">
                            <form className="d-flex" style={{ width: "50%" }} id="navForm">
                                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                                <button className="btn btn-outline-success" type="submit">Search</button>
                            </form>
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0" id="listNav">
                                <li className="nav-item text-light">
                                    <a className="nav-link">Welcome {name.firstname}{name.lastname}</a>
                                </li>
                                <li className="nav-item text-light">
                                    <a onClick={logOut}>Log Out</a>
                                </li>
                            </ul>

                        </div>
                    </div>
                </nav>

                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                    Post products
                </button>

                <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">

                            <div className="modal-body">
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>

                                <p>Product image</p>
                                <input type="file" name="" id="" onChange={(e) => pickFile(e)} />

                                <input type="text" onChange={(e) => setproductName(e.target.value)} placeholder="Product Name" className="my-3" />

                                <textarea placeholder="Product Description" name="posts" rows="4" cols="50" className="form-control my-3" onChange={(e) => setdescription(e.target.value)}>

                                </textarea>

                                <input type="text" onChange={(e) => setprice(e.target.value)} placeholder="Product Price" className="my-3" />

                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={uploadProducts}>Post</button>
                            </div>
                        </div>
                    </div>
                </div>

                <main className={"container"} style={{ width: "100%", display: "flex", flexWrap: "wrap" }} id={"wole1"}>
                    {display.map((i, wole) => (
                        <div key={wole} className="card card-body m-3 bg bg-dark text-light" style={{ width: "40%", height: "400px" }}>
                            <img src={i.products} alt="" style={{ width: "100%", height: "150px" }} />
                            <p>Name: {i.productName}</p>
                            <p>Desc: {i.description}</p>
                            <p>Price: {i.price}</p>
                            <button className="btn btn-danger w-25" onClick={() => deleteProducts(i)}><Delete /></button>
                        </div>
                    )
                    )}
                </main>
            </div>

        </>
    )
}
export default Admindashboard