import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../stylings/Favorites.module.css";
import Product from "./Product";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDeleteLeft } from "@fortawesome/free-solid-svg-icons";

export default function Favorites() {
  const [favorites, setFavorites] = useState({});


  useEffect(() => {
    const storedFavorites = localStorage.getItem("snkrs_favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []); 


  const removeProduct = (product) => {

    const updatedFavorites = { ...favorites };

    for (const key in updatedFavorites) {
      if (updatedFavorites[key].model === product.model) {
        delete updatedFavorites[key];
        break;
      }
    }


    localStorage.setItem("snkrs_favorites", JSON.stringify(updatedFavorites));
    setFavorites(updatedFavorites); 
  };

  return (
    <div className={styles.container}>
      <h2 className="text-center">Favorites ({Object.keys(favorites).length} products)</h2>
      {Object.keys(favorites).length > 0 ? (
        <div className={styles.favorites}>
          {Object.values(favorites).map((product) => (
            <div
              key={product.model}
              className="flex | flexCol | centerX | centerY"
              onClick={() => removeProduct(product)}
              style={{ position: "relative" }}
            >
              <Product
                gender={product.gender}
                brand={product.brand}
                price={product.price}
                model={product.model}
                thumbnail={product.images[product.colors[0]][0]}
                colors={product.colors}
                 theme="light"
              >
                <div className={styles.deleteBtn}>
                  <FontAwesomeIcon icon={faDeleteLeft} />
                </div>
              </Product>
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
