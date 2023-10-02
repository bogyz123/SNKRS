import { faClose, faDeleteLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../stylings/Cart.module.css";
import { useNavigate } from "react-router";

export default function Cart({ cartItems, closeCart, cartTotal, removeItem }) {
  const nav = useNavigate();
  return (
    <div id={styles.container}>
      {cartItems.length > 0 && (
        <div id={styles.cart}>
          <span className="text-center">{cartItems.length} Items</span>
          <div id={styles.items}>
            {cartItems.map((item) => (
              <div className={styles.item} key={item.model}>
                <span className="text-center">{item.model}</span>
                <img src={item.image.url} alt={item.model} className={styles.itemImg} />

                <div className={styles.metadata}>
                  <span style={{ color: "orangered" }}>
                    $<span style={{ color: "black" }}>{item.price}</span>
                  </span>

                  <div className="hoverable" onClick={() => removeItem(item)}>
                    <FontAwesomeIcon icon={faDeleteLeft} color="crimson" />
                  </div>
                </div>
                <span className="text-center">{item.selectedColor}</span>
                <hr className={styles.separator} />
              </div>
            ))}
            <div id={styles.subtotal}>
              <span>Total: ${cartTotal}</span>
            </div>
            <button
              className="primary-btn"
              id={styles.purchaseBtn}
              onClick={() =>
                nav("/checkout", {
                  state: {
                    products: cartItems,
                    total: cartTotal,
                  },
                })
              }
            >
              Purchase
            </button>
          </div>
          <div id={styles.close} onClick={closeCart}>
            <FontAwesomeIcon icon={faClose} />
          </div>
        </div>
      )}
    </div>
  );
}
