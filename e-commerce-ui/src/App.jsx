import { Route, Routes } from "react-router"
import Adminsignup from "./pages/Adminsignup"
import Adminsignin from "./pages/Adminsignin"
import LandingPage from "./pages/LandingPage"
import SignIn from "./pages/Signin"
import SignUp from "./pages/Signup"
import UserDashboard from "./pages/UserDashboard"
import Admindashboard from "./pages/Admindashboard"
import Notfound from "./pages/Notfound"
import Cart from "./pages/Cart"
import Checkout from "./pages/Checkout"


const App = () => {

    return (
        <>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/dashboard" element={<UserDashboard />} />
                <Route path="/adminsignup" element={<Adminsignup/>} />
                <Route path="/adminsignin" element={<Adminsignin/>} />
                <Route path={"/admindashboard"} element={<Admindashboard/>} />
                <Route path={"/cart"} element={<Cart />} />
                <Route path="*" element={<Notfound />} />
                <Route path="/checkout" element={<Checkout/>} />
            </Routes>
        </>
    )
}
export default App