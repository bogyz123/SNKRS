import { Facebook, Instagram, Twitter } from "@mui/icons-material";
import styles from "../styles/Footer.module.css";

export default function Footer() {
    return (
        <footer id={styles.footer}>
            <div id={styles.icons}>
                <Instagram color='secondary' />
                <Twitter color='primary' />
                <Facebook color='primary' />
            </div>
            <div id={styles.links}>
                <p>Home</p>
                <p>Services</p>
                <p>About</p>
                <p>Terms</p>
                <p>Privacy Policy</p>

            </div>
            <small id={styles.credits}>By Bogdan Djakovic</small>
        </footer>
    )
}