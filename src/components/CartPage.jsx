import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import { useLocation } from "react-router";
import styles from "../styles/CartPage.module.css";
import PaymentForm from "./PaymentForm";


const stripe = loadStripe('pk_test_51MJxVYHURVmulJtgOCLx5AphOr5KkHNSMDbQfANJlKdWm4kUkNwT5HFoYrQiMysdJqiMr6tOyser377YitSvGyEG00IAbMSX2C');
const options = {
    clientSecret: ''
}
export default function CartPage() { // Checkout stranica. Kada smo zavrsili sa kupovinom, sledi ova stranica, sa Tableom koji ima sve informacije o produktima, ceni, i Stripe integraciji.
    const data = useLocation();
    const [success, setSuccess] = useState(false);
    return (
        <div style={{ fontFamily: 'Rubik, sans-serif' }}>


            {!success ? <div>
                <h2 className="center">Your cart ({data.state.data.length} items)</h2>
                <table id={styles.table} style={{ fontFamily: 'Rubik, sans-serif' }}>
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Size</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.state.data.map((product, index) => {
                            return <tr key={index}>
                                <td className="flex centerY gap">
                                    <img src={product.img} className={styles.img} />
                                    {product.title}
                                </td>

                                <td>
                                    {product.size}
                                </td>
                                <td>${product.price}</td>
                            </tr>
                        })}
                        <tr >
                            <td colSpan={3} id={styles.invoiceContainer}>
                                <div id={styles.invoice}>
                                    <div className={styles.invoiceItem}>
                                        <strong>Subtotal:</strong>
                                        <p> ${data.state.total}</p>
                                    </div>
                                    <div className={styles.invoiceItem}>
                                        <strong>Sales tax:</strong>
                                        <p> ${((6.5 / 100) * data.state.total).toFixed(2)}</p>
                                    </div>
                                    <div className={styles.invoiceItem}>
                                        <strong>Total: </strong>
                                        <p> ${data.state.total + parseInt(((6.5 / 100) * data.state.total).toFixed(2))}</p>

                                    </div>
                                    <div className={styles.invoiceItem}>
                                        <strong>Coupon code (Easter egg)</strong>
                                        <input something='bogdan<3react' type='text' placeholder="Coupon code" className='input-primary'></input>
                                    </div>

                                </div>

                            </td>
                        </tr>


                    </tbody>
                </table>
                <Elements stripe={stripe}>
                    <PaymentForm />
                </Elements>

            </div> : <p>Success</p>}
        </div>
    )
}