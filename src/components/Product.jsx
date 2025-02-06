import styles from "../stylings/Product.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFemale, faPerson, faRemove } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";


export default function Product({ model, price, colors, thumbnail, gender, favorite, children, theme }) {
  const remove = () => {
    const product = {
      model: model,
      price: price,
      colors: colors,
      thumbnail: thumbnail,
      gender: gender, 
      theme: theme,
      favorite: favorite,
    };
   
    var items = JSON.parse(localStorage.getItem("snkrs_favorites")) || [];
    var index = items.findIndex((prod) => prod.model === product.model);

    if (index !== -1) {
      items.splice(index, 1);
    } else {
      items.push(product);
    }

    localStorage.setItem("snkrs_favorites", JSON.stringify(items));
  };

  return (
    <div className={`${styles.container}`} style={{background: theme}}>
      <img src={thumbnail} className={`${styles.img} hoverable`} />
      <span className={styles.title}>{model}</span>
      <div>
        <div className={styles.price}>
          <span style={{ color: "orangered" }}>$</span>
          <p>{price}</p>
        </div>
        <div id={styles.colorContainer}>
          {colors.map((color) => (
            <div key={color} className={styles.circle} style={{ background: color, border: "1px solid gray" }} />
          ))}
        </div>
        <div className={styles.gender}>
          {gender === "unisex" ? (
            <div>
              <FontAwesomeIcon icon={faPerson} color="dodgerblue" />
              <FontAwesomeIcon icon={faFemale} color="hotpink" />
              {favorite && <FontAwesomeIcon icon={faRemove} color="red" className="hoverable" onClick={remove} />}
              {children}
            </div>
          ) : gender === "female" ? (
            <>
              <FontAwesomeIcon icon={faFemale} color="hotpink" />
              {favorite && <FontAwesomeIcon icon={faRemove} color="red" className="hoverable" onClick={remove} />}
              {children}
            </>
          ) : (
            gender === "male" && (
              <>
                <FontAwesomeIcon icon={faPerson} color="dodgerblue" />
                {favorite && <FontAwesomeIcon icon={faRemove} color="red" className="hoverable" onClick={remove} />}
                {children}
              </>
            )
          )}
        </div>
      </div>
    </div>
  );
}
