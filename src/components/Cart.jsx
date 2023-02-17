import { Delete, Minimize } from "@mui/icons-material";
import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import "../styles/App.css";
import styles from "../styles/Cart.module.css";
import { setIsCartOpen, setSelectedProducts } from "./redux/ProductSlice";

export const select = {
    background: 'white',
    color: 'black',
    padding: '.5rem',
    cursor: 'pointer',
    border: 'none',
    marginTop: '.5rem'
}


export default function Cart({ products }) { // Shopping korpa. Mogucnost dodavanja, brisanja itema iz nje kao i minimizovanja kartice.
    const [total, setTotal] = useState(0);
    const selectedProducts = useSelector((state) => state.ProductSlice.selectedProducts);

    const isCartOpen = useSelector((state) => state.ProductSlice.isCartOpen);
    const dispatch = useDispatch();
    useMemo(() => { // Kada se korpa ucita, racuna total price svih proizvoda, i kada se neki product doda/remove-a re-kalkulise novu cenu.
        var total = 0;
        products.map((product) => {
            total += product.price;
        });
        setTotal(total);
    }, [products]);
    const nav = useNavigate();

    const removeProduct = (pid) => {
        // U reactu ne trebamo mutirati state direktno vec preko reference, zato pravim array svih produkata koji nemaju dati id, i setujem u selectedProducts
        // Tako da ce taj produkt koji ima pid kao pid sa parametra biti izbrisan
        const newArray = selectedProducts.filter(productObj => productObj.id != pid);
        dispatch(setSelectedProducts([...newArray]));
    }
    const navigateToCartPage = () => {
        nav("/cart", { state: { data: selectedProducts, total: total } });
        dispatch(setIsCartOpen(false));
    }


    return (
        <div id={styles.cart} style={{ display: isCartOpen ? 'block' : 'none' }}>

            <span className="center" id={styles.header}>Shopping Cart</span>
            <div id={styles.minimizeBtn} onClick={() => dispatch(setIsCartOpen(false))}> <Minimize className="hoverable" /></div>


            {products.map((product, index) => {
                return <div key={index}>
                    <div className="flex" id={styles.metadata}>
                        <img src={selectedProducts[index].img} className={styles.img} />
                        <strong>{product.title} ({product.size} EU)</strong>
                        <strong>${product.price}</strong> <Delete className='hoverable' color='error' onClick={() => removeProduct(product.id)} />
                    </div>
                    <hr />
                </div>
            })}
            <p>Total: ${total}</p>
            <button className="btn-primary" style={{ background: 'dodgerblue', color: 'white', borderRadius: '0', width: '100%' }} onClick={navigateToCartPage}>Checkout</button>

        </div>
    )
}