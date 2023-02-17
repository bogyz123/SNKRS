import { useState } from "react";
import { useSelector } from "react-redux";
import Product from "./Product";


export default function FemaleProducts() { // Products that are filtered to show female-only shoes.
    const allProducts = useSelector((state) => state.ProductSlice.allProducts);
    const [femaleProducts, setFemaleProducts] = useState([...allProducts.filter((product) => product.gender === 'Female')]);
    
    return (
        <div className='flex | flexCol | center | centerX | centerY' style={{ fontFamily: 'Rubik, sans-serif', color: 'white' }}>
            <h1>FEMALE SHOES</h1>
            {femaleProducts.length <= 0 ?
                <h2 style={{ color: 'crimson' }}>We apologize, but we currently do not have any <span style={{ textDecoration: 'underline' }}>Female</span> products.</h2> :
                <div className='productList centerX centerY '>
                    {femaleProducts.map((product, index) => {
                        return <Product id={product.id} key={index} title={product.title} sizes={product.sizes} img={product.image} gender={product.gender} price={product.price} />
                    })}
                </div>
            }
        </div>
    )
}