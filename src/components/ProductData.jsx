import { faArrowLeft, faCartShopping, faHeart, faV } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import styles from "../stylings/ProductData.module.css";
import products from "./products.json";

export default function ProductData({ cartItems, addToCart }) {
  const { brand, model } = useParams();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState();
  const [selectedColor, setSelectedColor] = useState();
  const [error, setError] = useState();
  const [favorited, setFavorited] = useState(false);
  const nav = useNavigate();

  useEffect(() => {
    if (brand && model && products[brand]) {
      const brandData = products[brand];
      const modelData = brandData[model];
      if (modelData) {
        setProduct(modelData);
        setMainImage({ url: modelData.images[modelData.colors[0]][0] });
      }
    }
  }, [brand, model]);
  useEffect(() => {
    const key = localStorage.getItem("snkrs_favorites");
    const array = JSON.parse(key);
    if (Array.isArray(array)) {
      const index = array.findIndex((prod) => prod.model === product.model);
      if (index >= 0) {
        setFavorited(true);
      }
    }
  }, []);

  const addCart = (item) => {
    if (!selectedColor) {
      setError("Please select your shoes color first.");
      return;
    }
    if (!cartItems.some((current) => current.model === item.model)) {
      setError(null);
      const product = {
        model: item.model,
        brand: item.brand,
        price: item.price,
        colors: item.colors,
        selectedColor: selectedColor,
        image: mainImage,
      };
      addToCart(product);
    } else {
      setError("Already added.");
    }
  };
  const swapImage = (image, color) => {
    setSelectedColor(color);
    setMainImage({ url: image, color: color });
  };
  const selectColor = (color) => {
    var image = product.images[color][0];
    if (image) {
      setMainImage({ url: image, color: color });
    }
    setSelectedColor(color);
  };
  const goBack = () => {
    nav("/shop");
  };
  const toggleFavorite = () => {
    setFavorited(!favorited);
    var items = JSON.parse(localStorage.getItem("snkrs_favorites")) || {};

    if (!favorited) {
      items[product.model] = product;
    } else {
      delete items[product.model];
    }

    localStorage.setItem("snkrs_favorites", JSON.stringify(items));
  };

  return (
    <div className={styles.container}>
      {product ? (
        <div className={styles.product}>
          <div className={styles.goBack} onClick={goBack}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </div>
          <div className={`${styles.mainImage}`} style={{ backgroundImage: `url(${mainImage.url})` }} key={mainImage.url} />
          <div className={styles.slider}>{product.colors.map((color) => product.images[color].map((link) => <img src={link} className={styles.sliderImage} onClick={() => swapImage(link)} key={link} />))}</div>

          <h3>{product.model}</h3>
          <div className={styles.colors}>
            {product.colors.map((color) => (
              <div key={color} onClick={() => selectColor(color)} className={styles.color} style={{ background: color, border: color === selectedColor && "1px solid green" }} />
            ))}
          </div>

          <p className={styles.price}>${product.price}</p>
          <div className={styles.controls}>
            <FontAwesomeIcon icon={faCartShopping} color="dodgerblue" size="lg" onClick={() => addCart(product)} />
            <FontAwesomeIcon icon={faHeart} color={favorited ? "green" : "red"} className="hoverable" size="lg" onClick={toggleFavorite} />
          </div>
          {error && (
            <div style={{ color: "crimson" }}>
              <p>{error}</p>
            </div>
          )}
        </div>
      ) : (
        <div>Product not found</div>
      )}
    </div>
  );
}
