import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Delete } from "@mui/icons-material"
import axios from "axios"
const Admindashboard = () => {
    const [name, setName] = useState("")
    useEffect(() => {
        if (localStorage.adminDetails) {
            setName(JSON.parse(localStorage.adminDetails))
        }
    }, [])
    const url = "http://localhost:3700/admin/postproducts"
    const url2 = "http://localhost:3700/admin/getproducts"
    const url3 = "http://localhost:3700/admin/delete"
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
        axios.get(url2).then((res) => {
            // console.log(res);
            // console.log(res.data)
            let result = res
            // console.log(result.data)
            setdisplay(result.data)
            // console.log(display);
        }).catch((err) => {
            console.log(err);
        })
    }, [])


    return (
        <>
            <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand text-light mb-2" href="#">Nobelium store admin page</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse w-75" id="navbarSupportedContent">
                        <form className="d-flex" style={{ width: "50%" }}>
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item text-light">
                                <a className="nav-link">Welcome {name.firstname}{name.lastname}</a>
                            </li>
                            <li className="nav-item text-light">
                                <Link className="nav-link" to={"/"}>Log Out</Link>
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
                            <p>Product name</p>
                            <input type="text" onChange={(e) => setproductName(e.target.value)} />
                            <p>Product description</p>
                            <textarea name="posts" rows="4" cols="50" className="form-control" onChange={(e) => setdescription(e.target.value)}>

                            </textarea>
                            <p>Product price</p>
                            <input type="text" onChange={(e) => setprice(e.target.value)} />

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={uploadProducts}>Post</button>
                        </div>
                    </div>
                </div>
            </div>

            <main className={""} style={{ width: "100%", display: "flex", flexWrap: "wrap" }} id={"wole1"}>
                {display.map((i, wole) => (
                    <div key={wole} className="card card-body m-3 shadow bg-dark text-light" style={{ width: "200px" }}>
                        <img src={i.products} alt="" style={{ width: "100%", height: "150px" }} />
                        <p>Name:{i.productName}</p>
                        <p>Desc: {i.description}</p>
                        <p>Price: {i.price}</p>
                        <button className="btn btn-danger w-25" onClick={() => deleteProducts(i)}><Delete /></button>
                    </div>
                )
                )}
            </main>

        </>
    )
}
export default Admindashboard