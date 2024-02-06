import { useParams } from "react-router-dom";
import { getArticles, getComments } from "../api/api";
import { useEffect, useState } from "react";
import Comments from "./Comments";
import styles from "../styles/SingleArticle.module.css";

export default function SingleArticle() {
  const { article_id } = useParams();
  const [singleArticle, setSingleArticle] = useState({});

  useEffect(() => {
    getArticles(article_id).then(({ data }) => {
      setSingleArticle(data.article);
    });
  }, []);

  return (
    <>
      <div className={styles.singleArticle}>
        <div className={styles.topicAuthor}>
          <p className={styles.topic}>{singleArticle.topic}</p>
          <p className={styles.author}>
            Posted by {singleArticle.author} {singleArticle.created_at}
          </p>
        </div>
        <p className={styles.title}>{singleArticle.title}</p>
        <p className={styles.articleBody}>{singleArticle.body}</p>
        <button className={styles.votes}>{singleArticle.votes}</button>
      </div>
      <Comments article_id={article_id} />
    </>
  );
}
