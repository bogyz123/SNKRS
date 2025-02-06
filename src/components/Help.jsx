import { Outlet } from "react-router";
import styles from "../stylings/Help.module.css";
import { Link } from "react-router-dom";

export default function Help() {
  return (
    <div id={styles.container}>
      <Outlet />
      <div className="flex | flexCol | m-10">
        <h3 className="text-center">Need help?</h3>
        <Link to="/help/faq" className="link">
          FAQ
        </Link>
        <Link to="/help/policy" className="link">
          Return Policy
        </Link>
      </div>
    </div>
  );
}
