import { useSelector } from "react-redux";

export default function AdminOnly({ children }) { // Samo ukoliko smo Admin.
    const isAdmin = useSelector((state) => state.UserSlice.userDetails?.isAdmin);
    if (!isAdmin) {
        return;
    }
    return children;
}