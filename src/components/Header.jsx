import { Link } from "react-router-dom";
import styles from "../styles/Header.module.css";
import { useContext, useEffect, useState } from "react";
import UserContext from "../context/UserContext";
import TopicDropdown from "./TopicDropdown";

export default function Header() {
  const { loggedInUser } = useContext(UserContext);

  return (
    <>
      <div className={styles.header}>
        <Link to="/">
          <h1>NC NEWS</h1>
        </Link>
        <TopicDropdown />
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
