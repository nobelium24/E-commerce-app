import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router"
import { useFormik } from "formik"
import * as yup from "yup"

const Adminsignin = () => {
    const navigate = useNavigate()
    const url = "https://nobelium-store.herokuapp.com/admin/signin"
    const [status, setstatus] = useState("")
    const [message, setmessage] = useState("")
    const [userResult, setUserResult] = useState("")

   

    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        onSubmit: (values) => {
            const logIn = values
            axios.post(url, logIn).then((res) => {
                console.log(res);
                setstatus(res.data.status)
                setmessage(res.data.message)
                setUserResult(res.data.result)
               

                if (res.data.status === true) {
                    localStorage.adminDetails = JSON.stringify(res.data.result)
                    localStorage.adminToken = JSON.stringify(res.data.token)
                    // console.log(res.data.token)

                    navigate("/admindashboard")
                    
                }
                else {
                   alert("Invalid email or password")
                }
                
            })
        },
        validationSchema: yup.object({
            email: yup.string().required("Required field"),
            password: yup.string().required("Required field")
        })
    })

    return (
        <>
            <main className="row d-flex flex-row justify-content-center align-items-center bg-dark text-light" id="signupMain">
                <div className="col-sm-6 card bg-light py-4 my-0" id="signupDiv1">
                    {status ? <div className="alert alert-success">{message}</div> : <div className="alert alert-danger">{message}</div>}
                    <h2 className="text-center text-dark">Admin sign in</h2>

                    <form action="" onSubmit={formik.handleSubmit}>
                        <input onBlur={formik.handleBlur} name="email" type="text" className={"form-control my-2"} placeholder="Email" onChange={formik.handleChange} />
                        {formik.touched.email && <div className="text-danger">{formik.errors.email}</div>}

                        <input onBlur={formik.handleBlur} name="password" type="password" className={"form-control my-2"} placeholder="Password" onChange={formik.handleChange} />
                        {formik.touched.password ? <div className="text-danger">{formik.errors.password}</div> : ""}

                        <button className="btn btn-info " type="submit">Sign in</button>
                    </form>
                </div>
            </main>
        </>
    )
}

export default Adminsignin