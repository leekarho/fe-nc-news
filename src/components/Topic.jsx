import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getArticlesByTopic } from "../api/api";
import styles from "../styles/Articles.module.css";
import InsertCommentOutlinedIcon from "@mui/icons-material/InsertCommentOutlined";

export default function Topic() {
  const { topic } = useParams();
  const [articlesByTopic, setArticlesByTopic] = useState([]);

  useEffect(() => {
    getArticlesByTopic(topic).then(({ data }) => {
      setArticlesByTopic(data.articles);
    });
  }, [topic]);

  return (
    <>
      <div className={styles.articles}>
        {articlesByTopic.map((article, index) => (
          <div className={styles.container} key={index}>
            <div className={styles.topicAuthor}>
              <p className={styles.topic}>{article.topicnpm} </p>
              <p className={styles.author}>{article.author}</p>
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
          </div>
        ))}
      </div>
    </>
  );
}
