import { useParams } from "react-router-dom";
import { getArticlesById, getComments } from "../api/api";
import { useEffect, useState } from "react";
import Comments from "./Comments";
import SingleArticlePage from "./SingleArticlePage";
import ErrorPage from "./ErrorPage";
import PostComment from "./PostComment";
import CircularProgress from "@mui/material/CircularProgress";

export default function SingleArticleManager() {
  const { article_id } = useParams();
  const [singleArticle, setSingleArticle] = useState({});
  const [comments, setComments] = useState([]);
  const [isPostComment, setIsPostComment] = useState(false); //to update when comment is posted
  const [isComments, setIsComments] = useState(false); //check there are comments to an article
  const [err, setErr] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCommentLoading, setIsCommentLoading] = useState(true);

  useEffect(() => {
    getArticlesById(article_id)
      .then(({ data }) => {
        setSingleArticle(data.article);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        setErr("Article not found!");
      });
  }, [article_id]);

  useEffect(() => {
    getComments(article_id)
      .then(({ data }) => {
        setComments(data.comments);
        setIsComments(true);
        setIsPostComment(false);
        setIsCommentLoading(false);
      })
      .catch((error) => {
        setErr("Something went wrong. Please try again later!");
      });
  }, [isPostComment]);

  console.log(isPostComment);
  console.log(err);

  if (isLoading)
    return (
      <>
        <div className="loading">
          <CircularProgress />
          <p>Loading...</p>
        </div>
      </>
    );

  return err ? (
    <ErrorPage error={err} />
  ) : (
    <>
      <SingleArticlePage
        singleArticle={singleArticle}
        setSingleArticle={setSingleArticle}
      />
      <PostComment
        article_id={article_id}
        setIsPostComment={setIsPostComment}
      />
      {isCommentLoading ? (
        <>
          <CircularProgress />
          <p>Loading...</p>
        </>
      ) : isComments ? (
        <Comments
          article_id={article_id}
          comments={comments}
          setComments={setComments}
          setIsPostComment={setIsPostComment}
        />
      ) : null}
    </>
  );
}
