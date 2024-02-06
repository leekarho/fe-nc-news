import { Link } from "react-router-dom";
import styles from "../styles/Header.module.css";

export default function Header() {
  return (
    <>
      <div className={styles.header}>
        <h1>NC NEWS</h1>
        <p>Topic</p>
        <Link to="/login">
          <p>Login</p>
        </Link>
      </div>
    </>
  );
}
