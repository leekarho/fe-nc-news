import { Link } from "react-router-dom";
import styles from "../styles/Articles.module.css";
import InfiniteScroll from "react-infinite-scroll-component";
import InsertCommentOutlinedIcon from "@mui/icons-material/InsertCommentOutlined";
import { useState } from "react";
import { getArticles } from "../api/api";

export default function Articles({ articles, setArticles }) {
  const [hasMore, setHasMore] = useState(true); //for pagination
  const [page, setPage] = useState(2); //for pagination

  const fetchMoreData = () => {
    getArticles(page).then(({ data }) => {
      if (data.articles.length > 0) {
        setArticles((prevArticles) => [...prevArticles, ...data.articles]);
        setPage(page + 1);
        setHasMore(true);
      } else {
        setHasMore(false);
      }
    });
  };

  return (
    <>
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={hasMore}
      >
        <div className={styles.articles}>
          {articles.map((article, index) => (
            <div className={styles.container} key={index}>
              <div className={styles.topicAuthor}>
                <p className={styles.topic}>{article.topic} </p>
                <p className={styles.author}>{article.author}</p>
                <p>{new Date(article.created_at).toLocaleString("en-GB")}</p>
              </div>
              <Link to={`/article/${article.article_id}`}>
                <p>{article.title}</p>
                <img
                  className={styles.image}
                  src={article.article_img_url}
                  alt="article image"
                />
              </Link>
              <div className={styles.comments}>
                <InsertCommentOutlinedIcon /> {article.comment_count} comments
              </div>
              <div className={styles.comments}>
                <p>{article.votes} votes</p>
              </div>
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </>
  );
}
