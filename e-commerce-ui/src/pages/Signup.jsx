import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import image from "../new.webp"
import { useFormik } from "formik"
import * as yup from "yup"
import axios from "axios"

const SignUp = () => {
    const [message, setmessage] = useState("")
    const [status, setstatus] = useState("")
    const navigate = useNavigate()
    const url = "http://localhost:3700/users/signup"

    const formik = useFormik({
        initialValues: {
            firstname: "",
            lastname: "",
            email: "",
            password: ""

        },
        onSubmit: (values) => {
            // console.log(values);
            const newUser = values
            axios.post(url, newUser).then((res)=>{
                console.log(res);
                setmessage(res.data.message)
                setstatus(res.data.status)
                if (res.data.status) {
                    navigate("/signin")
                }
            })
        },
        validationSchema: yup.object({
            firstname: yup.string().required("Required field"),
            lastname: yup.string().required("Required field"),
            email: yup.string().required("Required field"),
            password: yup.string().required("Required field").length(9, "Must be 9 characters")
        })
    })
    return (
        <>

            <section className="text-center">

                <div className="p-5 bg-dark" style={{
                    backgroundImage: { image },
                    height: "300px"
                }}></div>


                <div className="card mx-4 mx-md-5 shadow-5-strong" style={{
                    marginTop: "-100px",
                    background: "hsla(0, 0%, 100%, 0.8)",
                    backdropFilter: "blur(30px)"
                }}>
                    <div className="card-body py-5 px-md-5">

                        <div className="row d-flex justify-content-center shadow-lg">
                            <div className="col-lg-8">
                                <h2 className="fw-bold mb-5">Sign up</h2>
                                {status ? <div className="alert alert-success">{message}</div> : <div className="alert alert-danger">{message}</div>}
                                <form action="" onSubmit={formik.handleSubmit}>

                                    <div className="row">
                                        <div className="col-md-6 mb-4">
                                            <div className="form-outline">
                                                <input onBlur={formik.handleBlur} name="firstname" type="text" className={formik.errors.firstname ? "form-control my-2 is-invalid" : "form-control my-2"} placeholder="First name" onChange={formik.handleChange} />
                                                {formik.touched.firstname && <div className="text-danger">{formik.errors.firstname}</div>}
                                                <label className="form-label" htmlFor="form3Example1">First name</label>
                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-4">
                                            <div className="form-outline">
                                                <input onBlur={formik.handleBlur} name="lastname" type="text" className={"form-control my-2"} placeholder="Last name" onChange={formik.handleChange} />
                                                {formik.touched.lastname && <div className="text-danger">{formik.errors.lasttname}</div>}
                                                <label className="form-label" htmlFor="form3Example2">Last name</label>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="form-outline mb-4">
                                        <input onBlur={formik.handleBlur} name="email" type="text" className={"form-control my-2"} placeholder="Email" onChange={formik.handleChange} />
                                        {formik.touched.email && <div className="text-danger">{formik.errors.email}</div>}
                                        <label className="form-label" htmlFor="form3Example3">Email address</label>
                                    </div>


                                    <div className="form-outline mb-4">
                                        <input onBlur={formik.handleBlur} name="password" type="password" className={"form-control my-2"} placeholder="Password" onChange={formik.handleChange} />
                                        {formik.touched.password ? <div className="text-danger">{formik.errors.password}</div> : ""}
                                        <label className="form-label" htmlFor="form3Example4">Password</label>
                                    </div>


                                    <div className="form-check d-flex justify-content-center mb-4">
                                        <label className="form-check-label" htmlFor="form2Example33">

                                        </label>
                                    </div>


                                    <button disabled={!formik.isValid} className={"btn btn-info"} type="submit">Sign in</button>


                                    <div className="text-center">
                                        <p>Have an account? sign in <Link to="/signin">here</Link></p>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}
export default SignUp