import { Button } from "@mui/material";
import styles from "../styles/SingleArticle.module.css";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ThumbDownAltOutlinedIcon from "@mui/icons-material/ThumbDownAltOutlined";
import { useState } from "react";
import { updateVoteOnArticle } from "../api/api";

export default function SingleArticlePage({ singleArticle, setSingleArticle }) {
  const [err, setErr] = useState(null);

  const handleClickUp = () => {
    setSingleArticle((prev) => ({ ...prev, votes: prev.votes + 1 }));
    updateVoteOnArticle(singleArticle.article_id, 1).catch((err) => {
      setSingleArticle((prev) => ({ ...prev, votes: prev.votes - 1 }));
      setErr("Something went wrong, please try again.");
    });
  };

  const handleClickDown = () => {
    setSingleArticle((prev) => ({ ...prev, votes: prev.votes - 1 }));
    updateVoteOnArticle(singleArticle.article_id, -1).catch((err) => {
      setSingleArticle((prev) => ({ ...prev, votes: prev.votes + 1 }));
      setErr("Something went wrong, please try again.");
    });
  };

  if (err) {
    return <ErrorPage error={err} />;
  }

  return (
    <div className={styles.singleArticle}>
      <div className={styles.topicAuthor}>
        <p className={styles.topic}>{singleArticle.topic}</p>
        <p className={styles.author}>Posted by {singleArticle.author}</p>
        <p>{new Date(singleArticle.created_at).toLocaleString("en-GB")}</p>
      </div>
      <p className={styles.title}>{singleArticle.title}</p>
      <img
        className={styles.image}
        src={singleArticle.article_img_url}
        alt="article image"
      />
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
      </div>
    </div>
  );
}
