import { faBars, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import bg from "../images/bg.png";
import styles from "../stylings/Navbar.module.css";
import Cart from "./Cart";

export default function Navbar({ cartItems, cartTotal, removeItem }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpened, setCartOpened] = useState(false);
  const nav = useNavigate();


  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const toggleCart = () => {
    setCartOpened(!cartOpened);
  };
  const closeCart = () => {
    setCartOpened(false);
  };

  return (
    <div id={styles.container} className="main-font">
      <div id={styles.header} onClick={() => nav("/")}>
        <img src={bg} />
      </div>
      <ul className={styles.linksContainer}>
        <li data-text="Home" onClick={() => nav("/")}>
          <span><Link to="/">Home</Link></span>
          <span aria-hidden="true" className="hover-text">&nbsp;Home&nbsp;</span>
        </li>
        <li data-text="Shop" onClick={() => nav("/shop")}>
         <span> <Link to="/shop">Shop</Link></span>
          <span aria-hidden="true" className="hover-text">&nbsp;Shop&nbsp;</span>
        </li>
        <li data-text="Contact" onClick={()=>nav("/contact")}>
         <span><Link to="/contact">Contact</Link></span>
          <span aria-hidden="true" className="hover-text">&nbsp;Contact&nbsp;</span>
        </li>
        <li data-text="Help" onClick={() => nav("/help")}>
         <span> <Link to="/help">Help</Link></span>
          <span aria-hidden="true" className="hover-text">&nbsp;Help&nbsp;</span>
        </li>
        <li data-text="Favorites" onClick={() => nav("/favorites")}>
          <span><Link to="/favorites">Favorites</Link></span>
          <span aria-hidden="true" className="hover-text">&nbsp;Favorites&nbsp;</span>
        </li>
        <div>
        {cartItems.length > 0 && (
          <div className={styles.cartContainer}>
            <FontAwesomeIcon icon={faShoppingCart} className="hoverable" onClick={toggleCart} />
            <span className={styles.cartLength}>{cartItems.length}</span>
          </div>
        )}
        </div>
        
      </ul>
      <div id={styles.burgerContainer}>
        <div id={styles.burger} style={{display: menuOpen ? "none" : "flex"}}>
        {cartItems.length > 0 && (
          <div className={styles.cartContainer}>
            <FontAwesomeIcon icon={faShoppingCart} className="hoverable" onClick={toggleCart} />
            <span className={styles.cartLength}>{cartItems.length}</span>
          </div>
        )}
          <FontAwesomeIcon icon={faBars} onClick={toggleMenu} size="lg"/>
        </div>
      </div>
      <div 
  id={styles.burgerContent} 
  style={{
    display: menuOpen ? 'flex' : 'none'
  }}
>
  
  <div className={styles.burgerClose} onClick={toggleMenu}>X</div>
          <div>
          <Link to=''>Homepage</Link>
          </div>
          <div>
          <Link to='/shop'>Shop</Link>
          </div>
          <div>
          <Link to='/contact'>Contact Us</Link>
          </div>
          <div>
          <Link to='/help'>Help</Link>
          </div>
          <div>
          <Link to='/favorites'>Favorites</Link>
          </div>
          <div>    
          </div>
        </div>
     
      {cartOpened && ReactDOM.createPortal(<Cart cartItems={cartItems} closeCart={closeCart} cartTotal={cartTotal} removeItem={removeItem} />, document.getElementById("cart-portal"))}
    </div>
  );
}
