import { Link } from "react-router-dom";
import bg from "../images/ContactUs-background.png";
import styles from "../stylings/ContactUs.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faClose, faMessage, faPhone, faWarning } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import ReactDOM from "react-dom";

export default function ContactUs() {
  const [name, setName] = useState();
  const [lastName, setLastName] = useState();
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState();
  const [status, setStatus] = useState(null);

  const sendEmail = () => {
    setStatus(null);
    if (!name || !lastName || !email) {
      setStatus({ message: "You must input all required fields.", color: "crimson" });
    } else {
      setStatus({ message: "Successfully submitted the email!", color: "green" });
    }
  };
  return (
    <div id={styles.container}>
      <div id={styles.header} style={{ backgroundImage: `url(${bg})` }}>
        <h1>Contact Us</h1>
        <p>Having problems? React over to our customer support who can help you or call us!</p>
      </div>
      <div id={styles.contactUs}>
        <div className={`${styles.leftElement} boxShadowY`}>
          <p>Call us directly at</p>
          <h2 id={styles.number}>+381 1337 1337</h2>
          <Link className="link">See all numbers and locations</Link>
          <FontAwesomeIcon icon={faPhone} className={styles.icon} color="dodgerblue" />
        </div>

        <div id={`${styles.rightElement}`} className="boxShadowY">
          <h3 style={{ color: "white" }}>Send us an Email</h3>
          <p>To send us an email regarding your inquiry please complete the form below and click "Send".</p>
          <div id={styles.form}>
            <div className={styles.formElement}>
              <span>FIRST NAME</span>
              <input type="text" className="input boxShadowY" onChange={(e) => setName(e.target.value)} />
            </div>
            <div className={styles.formElement}>
              <span>LAST NAME</span>
              <input type="text" className="input boxShadowY" onChange={(e) => setLastName(e.target.value)} />
            </div>
            <div className={styles.formElement}>
              <span>PHONE</span>
              <input type="number" className="input boxShadowY" onChange={(e) => setPhone(e.target.value)} />
            </div>
            <div className={styles.formElement}>
              <span>EMAIL</span>
              <input type="text" className="input boxShadowY" onChange={(e) => setEmail(e.target.value)} />
            </div>
          </div>
          <button className={styles.btn} style={{ width: "100%", marginTop: "10px" }} onClick={sendEmail}>
            Send
          </button>
        </div>
        <div className={`${styles.leftElement} boxShadowY`}>
          <p>Chat with our sales team</p>
          <button className={styles.btn}>CHAT WITH SALES</button>
          <FontAwesomeIcon icon={faMessage} className={styles.icon} color="dodgerblue" />
        </div>
      </div>
      {status &&
        ReactDOM.createPortal(
          <div className="error" style={{ background: status.color }}>
            <FontAwesomeIcon icon={status.color != "green" ? faWarning : faCheck} />
            <p>{status.message}</p>
            <div className="error-exit">
              <FontAwesomeIcon icon={faClose} onClick={() => setStatus(null)} />
            </div>
          </div>,
          document.getElementById("status-portal")
        )}
    </div>
  );
}
