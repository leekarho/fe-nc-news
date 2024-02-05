import { Link } from "react-router-dom";
import "../styles/Articles.css";

export default function Articles({ articles }) {
  return (
    <>
      <div className="articles">
        {articles.map((article, index) => (
          <div className="articles-container" key={index}>
            <div className="topic-author">
              <p className="topic">{article.topic} </p>
              <p className="author">{article.author}</p>
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
