import { useParams } from "react-router-dom";
import getArticles from "../api/api";
import { useEffect, useState } from "react";
import "../styles/SingleArticle.css";

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
      <div className="single-article">
        <div className="topic-author">
          <p className="topic">{singleArticle.topic}</p>
          <p className="author">Posted by {singleArticle.author}</p>
        </div>
        <p className="title">{singleArticle.title}</p>
        <p className="body">{singleArticle.body}</p>
        <button className="votes">{singleArticle.votes}</button>
      </div>
    </>
  );
}
