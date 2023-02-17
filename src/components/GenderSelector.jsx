import { useNavigate } from "react-router";
import femaleSelect from "../assets/femaleselect.jpg";
import maleSelect from "../assets/maleselect.jpg";
import styles from "../styles/GenderSelector.module.css";


export default function GenderSelector() { // Gender selector View.
    const nav = useNavigate();
    return (


        <div id={styles.genderSelectorContainer}>
            <div onClick={() => nav("/products/male")} className={styles.genderSelector} style={{ background: `url(${maleSelect})`, objectFit: 'cover', backgroundPosition: '50% 50%', backgroundSize: '100%', backgroundRepeat: 'no-repeat' }}>
                <h1 className={styles.genderHeader}>MEN</h1>
            </div>
            <div onClick={() => nav("/products/female")} className={styles.genderSelector} style={{ background: `url(${femaleSelect})`, objectFit: 'cover', backgroundPosition: '50%', backgroundSize: '100%', backgroundRepeat: 'no-repeat' }}>
                <h1 className={styles.genderHeader}>WOMEN</h1>
            </div>
        </div>

    )
}