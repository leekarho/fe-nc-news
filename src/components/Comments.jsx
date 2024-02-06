import styles from "../styles/Comments.module.css";
import { getComments, getCommentsByPage } from "../api/api";
import ErrorPage from "./ErrorPage";
import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import InsertCommentOutlinedIcon from "@mui/icons-material/InsertCommentOutlined";

export default function Comments({
  article_id,
  comments,
  setComments,
  comment_count,
}) {
  const [hasMore, setHasMore] = useState(true); //for pagination
  const [page, setPage] = useState(2); //for pagination
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
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </>
  );
}
