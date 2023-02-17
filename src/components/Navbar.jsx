import { signOut } from "@firebase/auth";
import { AccountCircle, Add, Login, ShoppingCart } from "@mui/icons-material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import styles from "../styles/Navbar.module.css";
import AdminOnly from "./AdminOnly";
import { auth } from "./fire";
import { setAllProducts, setIsCartOpen } from "./redux/ProductSlice";


export default function Navbar() { // Navbar, sadrzi user profile ikonicu ukoliko smo ulogovani, login/logout zavisi od LogState-a kao i ShoppingCart ikonicu ukoliko ima >= 1 item u korpi.
    const nav = useNavigate();
    const selectedProducts = useSelector((state) => state.ProductSlice.selectedProducts);
    const isCartOpen = useSelector((state) => state.ProductSlice.isCartOpen);
    const isLoggedIn = useSelector((state) => state.UserSlice.isLoggedIn);
    const [currentTab, setCurrentTab] = useState('Home');
    const dispatch = useDispatch();

    const handleCart = () => {
        dispatch(setIsCartOpen(!isCartOpen));
    }

    const handleLogin = () => {
        if (isLoggedIn) {
            signOut(auth);
            dispatch(setAllProducts([]));
            dispatch(setIsCartOpen(false));
        }
        else {
            nav('/login');
        }
    }
    const changeTab = (to, tab) => {
        setCurrentTab(tab);
        nav(to);
    }
    return (
        <div id={styles.container}>
            <Link to='/'>
                <img src={logo} id={styles.logo} />
            </Link>
            <h3 id={styles.header}><Link to='/'>SNKRS</Link></h3>
            <ul>
                <li onClick={() => changeTab('/', 'Home')}>Home</li>
                <li onClick={() => changeTab('/products', 'Products')}>Gallery</li>
                <li onClick={() => changeTab('/contact', 'Contact')}>Contact</li>
            </ul>
            {selectedProducts.length > 0 &&
                <div id={styles.shoppingCart}>
                    <ShoppingCart className='hoverable' onClick={handleCart} color='primary' />
                    <span style={{ color: 'yellow' }}>{selectedProducts.length}</span>
                </div>
            }
            <div id={styles.login}>

                <AdminOnly>
                    <Add style={{ color: 'white' }} className="hoverable" onClick={() => nav("/edit-account", { state: { page: 'addNewProduct' } })} />
                </AdminOnly>


                {isLoggedIn && <AccountCircle color='info' style={{ transform: 'scale(1.3)' }} className='hoverable' onClick={() => nav('/edit-account')} />}
                <Login className='hoverable' color={isLoggedIn ? 'error' : 'success'} onClick={handleLogin} />
            </div>
        </div>
    )
}