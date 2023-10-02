import styles from "../stylings/Product.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFemale, faPerson } from "@fortawesome/free-solid-svg-icons";

export default function Product({ model, price, colors, thumbnail, gender, theme, flexGrow }) {
  return (
    <div className={`${styles.container} ${theme === "dark" ? styles.dark : styles.light} ${flexGrow && styles.grow}`}>
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
            </div>
          ) : gender === "female" ? (
            <FontAwesomeIcon icon={faFemale} color="hotpink" />
          ) : (
            gender === "male" && <FontAwesomeIcon icon={faPerson} color="dodgerblue" />
          )}
        </div>
      </div>
    </div>
  );
}
