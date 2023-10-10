import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../stylings/Favorites.module.css";
import Product from "./Product";

export default function Favorites() {
  const [favorites, setFavorites] = useState({});
  useEffect(() => {
    const key = localStorage.getItem("snkrs_favorites");
    if (key) {
      const value = JSON.parse(key);
      setFavorites(value);
    }
  }, []);
  const removeProduct = (product) => {
    var items = favorites;
    // product.model in items.model
    for (const key in items) {
      if (items.hasOwnProperty(key)) {
        if (items[key].model === product.model) {
          delete items[key];
          break;
        }
      }
    }
    const filtered = JSON.stringify(items);
    localStorage.setItem("snkrs_favorites", filtered);
    setFavorites({ ...items });
  };

  const nav = useNavigate();
  return (
    <div id={styles.container}>
      <h2 className="text-center">Favorites ({Object.keys(favorites).length} products)</h2>
      {Object.keys(favorites).length > 0 ? (
        <div id={styles.favorites}>
          {Object.values(favorites).map((product) => (
            <div className="flex | flexCol | centerX | centerY" onClick={() => removeProduct(product)}>
              <button className="primary-btn" style={{ width: "90%", background: "crimson", color: "white" }}>
                Remove
              </button>
              <Product key={product.model} gender={product.gender} brand={product.brand} price={product.price} model={product.model} thumbnail={product.images[product.colors[0]][0]} colors={product.colors} />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center">
          You don't have any favorite shoes! Try{" "}
          <Link to="/shop" className="link">
            adding
          </Link>{" "}
          some.
        </p>
      )}
    </div>
  );
}
