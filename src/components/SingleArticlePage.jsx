import { Button } from "@mui/material";
import styles from "../styles/SingleArticle.module.css";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ThumbDownAltOutlinedIcon from "@mui/icons-material/ThumbDownAltOutlined";
import InsertCommentOutlinedIcon from "@mui/icons-material/InsertCommentOutlined";
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
    <div className="singleArticle">
      <div className="topicAuthor">
        <p className="topic">{singleArticle.topic}</p>
        <p className="author">Posted by {singleArticle.author}</p>
        <p>{new Date(singleArticle.created_at).toLocaleString("en-GB")}</p>
      </div>
      <p className={"title"}>{singleArticle.title}</p>
      <img
        className="image"
        src={singleArticle.article_img_url}
        alt="article image"
      />
      <p>{singleArticle.body}</p>
      <div>
        <Button
          onClick={handleClickUp}
          startIcon={<ThumbUpAltOutlinedIcon />}
        ></Button>
        <span>{singleArticle.votes}</span>
        <Button
          onClick={handleClickDown}
          startIcon={<ThumbDownAltOutlinedIcon />}
        ></Button>
      </div>
      <div className={styles.comments}>
        <InsertCommentOutlinedIcon /> {singleArticle.comment_count} comments
      </div>
    </div>
  );
}
