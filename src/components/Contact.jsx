import emailjs from "@emailjs/browser";
import { Check } from "@mui/icons-material";
import { Alert } from "@mui/material";
import { useRef, useState } from "react";
import Navbar from "../components/Navbar";
import styles from "../styles/Contact.module.css";


export default function Contact() { // Kontakt stranica. Koristi EmailJS za slanje maila.
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [email, setEmail] = useState();
    const [message, setMessage] = useState();
    const [status, setStatus] = useState({ visibility: 'none' });
    const input = {
        padding: '1rem 1rem',
        color: 'black',
        fontFamily: 'Rubik, sans-serif',
        fontSize: '1.05rem'
    }
    const messageInput = {
        color: 'black',
        fontFamily: 'Rubik, sans-serif',
        fontSize: '1.05rem',
        height: '150px',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'flex-start'
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const params = {
            from_name: firstName + " " + lastName,
            to_name: 'Bogdan',
            email: email,
            message: message
        }
        if (params.message && params.from_name && params.email) {
            emailjs.send("service_w6ldr5g", "template_jrxsx6v", params, "vZix48v_xTY9bzJav").then((result) => {
                setStatus({ visibility: 'flex', message: 'Successfully sent the email!', severity: 'success' });
            }).catch((err) => {
                setStatus({ visibility: 'flex', message: 'Something wrong happened! Please try again later.', severity: 'error' });
            });
        }
        else {
            setStatus({ visibility: "flex", message: 'You did not enter every field.', severity: 'warning' });
            return;
        }
    }
    const formRef = useRef();
    return (
        <>
            <div className="gradient">
                <Navbar />
            </div>
            <div id={styles.container}>
                <form id={styles.formsContainer} ref={formRef}>
                    <div style={{ display: 'flex', columnGap: '1rem' }}>
                        <div>
                            <p>FIRST NAME</p>
                            <input type="text" style={input} onChange={(e) => setFirstName(e.target.value)} />
                        </div>
                        <div>
                            <p>LAST NAME</p>
                            <input type="text" style={input} onChange={(e) => setLastName(e.target.value)} />
                        </div>
                    </div>

                    <div className={styles.form}>
                        <p>EMAIL</p>
                        <input type="email" style={input} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className={styles.form}>
                        <p>MESSAGE</p>
                        <input style={{width:'100%'}} className="input-primary" type="text" required onChange={(e) => setMessage(e.target.value)}></input>
                    </div>
                    <button type="submit" className="btn-third" style={{ width: '100%' }} onClick={(e) => handleSubmit(e)}>Send Message</button>
                    <Alert severity={status.severity} sx={{ display: status.visibility, fontFamily: 'Rubik, sans-serif' }}>{status.message}</Alert>
                </form>
                <div id={styles.help}>
                    <h2>How can we help?</h2>
                    <p>Get in touch with SNKRS' team.</p>
                    <div className="flex centerY">
                        <Check />
                        <strong>Fast Support</strong>
                    </div>
                    <small>Our support team answers within 12 hours.</small>
                </div>
            </div>
        </>
    )
}


