import { ArrowLeft, ArrowRight } from "@mui/icons-material";
import "../styles/App.css";
import styles from "../styles/ImageSlider.module.css";

export default function ImageSlider({ images, index, setIndex }) { // Slider za slide. images = slike koje pripadaju slajderu, index = trenutna slika iz arraya, setIndex = setter za index
    const icons = {
        transform: 'scale(1.7)'
    }
    const nextImage = () => { // Kada kliknemo na strelicu desno za novu sliku, proveravamo da li ta slika postoji u Array, ukoliko da, postavicemo trenutni index na nju tako da ce se pokazati.
        // Slicno, to radimo i sa previousImage, samo sa negativnim brojem.
        if (images[index + 1] != undefined) {
            setIndex(index + 1);
        }
    }
    const previousImage = () => {
        if (images[index - 1] != undefined) {
            setIndex(index - 1);
        }
    }
    return (
        <div id={styles.slider}>
            <ArrowLeft style={icons} color='primary' className="hoverable" onClick={() => previousImage()} id={styles.previousImage} />
            
                <img src={images[index]} className={styles.image}/>
         
            <ArrowRight style={icons} color='primary' className="hoverable" onClick={() => nextImage()} id={styles.nextImage} />
            <small id={styles.currentIndex} style={{ color: 'black' }}>{index + 1}/{images.length}</small>
        </div>
    )
}