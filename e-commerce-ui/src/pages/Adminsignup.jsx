import { useFormik } from "formik"
import * as yup from "yup"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useState } from "react"
import { Link } from "react-router-dom"
const Adminsignup = () => {
    const navigate = useNavigate()
    const [status, setstatus] = useState("")
    const [message, setmessage] = useState("")
    const url = "https://nobelium-store.herokuapp.com/admin/signup"

    const formik = useFormik({
        initialValues: {
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            secretPassword: ""
        },
        onSubmit: (values) => {
            const newUser = values
            console.log(newUser);
            if (values.secretPassword != "oluwatobi24") {
                navigate("/signin")
            }
            axios.post(url, newUser).then((res) => {
                console.log(res);
                setstatus(res.data.status)
                setmessage(res.data.message)
                if (status === false) {
                    alert("Email or username exist")
                }
                else {
                    navigate("/adminsignin")
                }
            })
        },
        validationSchema: yup.object({
            firstname: yup.string().required("Required field"),
            lastname: yup.string().required("Required field"),
            email: yup.string().required("Required field"),
            password: yup.string().required("Required field"),
            secretPassword: yup.string().required("Required field")
        })
    })



    return (
        <>

            <main className="row d-flex flex-row justify-content-center align-items-center bg-dark text-light" id="signupMain">
                <div className="col-sm-6 card bg-light py-4 my-0" id="signupDiv1">
                    <form action="" onSubmit={formik.handleSubmit}>
                        <h5 className="text-center text-dark">Admin Sign up</h5>
                        {status ? <div className="alert alert-success">{message}</div> : <div className="alert alert-danger">{message}</div>}
                        <input onBlur={formik.handleBlur} name="firstname" type="text" className={formik.errors.firstname ? "form-control my-2 is-invalid" : "form-control my-2"} placeholder="First name" onChange={formik.handleChange} />
                        {formik.touched.firstname && <div className="text-danger">{formik.errors.firstname}</div>}

                        <input onBlur={formik.handleBlur} name="lastname" type="text" className={"form-control my-2"} placeholder="Last name" onChange={formik.handleChange} />
                        {formik.touched.lastname && <div className="text-danger">{formik.errors.lastname}</div>}

                        <input onBlur={formik.handleBlur} name="secretPassword" type="text" className={"form-control my-2"} placeholder="Secret Password" onChange={formik.handleChange} />
                        {formik.touched.secretPassword && <div className="text-danger">{formik.errors.secretPassword}</div>}

                        <input onBlur={formik.handleBlur} name="email" type="text" className={"form-control my-2"} placeholder="Email" onChange={formik.handleChange} />
                        {formik.touched.email && <div className="text-danger">{formik.errors.email}</div>}

                        <input onBlur={formik.handleBlur} name="password" type="password" className={"form-control my-2"} placeholder="Password" onChange={formik.handleChange} />
                        {formik.touched.password ? <div className="text-danger">{formik.errors.password}</div> : ""}

                        <button className="btn btn-info" type="submit" disabled={!formik.isValid}>Sign up</button>
                        <div className="d-flex w-100 align-items-center justify-content-center">
                            <p className=" text-dark">Have an account?<Link to="/adminsignin">Sign In</Link> </p>
                            
                        </div>
                    </form>
                </div>
            </main>

        </>
    )
}
export default Adminsignup