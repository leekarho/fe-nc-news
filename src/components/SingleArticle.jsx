import { useParams } from "react-router-dom";
import { getArticles, getComments, updateVoteOnArticle } from "../api/api";
import { useEffect, useState } from "react";
import Comments from "./Comments";
import styles from "../styles/SingleArticle.module.css";
import { Button } from "@mui/material";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ThumbDownAltOutlinedIcon from "@mui/icons-material/ThumbDownAltOutlined";
import ErrorPage from "./ErrorPage";

export default function SingleArticle() {
  const { article_id } = useParams();
  const [singleArticle, setSingleArticle] = useState({});
  const [err, setErr] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getArticles(article_id)
      .then(({ data }) => {
        setSingleArticle(data.article);
        setIsLoading(false);
      })
      .catch((error) => {
        setErr(error);
      });
  }, [article_id]);

  const handleClickUp = () => {
    setSingleArticle((prev) => ({ ...prev, votes: prev.votes + 1 }));
    updateVoteOnArticle(article_id, 1).catch((err) => {
      setSingleArticle((prev) => ({ ...prev, votes: prev.votes + 1 }));
      setErr("Something went wrong, please try again.");
      ErrorPage(err);
    });
  };

  const handleClickDown = () => {
    setSingleArticle((prev) => ({ ...prev, votes: prev.votes - 1 }));
    updateVoteOnArticle(article_id, 1).catch((err) => {
      setSingleArticle((prev) => ({ ...prev, votes: prev.votes - 1 }));
      setErr("Something went wrong, please try again.");
      ErrorPage(err);
    });
  };

  if (err) {
    return <ErrorPage error={err} />;
  }

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <div className={styles.singleArticle}>
        <div className={styles.topicAuthor}>
          <p className={styles.topic}>{singleArticle.topic}</p>
          <p className={styles.author}>Posted by {singleArticle.author}</p>
        </div>
        <p className={styles.title}>{singleArticle.title}</p>
        <p className={styles.articleBody}>{singleArticle.body}</p>
        <div>
          <Button
            className={styles.votes}
            onClick={handleClickUp}
            startIcon={<ThumbUpAltOutlinedIcon />}
          ></Button>
          <span>{singleArticle.votes}</span>
          <Button
            className={styles.votes}
            onClick={handleClickDown}
            startIcon={<ThumbDownAltOutlinedIcon />}
          ></Button>
          {err ? <p>{err}</p> : null}
        </div>
      </div>
      <Comments article_id={article_id} />
    </>
  );
}
