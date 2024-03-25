import { Link } from "react-router-dom";
import styles from "../styles/Header.module.css";

export default function Header() {
  return (
    <>
      <div className={styles.logo}>
        <Link to="/">
          <h1 className={styles.heading}>NC NEWS</h1>
        </Link>
      </div>
    </>
  );
}
