import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import shoe from "../images/Nike.png";
import shoe2 from "../images/Shoe2.png";
import shoe3 from "../images/Shoe3.png";
import styles from "../stylings/Homepage.module.css";

export default function Homepage() {
  const [selectedImage, setSelectedImage] = useState(0);
  const images = [shoe, shoe2, shoe3];
  const handleSlider = (index) => {
    setSelectedImage(index);
  };
  useEffect(() => {
    const MAX = images.length;
    const int = setInterval(() => {
      setSelectedImage((prevSelectedImage) => (prevSelectedImage + 1) % MAX);
    }, 5000);

    return () => {
      clearInterval(int);
    };
  }, []);
  const nav = useNavigate();
  return (
    <div id={styles.container} className="main-font">
      <div id={styles.introduction}>
        <p>Sneaker Collection</p>
        <h1>GOOD SHOES</h1>
        <h1 style={{marginLeft:'15px', animationDelay: '100ms'}}>TAKE YOU</h1>
        <h1 style={{marginLeft:'35px', animationDelay:'150ms'}}>GOOD PLACES</h1>
        <button className="primary-btn" onClick={() => nav("/shop")} style={{ color: "white" }}>
          Shop Now
        </button>
      </div>
      <div id={styles.shoe}>
        <img src={images[selectedImage]} alt="shoe" className={`${styles.previewImage} fade`} key={images[selectedImage]} />
      </div>
      <ul id={styles.shoeSlider}>
        {images.map((image, index) => (
          <li key={index} onClick={() => handleSlider(index)} className="hoverable" style={{ color: index == selectedImage && "crimson" }}>
            O
          </li>
        ))}
      </ul>
    </div>
  );
}
