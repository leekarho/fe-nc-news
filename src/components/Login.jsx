import { useContext, useEffect, useState } from "react";
import { getUsers } from "../api/api";
import styles from "../styles/Login.module.css";
import UserContext from "../context/UserContext";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

export default function Login() {
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);
  const [users, setUsers] = useState([]);
  const [confirmLogin, setConfirmLogin] = useState(false);

  useEffect(() => {
    getUsers().then(({ data }) => {
      setUsers(data.users);
    });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleClick = (event) => {
    setLoggedInUser(event);
    setConfirmLogin(true);
  };

  const handleClose = () => {
    setConfirmLogin(false);
  };

  return (
    <>
      <Dialog open={confirmLogin}>
        <DialogContent>
          <p>Logged in as {loggedInUser.username}</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>OK</Button>
        </DialogActions>
      </Dialog>
      {users.map((user, index) => (
        <div className={styles.user} key={index}>
          <div className={styles.userAvatar}>
            <p>{user.username}</p>
            <img className={styles.image} src={user.avatar_url} />
          </div>
          {loggedInUser.username === user.username ? null : (
            <form onSubmit={handleSubmit}>
              <button
                type="button"
                onClick={() => handleClick(user)}
                className={styles.loginBtn}
              >
                Login
              </button>
            </form>
          )}
        </div>
      ))}
    </>
  );
}
