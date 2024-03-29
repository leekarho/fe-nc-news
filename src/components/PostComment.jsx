import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import { useContext, useEffect, useState } from "react";
import { postComment } from "../api/api";
import ErrorPage from "./ErrorPage";
import styles from "../styles/PostComment.module.css";
import UserContext from "../context/UserContext";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

export default function PostComment({ article_id, setIsPostComment }) {
  const { loggedInUser } = useContext(UserContext);
  const isEmpty = Object.keys(loggedInUser).length === 0; //check if there is user

  const [post, setPost] = useState(""); //onChange post
  const [comment, setComment] = useState(""); //comment onSubmit
  const [confirmPost, setConfirmPost] = useState(false); //for dialogue box
  const [err, setErr] = useState(null);

  useEffect(() => {
    if (comment !== "") {
      postComment(article_id, loggedInUser.username, comment)
        .then(() => {
          setIsPostComment(true);
          setConfirmPost(true);
        })
        .catch((error) => {
          setErr("Unable to post comment. Try again");
        });
    }
  }, [comment]);

  const handleChange = (e) => {
    setPost(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setComment(post);
    setPost("");
  };

  const handleClose = () => {
    setConfirmPost(false);
  };

  if (err) {
    return <ErrorPage error={err} />;
  }

  return (
    <>
      <Dialog open={confirmPost}>
        <DialogContent>
          <p>1 new comment!</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>OK</Button>
        </DialogActions>
      </Dialog>
      {isEmpty ? null : (
        <form action="" onSubmit={handleSubmit} className={styles.postSection}>
          <TextareaAutosize
            className={styles.textBox}
            required
            id=""
            minRows={6}
            placeholder="Create Post"
            value={post}
            onChange={handleChange}
          />
          <button className={styles.btn}>Comment</button>
        </form>
      )}
    </>
  );
}
