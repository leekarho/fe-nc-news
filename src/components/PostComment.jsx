import Textarea from "@mui/joy/Textarea";
import { useEffect, useState } from "react";
import { postComment } from "../api/api";
import ErrorPage from "./ErrorPage";
import styles from "../styles/PostComment.module.css";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

export default function PostComment({ article_id, setIsPostComment }) {
  const [post, setPost] = useState(""); //onChange post
  const [comment, setComment] = useState(""); //comment onSubmit
  const [confirmPost, setConfirmPost] = useState(false);
  const [err, setErr] = useState(null);

  useEffect(() => {
    if (comment !== "") {
      postComment(article_id, "cooljmessy", comment)
        .then((response) => {
          setIsPostComment(true);
          setConfirmPost(true);
        })
        .catch((error) => {
          setErr(error);
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
      <form action="" onSubmit={handleSubmit} className={styles.postSection}>
        <Textarea
          className={styles.textBox}
          name=""
          id=""
          cols="30"
          rows="10"
          placeholder="Create Post"
          value={post}
          onChange={handleChange}
        />
        <button>Comment</button>
      </form>
    </>
  );
}
