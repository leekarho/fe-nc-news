import { Link } from "react-router-dom";
import styles from "../styles/Articles.module.css";
import InfiniteScroll from "react-infinite-scroll-component";
import InsertCommentOutlinedIcon from "@mui/icons-material/InsertCommentOutlined";
import { useState } from "react";
import { getArticlesByQueries } from "../api/api";

export default function Articles({
  articles,
  setArticles,
  topic,
  sortByQuery,
  orderByQuery,
  page,
  setPage,
}) {
  const [hasMore, setHasMore] = useState(true); //for pagination
  // const [page, setPage] = useState(2); //for pagination

  const fetchMoreData = () => {
    getArticlesByQueries(topic, sortByQuery, orderByQuery, page).then(
      ({ data }) => {
        if (data.articles.length > 0) {
          setArticles((prevArticles) => [...prevArticles, ...data.articles]);
          setPage(page + 1);
          setHasMore(true);
        } else {
          setHasMore(false);
        }
      }
    );
  };

  return (
    <>
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={hasMore}
      >
        <div className="articles">
          {articles.map((article, index) => (
            <div className="container" key={index}>
              <div className="topicAuthor">
                <p className="topic">{article.topic} </p>
                <p className={styles.author}>
                  {article.author}{" "}
                  {new Date(article.created_at).toLocaleString("en-GB")}
                </p>
              </div>
              <Link to={`/article/${article.article_id}`}>
                <p className="title">{article.title}</p>
                <img
                  className="image"
                  src={article.article_img_url}
                  alt="article image"
                />
              </Link>
              <div className="comments">
                <InsertCommentOutlinedIcon /> {article.comment_count} comments
              </div>
              <div className={styles.votes}>
                <p>{article.votes} votes</p>
              </div>
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </>
  );
}
