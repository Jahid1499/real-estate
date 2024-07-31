import { Link } from "react-router-dom"

const NotFound = () => {
    return (
        <div className="mx-auto w-fit h-[100vh]">Sorry!! 404 NotFound <Link to='/'><span className="text-blue-600 underline font-semibold">Go Home</span></Link></div>
    )
}

export default NotFound