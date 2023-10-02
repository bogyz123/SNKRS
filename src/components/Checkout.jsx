import { faCheck, faCircleCheck, faCreditCard } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation } from "react-router";
import styles from "../stylings/Checkout.module.css";
import Product from "./Product";
import { useState } from "react";

export default function Checkout({ setCartItems, setCartTotal }) {
  const products = useLocation().state.products;
  const total = useLocation().state.total;
  const [purchased, setPurchased] = useState(false);
  const purchase = () => {
    // THIS IS A SIMULATION :)
    setPurchased(true);
    setCartItems([]);
    setCartTotal(0);
  };
  return purchased ? (
    <div id={styles.purchased}>
      <div className="flex | gapY | centerY | centerX">
        <FontAwesomeIcon icon={faCircleCheck} color="green" style={{ height: "25px" }} />
        <h2>YOUR PRODUCT IS ON THE WAY!</h2>
      </div>
      <p>Your {products.length} new shoes are ready to be packaged and sent!</p>
    </div>
  ) : (
    <div id={styles.container}>
      <div className="text-center">Checkout</div>
      <div id={styles.productList}>
        {products &&
          products.map((product) => (
            <div key={product.model} className={`${styles.product}`}>
              <Product flexGrow theme="dark" price={product.price} model={product.model} colors={product.colors} gender={product.gender} thumbnail={product.image.url} />
            </div>
          ))}
      </div>
      <div id={styles.meta}>
        <div className="text-center">Subtotal (${total})</div>
        <div id={styles.userInformation}>
          <div className="text-center">Delivery Information</div>
          <div id={styles.locationInfoContainer}>
            <div className={styles.locationInfo}>
              <span>First Name</span>
              <input type="text" className="input" />
            </div>
            <div className={styles.locationInfo}>
              <span>Last Name</span>
              <input type="text" className="input" />
            </div>
            <div className={styles.locationInfo}>
              <span>Phone Number</span>
              <input type="number" className="input" />
            </div>
            <div className={styles.locationInfo}>
              <span>Address</span>
              <input type="text" className="input" />
            </div>
            <div className={styles.locationInfo}>
              <span>Email</span>
              <input type="text" className="input" />
            </div>
          </div>
          <div id={styles.paymentInformation}>
            <div className="text-center">Choose your payment option</div>
            <div id={styles.paymentOptions}>
              <div className={styles.paymentOption} style={{ background: "black" }}>
                <FontAwesomeIcon icon={faCreditCard} />
                Credit Card
              </div>
              <div className={styles.paymentOption} style={{ background: "orangered" }}>
                PayPal
              </div>
              <div className={styles.paymentOption} style={{ background: "brown" }}>
                Skrill
              </div>
            </div>
            <button className="primary-btn" id={styles.purchaseButton} onClick={() => purchase()}>
              Purchase
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
