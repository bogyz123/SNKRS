import { useState } from "react";
import { useSelector } from "react-redux";
import "../styles/App.css";
import Product from "./Product";


export default function MaleProducts() {
    const allProducts = useSelector((state) => state.ProductSlice.allProducts);
    const [maleProducts, setMaleProducts] = useState([...allProducts.filter((product) => product.gender === 'Male')]);



    return (
        <div style={{ fontFamily: 'Rubik, sans-serif', color: 'white' }} className='center flex flexCol centerX centerY'>


            <h1>MEN SHOES</h1>

            {maleProducts.length <= 0 ?
                <h2 style={{ color: 'crimson' }}>We apologize, but we currently do not have any <span style={{ textDecoration: 'underline' }}>Male</span> products.</h2> :
                <div className='productList | centerX | centerY'>
                    {maleProducts.map((product, index) => {
                        return <Product id={product.id} key={index} title={product.title} sizes={product.sizes} img={product.image} gender={product.gender} price={product.price} />
                    })}
                </div>
            }
        </div>
    )
}