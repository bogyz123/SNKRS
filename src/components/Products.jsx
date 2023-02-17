import { useSelector } from "react-redux";
import { Outlet } from "react-router";
import styles from "../styles/Products.module.css";
import GenderSelector from "./GenderSelector";
import Navbar from "./Navbar";


export default function Products() {
    const allProducts = useSelector((state) => state.ProductSlice.allProducts);
    return (

        <div style={{ minHeight: '100%' }} className='gradient'>
            <Navbar />
            <Outlet />

            <div className={styles.container}>
                <h1>CATEGORIES</h1>
                <GenderSelector />
                <div />
            </div>
        </div>
    )
}