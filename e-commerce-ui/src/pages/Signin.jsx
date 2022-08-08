import { Link, useNavigate } from "react-router-dom"
import image from "../new.webp"
import axios from "axios"
import { useFormik } from "formik"
import { useState } from "react"
import * as yup from "yup"


const SignIn = () => {
    const navigate = useNavigate()
    const url = "http://localhost:3700/users/signin"
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


                if (res.data.status) {
                    // console.log(res.data.result);
                    navigate("/dashboard")
                    localStorage.userDetails = JSON.stringify(res.data.result)
                    localStorage.token = JSON.stringify(res.data.token)


                }
                else if(status === false) {
                    alert("Invalid email or password")
                }

                // {status ? navigate("/dashboard") : () => alert(33)}
            })
        },
        validationSchema: yup.object({
            email: yup.string().required("Required field"),
            password: yup.string().required("Required field")
        })
    })


    return (
        <>

            <section className="text-center">

                <div className="p-5 bg-image" style={{
                    backgroundImage: { image },
                    height: "300px"
                }}></div>


                <div className="card mx-4 mx-md-5 shadow-5-strong" style={{
                    marginTop: "-100px",
                    background: "hsla(0, 0%, 100%, 0.8)",
                    backdropFilter: "blur(30px)"
                }}>
                    <div className="card-body py-5 px-md-5">

                        <div className="row d-flex justify-content-center">
                            <div className="col-lg-8">
                                <h2 className="fw-bold mb-5">Sign in</h2>
                                {status ? <div className="alert alert-success">{message}</div> : <div className="alert alert-danger">{message}</div>}
                                <form action="" onSubmit={formik.handleSubmit}>
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


                                    <button type="submit" className="btn btn-primary btn-block mb-4">
                                        Sign In
                                    </button>


                                    <div className="text-center">
                                        <p>Don't have an account? sign up with us <Link to="/signup">here</Link></p>
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
export default SignIn