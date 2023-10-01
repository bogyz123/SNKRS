import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router";
import styles from "../stylings/Shop.module.css";
import products from "./products.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function Shop() {
  const nav = useNavigate();
  var keys = Object.keys(products);
  const [currentData, setCurrentData] = useState(Object.keys(products));
  const navigate = (to) => {
    nav(to);
  };
  const samples = {
    Nike: "https://i.pinimg.com/originals/fa/45/96/fa4596ad9a9d39901eeb455ed4f74e44.jpg",
    Adidas: "https://brand.assets.adidas.com/f_auto,q_auto,fl_lossy/capi/enUS/Images/seo-adidas-virtual-backgrounds-masthead-d_221-691488.jpg",
    Rebook: "https://avantisport.com/media/catalog/category/Reebok_banner_1.jpg",
  };
  const search = (e) => {
    var query = e;
    var results = keys.filter((key) => key.toLowerCase().includes(query.toLowerCase()));
    if (results != "") {
      setCurrentData(results);
    } else {
      setCurrentData(Object.keys(products));
    }
  };

  return (
    <div id={styles.container}>
      <div id={styles.search} className="hoverable">
        <input type="text" onChange={(e) => search(e.target.value)} className="input" style={{ width: "100%", background: "rgb(25,25,25)", color: "white" }} />
        <FontAwesomeIcon icon={faSearch} color="white" />
      </div>
      {currentData &&
        currentData.map((key) => (
          <div key={key} className={`${styles.brand}`} style={{ backgroundImage: `url(${samples[key]})` }} onClick={() => navigate(`/shop/${key}`)}>
            <h1 className={styles.brandName}>{key}</h1>
          </div>
        ))}
    </div>
  );
}
