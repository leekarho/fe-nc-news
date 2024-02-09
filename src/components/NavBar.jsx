import TopicDropdown from "./TopicDropdown";
import UserContext from "../context/UserContext";
import { useContext } from "react";
import styles from "../styles/NavBar.module.css";

export default function NavBar() {
  const { loggedInUser } = useContext(UserContext);
  return (
    <>
      <div className={styles.topicUser}>
        <TopicDropdown />
        <p>
          <img
            className={styles.image}
            src={loggedInUser.avatar_url}
            alt="user avatar"
          />
          {loggedInUser.username}
        </p>
      </div>
    </>
  );
}
