import { Link } from "react-router-dom";
import "../styles/Articles.css";

export default function Articles({ articles }) {
  return (
    <>
      <div className="articles">
        {articles.map((article, index) => (
          <div className="article-container" key={index}>
            <Link to={`/article/${article.article_id}`}>
              <p>{article.title}</p>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
