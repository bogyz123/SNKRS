import { getAuth, updateEmail, updatePassword } from "@firebase/auth";
import { getStorage, ref, uploadBytes } from "@firebase/storage";
import { Add, ArrowLeft, CancelOutlined, SaveAsOutlined } from "@mui/icons-material";
import { Avatar, Button, Paper } from "@mui/material";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import loading from "../assets/loading.gif";
import styles from "../styles/EditUser.module.css";
import AdminOnly from "./AdminOnly";
import { select } from "./Cart";
import { db } from "./fire";
import Navbar from "./Navbar";

export default function EditUser() { // Stranica za editovanje naseg naloga kao i dodavanja novog produkta ukoliko je User administrator.


    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [password, setPassword] = useState(null);
    const [newEmail, setNewEmail] = useState(null); // Account information
    const [status, setStatus] = useState({ working: false, message: '' });
    const [newProductStatus, setNewProductStatus] = useState({ working: false, message: '' });
    const userDetails = useSelector((state) => state.UserSlice.userDetails);
    const [page, setPage] = useState("editaccount");
    const [sizesDisplay, setSizesDisplay] = useState("none");
    const redirectState = useLocation(); // When we click add new product from the navbar, we use this to actually display new product page and not the editAccount page.
    const [productSizes, setProductSizes] = useState([]);
    const [productSize, setProductSize] = useState();
    useEffect(() => {
        if (redirectState.state?.page === 'addNewProduct') {
            setPage('addnewproduct');
        }
    }, []);
    const auth = getAuth();
    useEffect(() => {
        if (productSizes.length > 0) {
            setSizesDisplay("flex");
        }
    }, [productSizes]);



    const [price, setPrice] = useState(null); // Add new product information
    const [title, setTitle] = useState(null);
    const [gender, setGender] = useState('Male');
    const [images, setImages] = useState([]);

    const switchPages = () => {
        if (page === 'editaccount') {
            setPage('addnewproduct');
            return;
        }
        setPage('editaccount');
    }


    const nav = useNavigate();
    console.log(userDetails);
    const input = {
        background: '#ccc',
        fontSize: '1rem',
        color: 'black',
        padding: '.5rem',
        borderRadius: '10px',
        border: 'none'
    }
    const addSize = (e) => {
        e.preventDefault();

        if (productSize && productSize < 60 && !productSizes.includes(productSize)) {
            setProductSizes([...productSizes, productSize]);
        }
    }



    const cancel = () => {
        nav('/');
    }
    const save = async () => { // Saves user account settings
        setStatus({ working: true, message: 'Working...' });
        if (firstName != null) {
            await setDoc(doc(db, `/users/${userDetails.uid}`), {
                firstName: firstName
            }, { merge: true }).then(() => {
                setStatus({ working: false, message: 'Successful!' });
                setFirstName(null);
            });
        }
        if (lastName != null) {
            await setDoc(doc(db, `/users/${userDetails.uid}`), {
                lastName: lastName
            }, { merge: true }).then(() => {
                setStatus({ working: false, message: 'Successful!' });
                setLastName(null);
            });
        }
        if (newEmail != null) {
            updateEmail(auth.currentUser, newEmail).then(() => {
                setDoc(doc(db, "users/" + auth.currentUser.uid), {
                    email: newEmail
                }, { merge: true });
            }).then(() => {

                setStatus({ working: false, message: 'Successful! From now you, use ' + newEmail + " to log in." });
            }).catch((err) => {
                setStatus({ working: false, message: 'Something went wrong! - ' + err.message })
                setNewEmail(null);
            });
        }
        if (password != null) {
            updatePassword(auth.currentUser, password).then(() => {
                setStatus({ working: false, message: 'Successful!' });
            }).catch((err) => {
                setStatus({ working: false, message: 'An error has occured! - ' + err.message });
                setPassword(null);
            });
        }
    }
    const handleNewImage = (e) => { // Kada izaberemo slike za novi produkat, dodamo ih u Array.
        var images = e.target.files;
        if (images.length > 4) {
            alert("You cannot upload more than 4 images.")
            return;
        }
        setImages([...images]);
    }
    useEffect(() => { console.log(userDetails) }, [userDetails]);

    const addNewProduct = () => { // Kada kliknemo Add product, dodajemo informacije o produktu u Firestore, zatim dodajemo sve slike u Firebase storage.
        // Nacin na koji prepoznajemo koja slika pripada kojem dokumentu u Firestoru je preko generisanog ID'a (res.id). 
        // Folderi u Storage koji imaju slike imaju ISTI id kao i dokumenti u Firestore-u.
        if (title === null || price === null || gender === null || productSizes.length <= 0 || images.length <= 0) {
            return;
        }
        setNewProductStatus({ working: true, message: 'Working...', state: 'working' });
        addDoc(collection(db, "/products"),
            {
                title: title,
                price: price,
                gender: gender,
                sizes: productSizes,
            }).then((res) => {
                setDoc(doc(db, `/products/${res.id}`), {
                    image: `products/${res.id}`,
                    id: res.id,
                    imageCount: images.length,
                    uploadDate: new Date().getTime()
                }, { merge: true }).then(() => {
                    const storage = getStorage();

                    images.map((image, index) => {

                        const imageReference = ref(storage, `/products/${res.id}/${index}`);
                        uploadBytes(imageReference, image).then(() => {
                            setNewProductStatus({ working: false, message: 'Successfully uploaded the product!', state: 'success' });
                            setGender('Male');

                        }).catch((err) => {
                            setNewProductStatus({ working: true, message: 'Something wrong happened - ' + err.message, state: 'error' });
                        });
                    })
                });
            }).catch((err) => {
                setNewProductStatus({ working: true, message: 'An error has occured - ' + err.message });
            });
    }


    return (
        <div className="gradient" id={styles.container}>
            {page === 'editaccount' ?
                <>
                    <Navbar />
                    <Paper id={styles.mainGrid}>

                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Avatar sx={{ width: '9vw', height: '9vw', minWidth: '100px', minHeight: '100px' }} />
                        </div>
                        <div>
                            <div className="flex gap centerY">
                                <h1>My Profile</h1>
                                <AdminOnly>
                                    <Add className="hoverable" onClick={() => switchPages()} />
                                    <small>Add new product</small>
                                </AdminOnly>


                            </div>
                            <div id={styles.infoGrid}>
                                <input style={input} type='text' placeholder='FIRST NAME' defaultValue={userDetails.firstName} onChange={(e) => setFirstName(e.target.value)}></input>
                                <input style={input} type='text' placeholder="LAST NAME" defaultValue={userDetails.lastName} onChange={(e) => setLastName(e.target.value)}></input>
                                <input style={input} type='email' placeholder="EMAIL" defaultValue={userDetails.email} onChange={(e) => setNewEmail(e.target.value)}></input>
                                <input style={input} type='password' placeholder="PASSWORD" onChange={(e) => setPassword(e.target.value)}></input>
                            </div>
                            <div>
                                <div className="flex centerY gap">
                                    <h2>Authentication</h2>
                                    {
                                        status.working ?
                                            <div className={styles.statusContainer}>
                                                <img src={loading} />
                                                <p >{status.message}</p>
                                            </div>
                                            :
                                            <div className={styles.statusContainer}>
                                                <p>{status.message}</p>
                                            </div>
                                    }
                                </div>
                                <small>EMAIL</small>
                                <p>{userDetails.email}</p>

                            </div>
                        </div>
                    </Paper >
                    <div id={styles.footer}>
                        <div>
                            <Button fullWidth sx={{ borderRadius: '50px', background: '#fff' }} onClick={() => cancel()}>
                                <CancelOutlined color='error' />
                            </Button>
                        </div>
                        <div>
                            <Button fullWidth sx={{ borderRadius: '50px', background: 'rgb(0,150,90)' }} onClick={() => save()}>
                                <SaveAsOutlined color='primary' />
                            </Button>
                        </div>
                    </div>
                </> :
                <Paper id={styles.newProduct}>

                    <div className="flex centerY gap">
                        <div className="flex centerY hoverable" onClick={() => switchPages()}>
                            <ArrowLeft style={{ transform: 'scale(1.8)' }} />
                            <p>Go back</p>
                        </div>
                    </div>
                    <div id={styles.newContainer} >
                        {newProductStatus.message.length > 0 && <div id={styles.status}>
                            {newProductStatus.working &&
                                <img src={loading} />}
                            <span style={{ padding: '10px', width: 'fit-content' }}>{newProductStatus.message}</span>
                        </div>}
                        <h1>Add new product</h1>
                        <div className={styles.newItem}>

                            <p>What is the title of the product?</p>
                            <input type='text' className="input-primary" onChange={(e) => setTitle(e.target.value)}></input>
                        </div>
                        <div className={styles.newItem}>
                            <p>Gender</p>

                            <select style={select} onChange={(e) => setGender(e.target.value)}>
                                <option value='Male'>Male</option>
                                <option value='Female'>Female</option>
                                <option value='Unisex'>Unisex</option>
                            </select>
                        </div>
                        <div className={styles.newItem}>
                            <div className="flex gap" >
                                <p>Sizes available (EU)</p>
                                <button className="btn-third" onClick={() => setProductSizes([])}>Clear</button>
                            </div>
                            <form onSubmit={(e) => addSize(e)}>
                                <input type='number' className='input-primary' onChange={(e) => setProductSize(e.target.value)} />

                                {productSizes.length > 0 && <div id={styles.sizesContainer} style={{ display: sizesDisplay }}>
                                    {productSizes.map((size, index) => {
                                        return <span key={index}>{size}</span>
                                    })}
                                </div>}

                            </form>
                        </div>
                        <div className={styles.newItem} id={styles.newImage}>
                            <div>
                                <p>Image/s of the product</p>

                                <button style={{ width: '100%', maxWidth: '450px' }}>
                                    <input type="file" style={{ border: 'none' }} className="input-primary" multiple onChange={(e) => handleNewImage(e)} />
                                </button>
                            </div>

                        </div>

                        <div className={styles.newItem} id={styles.newPrice}>
                            <p>Price</p>
                            <input type='number' className="input-primary" onChange={(e) => setPrice(e.target.value)} />
                        </div>

                        <button onClick={() => addNewProduct()} className='btn-primary' id={styles.addProductBtn}>Add</button>
                    </div>


                </Paper>

            }
        </div >
    )
}