import { useState } from "react";
import styles from "../stylings/ContactUs.module.css";

export default function ContactUs() {
  const [mailSent, setMailSent] = useState(false);
  const submitEmail = () => {
    setMailSent(true);
    setTimeout(() => {
      setMailSent(false); 
    }, 2000); 
  }
  return (
    <div className={styles.container}>
     <div className={styles.innerContainer}>
      <div className={styles.sectionOne}>
        <h1>LET'S GET</h1>
        <h1>
          IN CONTACT
          <span style={{color:'crimson', WebkitTextStroke:'0'}}>!</span>
        </h1>
      </div>
      <div className={styles.sectionTwo}>
        <input type="text" name="" id="" placeholder="Name" />
        <input type="text" name="" id="" placeholder="Email" />
        <input type="text" name="" id="" placeholder="Hello, I wanted to tell you that..." />
       <button onClick={() => submitEmail()}>{`LET'S ROCK ->`}</button>
      </div>
       <div className={styles.sent} style={{display: mailSent ? "block" : "none" }}>Your email has been sent successfully!</div>
     </div>
    </div>
  );
}
