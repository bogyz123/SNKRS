import { useState } from "react";
import styles from "../stylings/ContactUs.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faMailBulk, faMessage } from "@fortawesome/free-solid-svg-icons";

export default function ContactUs() {
  const [animation, setAnimation] = useState("");
  const [visible, setVisible] = useState(false);

  const send = () => {
    setAnimation("test");
    setTimeout(() => {
      setVisible(true);
    }, 400);
  };
  return (
    <div id={styles.container} className={`${styles[animation]}`}>
      {visible ? (
        <>
          <div>
            <FontAwesomeIcon icon={faCheck} color="green" />
          </div>
          <p className="text-center">Your inquiry is being processed! Check your mailbox within couple of hours.</p>
        </>
      ) : (
        <>
          <div className={styles.icon}>
            <FontAwesomeIcon icon={faMessage} />
          </div>
          <h2 className="text-center">Contact Us</h2>
          <p className="text-center">Contact Us</p>
          <div id={styles.details}>
            <input placeholder="Name" type="text" className="input" />
            <input placeholder="Email" type="email" className="input" />
            <input placeholder="Phone" type="number" className="input" />
            <textarea type="text" placeholder="Inquiry" className="input" />
            <button className="button-primary primary-btn" style={{ color: "white", width: "100%" }} onClick={() => send()}>
              Submit
            </button>
          </div>
        </>
      )}
    </div>
  );
}
