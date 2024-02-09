import TopicDropdown from "./TopicDropdown";
import UserContext from "../context/UserContext";
import { useContext } from "react";
import styles from "../styles/NavBar.module.css";
import { Link } from "react-router-dom";

export default function NavBar() {
  const { loggedInUser } = useContext(UserContext);

  const isEmpty = Object.keys(loggedInUser).length === 0;

  return (
    <>
      <div className={styles.topicUser}>
        <TopicDropdown />
        <Link to="login">
          {isEmpty ? (
            <p className={styles.signIn}>Sign-in</p>
          ) : (
            <p>
              <img
                className={styles.image}
                src={loggedInUser.avatar_url}
                alt="user avatar"
              />
              {loggedInUser.username}
            </p>
          )}
        </Link>
      </div>
    </>
  );
}
