import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import styles from "../stylings/Checkout.module.css";

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
    <div className={styles.purchased}>
      <div className="flex | gapY | centerY | centerX">
        <FontAwesomeIcon icon={faCircleCheck} color="green" style={{ height: "25px" }} />
        <h2>YOUR PRODUCT IS ON THE WAY!</h2>
      </div>
      <p>Your {products.length} new shoes are ready to be packaged and sent!</p>
    </div>
  ) : (
    <div className={styles.toBuyContainer}>
     <div className={styles.toBuyCardContainer}>
     <div className={styles.toBuyPageOne}>
      <div className={styles.checkoutTitle}>
      <h2>Checkout</h2>
      <Link to="/shop">Back to Shop</Link>
      </div>
      <h4>Billing address</h4>
      <div className={styles.infoContainer}>
        <div className={styles.info}>
          <span>Country</span>
          <input type="text" name="" className="" />
        </div>
        <div className={styles.info}>
          <span>State</span>
          <input type="text" name="" className="" />
        </div>
        <div className={styles.info}>
          <span>District</span>
          <input type="text" name="" className="" />
        </div>
        <div className={styles.info}>
          <span>Pin Code</span>
          <input type="text" maxLength={8} />
        </div>
      </div>
      <span style={{color:'gray'}}>Lorem ipsum dolor sit amet consectetur adipisicing elit.</span>
      <div className={styles.paymentMethods}>
      <h2>Payment Method</h2>
       <div className="flex | between">
       <div className={styles.paymentMethod}>
          <input type="radio" name="payment" className="" defaultChecked />
          <span>Credit/Debit card</span>
        </div>
        <div className={styles.paymentMethod}>
          <input type="radio" name="payment" className="" />
          <span>Skrill</span>
        </div>
        <div className={styles.paymentMethod}>
          <input type="radio" name="payment" className="" />
          <span>PayPal</span>
        </div>
      </div>
       </div>
      <div className={styles.personInfoContainer}>
        <div className={styles.personInfo}>
          <span>Name on Card</span>
          <input type="text"  placeholder="Name on Card" />
        </div>
        <div className={styles.personInfo}>
          <span>Card number</span>
          <input type="text" placeholder="Card Number" />
        </div>
        <div className={styles.personInfo}>
          <span>Security Code (CVV)</span>
          <input type="text" placeholder="Security Code (CVV)" />
        </div>
        <div className={styles.personInfo}>
          <span>Expiry Date</span>
          <input type="text" placeholder="Expiry Date" />
        </div>
      </div>
     </div>
      <div className={styles.toBuyPageTwo}>
        <h2>Order Summary</h2>
        <div className={styles.pageTwoCouponContainer}>
          <input type="text" placeholder="Coupon Code"/>
          <button>Apply</button>
        </div>
        <div className={styles.pageTwoSummaryContainer}>
          <div className={styles.pageTwoSummary}>
            <p>Original Price</p>
            <span>X</span>
          </div>
          <div className={styles.pageTwoSummary}>
            <p>Coupon Discounts</p>
            <span>X</span>
          </div>
          <div className={styles.pageTwoSummary}>
            <p>Discounts</p>
            <span>X</span>
          </div>
          <div className={styles.pageTwoSummary}>
            <p>Total:</p>
            <span>X</span>
          </div>
          <button style={{background:'rgb(52, 52, 219)'}}>Proceed to Pay</button>
        </div>
      </div>
     </div>
    </div>
  )
}
