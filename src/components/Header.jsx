import { Link } from "react-router-dom";
import styles from "../styles/Header.module.css";
import { useContext } from "react";
import UserContext from "../context/UserContext";

export default function Header() {
  const { loggedInUser } = useContext(UserContext);
  return (
    <>
      <div className={styles.header}>
        <Link to="/">
          <h1>NC NEWS</h1>
        </Link>
        <p>Topic</p>
        <div className={styles.user}>
          <p>
            Welcome <img src={loggedInUser.avatar_url} alt="user avatar" />{" "}
            {loggedInUser.username}
          </p>
        </div>
      </div>
    </>
  );
}
