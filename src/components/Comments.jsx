import styles from "../styles/Comments.module.css";
import { getComments, getCommentsByPage, removeComment } from "../api/api";
import ErrorPage from "./ErrorPage";
import { useState, useEffect, useContext } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import InsertCommentOutlinedIcon from "@mui/icons-material/InsertCommentOutlined";
import UserContext from "../context/UserContext";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

export default function Comments({
  article_id,
  comments,
  setComments,
  comment_count,
  setIsPostComment,
}) {
  const { loggedInUser } = useContext(UserContext);
  const [hasMore, setHasMore] = useState(true); //for pagination
  const [page, setPage] = useState(2); //for pagination
  const [deleteComment, setDeleteComment] = useState(false);
  const [deletePost, setDeletePost] = useState(false); //for dialog popup
  const [commentId, setCommentId] = useState();
  const [err, setErr] = useState(null);

  const fetchMoreData = () => {
    getCommentsByPage(article_id, page)
      .then(({ data }) => {
        if (data.comments.length > 0) {
          setComments((prevComments) => [...prevComments, ...data.comments]);
          setPage(page + 1);
          setHasMore(true);
        } else {
          setHasMore(false);
        }
      })
      .catch((error) => {
        setErr(error);
      });
  };

  useEffect(() => {
    if (deleteComment) {
      removeComment(commentId)
        .then(() => {
          setDeleteComment(false);
          setIsPostComment(true); //to trigger getComments in SingleArticleManager
          setDeletePost(true); //for dialog popup
        })
        .catch((err) => {
          console.log("bye");
        });
    }
  }, [deleteComment]);

  const handleClick = (commentId) => {
    setDeleteComment(true);
    setCommentId(commentId);
  };

  const handleClose = () => {
    setDeletePost(false);
  };

  if (err) {
    return <ErrorPage error={err} />;
  }

  return (
    <>
      <InfiniteScroll
        dataLength={comments.length}
        next={fetchMoreData}
        hasMore={hasMore}
      >
        <Dialog open={deletePost}>
          <DialogContent>
            <p>Comment deleted!</p>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>OK</Button>
          </DialogActions>
        </Dialog>
        <div className={styles.commentsContainer}>
          <div className={styles.comments}>
            <InsertCommentOutlinedIcon /> {comment_count} comments
          </div>
          {comments.map((comment, index) => (
            <div key={index}>
              <div className={styles.topicAuthor}>
                <p className={styles.author}> {comment.author} </p>
              </div>
              <p> {comment.body} </p>
              {comment.author === loggedInUser.username ? (
                <button onClick={() => handleClick(comment.comment_id)}>
                  Delete
                </button>
              ) : null}
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </>
  );
}
