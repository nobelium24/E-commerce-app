import { Link } from "react-router-dom"

const Notfound = () => {

    return (
        <main className=" row d-flex align-item-center justify-content-center w-100" style={{height:"100vh"}}>
            <div className="card col-sm-4 shadow p-4" style={{height:"33vh"}}>
                <h4>You seem to be lost</h4>
                <p>This site isn't as vast as the universe to get missing in. Hope you find your way back.</p>
                <p>Click <Link to="/" className="text-info">here</Link> to return to the landing page</p>
            </div>
        </main>
    )
}

export default Notfound