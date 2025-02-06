import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import styles from "../stylings/ProductPage.module.css";
import Product from "./Product";
import products from "./products.json";

export default function ProductPage() {
  const { brand } = useParams();
  const currentBrand = products[brand];
  const [currentData, setCurrentData] = useState(Object.values(currentBrand));
  const [visible, setVisible] = useState(false);
  const nav = useNavigate();
  const navigate = (to) => {
    nav(to);
  };
  const sort = (by) => {
    switch (by) {
      case "price-ascending": {
        const sortedProducts = { ...currentData };
        const values = Object.values(sortedProducts);
        var sorted = values.sort((a, b) => a.price - b.price);
        setCurrentData(sorted);
        break;
      }
      case "price-descending": {
        const sortedProducts = { ...currentData };
        const values = Object.values(sortedProducts);
        var sorted = values.sort((a, b) => b.price - a.price);
        setCurrentData(sorted);
        break;
      }
      case "male": {
        const toSort = { ...currentData };
        const values = Object.values(toSort);
        var sorted = values.sort((a, b) => {
          if (a.gender === "male" && b.gender != "male") {
            return -1;
          } else if (a.gender !== "male" && b.gender === "male") {
            return 1;
          } else {
            return 0;
          }
        });
        setCurrentData(sorted);
        break;
      }
      case "female": {
        const toSort = { ...currentData };
        const values = Object.values(toSort);
        var sorted = values.sort((a, b) => {
          if (a.gender === "female" && b.gender != "female") {
            return -1;
          } else if (a.gender !== "female" && b.gender === "female") {
            return 1;
          } else {
            return 0;
          }
        });
        setCurrentData(sorted);
        break;
      }
      default:
        break;
    }
  };
  return (
    <>
      <div id={styles.sortBy}>
        {(
          <div id={styles.sortMenu}>
            <div className={styles.sortOption} onClick={() => sort("price-ascending")}>
              Price Ascending
            </div>
            <div className={styles.sortOption} onClick={() => sort("price-descending")}>
              Price Descending
            </div>
            <div className={styles.sortOption} onClick={() => sort("male")}>
              Male First
            </div>
            <div className={styles.sortOption} onClick={() => sort("female")}>
              Female First
            </div>
          </div>
        )}
      </div>
      <div id={styles.container}>
        {currentData &&
          currentData.map((product) => (
            <div key={product.id} onClick={() => navigate(`/shop/${brand}/${product.id}`)} className={`${styles.productContainer} drop-animation`}>
              <Product theme="rgb(230,230,230)" gender={product.gender} brand={product.brand} price={product.price} model={product.model} thumbnail={product.images[product.colors[0]][0]} colors={product.colors} />
            </div>
          ))}
      </div>
    </>
  );
}
