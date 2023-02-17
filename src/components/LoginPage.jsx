import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "@firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import styles from "../styles/LoginPage.module.css";
import { app, db } from "./fire";
import Navbar from "./Navbar";
import { setUserDetails } from "./redux/UserSlice";



export default function LoginPage() { // Login/Signup stranica. Jedna komponenta koja handluje oba slucaja uz pomoc Statea.
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const isLoggedIn = useSelector((state) => state.UserSlice.isLoggedIn);
    const [status, setStatus] = useState("");
    const nav = useNavigate();
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const dispatch = useDispatch();
    const handlePage = () => {
        setEmail(null);
        setPassword(null);
        setStatus(""); 
        setIsLogin(!isLogin);

    }
    const auth = getAuth(app);
    const registerHandler = (e) => {
        e.preventDefault();
        if (isEmpty()) {
            setStatus("Enter every field.");
            return;
        }

        createUserWithEmailAndPassword(auth, email, password).then((user) => {
            setDoc(doc(db, `/users/${user.user.uid}`), {
                isAdmin: false,
                email: email,
                firstName: firstName,
                lastName: lastName,
                uid: user.user.uid
            }).then(() => {
                dispatch(setUserDetails({ isAdmin: false, email: email, firstName: firstName, lastName: lastName, uid: user.user.uid }));
                setEmail(null);
                setPassword(null);
                setFirstName(null);
                setLastName(null);

            }).catch((error) => {
                setStatus(error.message);
            })
            nav("/");
        }).catch((error) => {
            setStatus(error.message);
        });
    }
    const loginHandler = (e) => {
        e.preventDefault();
        if (isEmpty()) {
            setStatus("Enter every field.");
            return;
        }
        signInWithEmailAndPassword(auth, email, password).then((user) => {
            getDoc(doc(db, `/users/${user.user.uid}`)).then((res) => {
                dispatch(setUserDetails({ ...res.data() }));
            });
            nav("/");
        }).catch((error) => {
            setStatus(error.message);
        })
    }
    const isEmpty = () => {
        if (email === null || password === null) {
            return true;
        }
    }

    return (
        <div className="grad">
            <Navbar />
            {isLogin ?

                <form className={styles.loginContainer}>
                    <small style={{ color: 'crimson' }}>{status}</small>
                    <h3>Sign In</h3>
                    <input type='email' placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
                    <input type='password' placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
                    <button className='btn-secondary' onClick={(e) => loginHandler(e)}>Login</button>
                    <small>Don't have an account? <span id={styles.signup} onClick={handlePage}>Sign Up.</span></small>
                </form>

                :

                <form className={styles.loginContainer}>
                    <small style={{ color: 'crimson' }}>{status}</small>
                    <h3>Sign Up</h3>
                    <input type='email' placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
                    <input type='password' placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
                    <input type='text' placeholder="First Name" onChange={(e) => setFirstName(e.target.value)} required />
                    <input type='text' placeholder="Last Name" onChange={(e) => setLastName(e.target.value)} required />
                    <button className='btn-secondary' onClick={(e) => registerHandler(e)}>Register</button>
                    <small>Have an account? <span id={styles.signup} onClick={handlePage}>Sign In.</span></small>
                </form>

            }
        </div>
    )
}