import { getDownloadURL, getStorage, listAll, ref } from "@firebase/storage";
import { Delete } from "@mui/icons-material";
import { deleteDoc, doc } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import "../styles/App.css";
import styles from "../styles/Product.module.css";
import AdminOnly from "./AdminOnly";
import { select } from "./Cart";
import { db } from "./fire";
import ImageSlider from "./ImageSlider";
import { setAllProducts, setSelectedProducts } from "./redux/ProductSlice";


export default function Product({ title, img, price, sizes, id, quantity, gender }) {
    // Product page. Svaki product drzi svoje informacije ovde, mogucnost dodavanja produkta u karticu preko Redux array-eva.
    // Ovu komponentu zovemo kada uzmemo sve informacije o produktu iz Firestore-a, kao i slike produkta iz Storagea, dajemo joj zeljenje props i renderujemo.
    const nav = useNavigate();
    const dispatch = useDispatch();
    const [selectedIds, setSelectedIds] = useState([]);
    const selected = useSelector((state) => state.ProductSlice.selectedProducts);
    const sizeRef = useRef();
    const [images, setImages] = useState([]);
    const [imageIndex, setImageIndex] = useState(0);
    const allProducts = useSelector((state) => state.ProductSlice.allProducts);

    useEffect(() => {
        var ids = [];
        for (let i = 0; i < selected.length; i++) {
            ids.push(selected[i].id);
        }
        setSelectedIds([...ids]);
    }, [selected]);
    useEffect(() => {

        const storage = getStorage();
        listAll(ref(storage, img)).then((result) => {

            result.items.map((image) => {

                getDownloadURL(image).then((url) => {
                    setImages(before => [...before, url]);
                });
            });
        });
    }, []);

    const addProduct = (title, price, sizes, id, quantity) => {
        if (selectedIds.includes(id)) {
            return;
        }
        const product = {
            title: title,
            price: parseInt(price),
            sizes: sizes,
            id: id,
            size: sizeRef.current.value,
            img: images,
            quantity: quantity
        }
        dispatch(setSelectedProducts([...selected, product]));
        setSelectedIds([...selectedIds, id]);
    }
    const deleteProduct = async (productId) => { // We remove the product from the database, then from the local Redux array, so it's removed from both client and server.
        await deleteDoc(doc(db, "products/" + productId));
        const removed = [...allProducts.filter((product) => product.id != productId)];
        dispatch(setAllProducts([...removed]));
    }

    return (
        <div id={styles.productContainer}>
            <div id={styles.product}>
                {images.length > 1 ? <ImageSlider images={images} index={imageIndex} setIndex={setImageIndex} /> : <img src={images[0]} style={{ borderRadius: '.5rem' }} />}

            </div>
            <div id={styles.productMetadata}>

              
                    <AdminOnly>
                        <div className="flex centerY" onClick={() => deleteProduct(id)}>
                            {gender} {title} <Delete color='error' className="hoverable" />
                        </div>
                    </AdminOnly>

              



                <div id={styles.pricingContainer}>
                    <strong>${price}</strong>
                    <button disabled={quantity < 1} className="btn-secondary" onClick={() => addProduct(title, price, sizes, id, quantity, img)}>Add to cart</button>

                    <select style={select} ref={sizeRef}>
                        {sizes.map((size, index) => {
                            return <option key={index} value={size}>{size} EU</option>
                        })}
                    </select>
                </div>

            </div>
        </div>
    )
}