import { Navigate } from "react-router-dom"

const ProtectedRoute = ({children}) => {

    const isLoggedIn = localStorage.getItem("isLoggedIn")

    if (!isLoggedIn) {
        return <Navigate to={'/'}/>
    }

  return children
}

export default ProtectedRoute