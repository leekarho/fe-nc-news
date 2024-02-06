import { Link } from "react-router-dom";
import styles from "../styles/Articles.module.css";

export default function Articles({ articles }) {
  return (
    <>
      <div className={styles.articles}>
        {articles.map((article, index) => (
          <div className={styles.container} key={index}>
            <div className={styles.topicAuthor}>
              <p className={styles.topic}>{article.topic} </p>
              <p className={styles.author}>{article.author}</p>
              <p className={styles.author}>{article.created_at}</p>
            </div>
            <Link to={`/article/${article.article_id}`}>
              <p>{article.title}</p>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
