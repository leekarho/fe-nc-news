import styles from "../styles/Comments.module.css";
import { getComments, getCommentsByPage } from "../api/api";
import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import InsertCommentOutlinedIcon from "@mui/icons-material/InsertCommentOutlined";

export default function Comments({ article_id }) {
  const [comments, setComments] = useState([]);
  const [isComments, setIsComments] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(2);
  const [err, setErr] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getComments(article_id)
      .then(({ data }) => {
        setComments(data.comments);
        setIsComments(true);
        setIsLoading(false);
      })
      .catch((error) => {
        setErr(error);
      });
  }, []);

  const fetchMoreData = () => {
    getCommentsByPage(article_id, page).then(({ data }) => {
      if (data.comments.length > 0) {
        setComments((prevComments) => [...prevComments, ...data.comments]);
        setPage(page + 1);
        setHasMore(true);
      } else {
        setHasMore(false);
      }
    });
  };

  if (err) {
    return <ErrorPage error={err} />;
  }

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      {isComments ? (
        <InfiniteScroll
          dataLength={comments.length}
          next={fetchMoreData}
          hasMore={hasMore}
        >
          <div className={styles.commentsContainer}>
            <div className={styles.comments}>
              <InsertCommentOutlinedIcon /> {comments.length} comments
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
      ) : null}
    </>
  );
}
