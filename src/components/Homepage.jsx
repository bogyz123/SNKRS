import { Alert } from "@mui/material";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import shoes from "../assets/shoes.png";
import "../styles/App.css";
import styles from "../styles/Homepage.module.css";
import { db } from "./fire";
import GenderSelector from "./GenderSelector";
import Navbar from "./Navbar";
import Product from "./Product";
import { setAllProducts } from "./redux/ProductSlice";





export default function Homepage() { // Main page, uses the GenderSelector and Product reusable components.

    const dispatch = useDispatch();
    const allProducts = useSelector((state) => state.ProductSlice.allProducts);
    const popularItems = useRef();



    useEffect(() => {
        getDocs(collection(db, "products")).then((docs) => {
            dispatch(setAllProducts(docs.docs.map((doc) => ({ ...doc.data() }))))
        });
    }, []);



    const scroll = (to) => {
        to.current.scrollIntoView({ behavior: 'smooth' });
    }


    return (

        <div id={styles.container} style={{ height: allProducts.length <= 0 && '100vh' }}>
            <Navbar />

           
            <div id={styles.heroGrid}>
                <div id={styles.heroContent}>
                    <h1 id={styles.heroText}>PURCHASE YOUR  <br /> <span id={styles.underline}>SHOES</span> NOW.</h1>
                    <p id={styles.lorem}>The best quality shoes <span style={{ textDecoration: 'underline' }}>in one place.</span> <br /> Start shopping & place your first order now!</p>
                    <button className="btn-primary" onClick={() => scroll(popularItems)}>Shop Now</button>
                </div>
                <div id={styles.sneakerImage}>
                    <img src={shoes} alt='orange nike sneaker shoes' />
                </div>

            </div>
            <h1 className="center">OUR COLLECTION</h1>
            <GenderSelector />
            <div id={styles.popularContainer} ref={popularItems}>
                <h1 className="center">RECENTLY ADDED</h1>

                <div className='productList centerX'>
                    {allProducts.length <= 0 ? <Alert severity="error" sx={{ background: 'orangered', color: '#fff', fontFamily: 'Rubik, sans-serif' }}>We currently do not have any products available. Check in later.</Alert> :
                        allProducts.map((product, index) => {
                            return <Product id={product.id} key={index} title={product.title} sizes={product.sizes} img={product.image} gender={product.gender} price={product.price} />
                        })}
                </div>

            </div>

        </div>


    )
}

