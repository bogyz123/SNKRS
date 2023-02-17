import { useSelector } from "react-redux";
import { Navigate } from "react-router";

export default function LoggedOnly({ children }) { // Samo ukoliko smo ulogovani.
    const isLoggedIn = useSelector((state) => state.UserSlice.isLoggedIn);
    if (!isLoggedIn) {
        return <Navigate to='/login' replace></Navigate>
    }
    return children;
}