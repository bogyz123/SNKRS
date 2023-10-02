import { faBars, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import styles from "../stylings/Navbar.module.css";
import Cart from "./Cart";

export default function Navbar({ cartItems, cartTotal, removeItem }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpened, setCartOpened] = useState(false);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const nav = useNavigate();
  const toggleCart = () => {
    setCartOpened(!cartOpened);
  };
  const closeCart = () => {
    setCartOpened(false);
  };

  return (
    <div id={styles.container} className="main-font">
      <div id={styles.header}>
        <h2 className="hoverable" onClick={() => nav("/")}>
          SNKRS
        </h2>
      </div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/shop">Shop</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
        <li>
          <Link to="/help">Help</Link>
        </li>
        <li>
          <Link to="/blog">Blog</Link>
        </li>
        <li>
          <Link to="/elements">Elements</Link>
        </li>
        {cartItems.length > 0 && (
          <li>
            <FontAwesomeIcon icon={faShoppingCart} className="hoverable" onClick={toggleCart} />
            <span className={styles.cartLength}>{cartItems.length}</span>
          </li>
        )}
      </ul>
      <div id={styles.menu}>
        <FontAwesomeIcon icon={faBars} className="hoverable" id={styles.burger} onClick={toggleMenu} />
        {cartItems.length > 0 && (
          <>
            <FontAwesomeIcon onClick={toggleCart} icon={faShoppingCart} className="hoverable" />
            <span className={styles.cartLength}>{cartItems.length}</span>
          </>
        )}
      </div>
      {menuOpen && (
        <div id={styles.menuContent}>
          <span onClick={() => nav("/")}>Home</span>
          <span onClick={() => nav("/shop")}>Shop</span>
          <span onClick={() => nav("/contact")}>Contact</span>
          <span onClick={() => nav("/help")}>Help</span>
          <span onClick={() => nav("/blog")}>Blog</span>
          <span onClick={() => nav("elements")}>Elements</span>
        </div>
      )}
      {cartOpened && ReactDOM.createPortal(<Cart cartItems={cartItems} closeCart={closeCart} cartTotal={cartTotal} removeItem={removeItem} />, document.getElementById("cart-portal"))}
    </div>
  );
}
