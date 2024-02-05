import "../styles/Articles.css";

export default function Articles({ articles }) {
  return (
    <>
      <div className="Articles">
        {articles.map((article, index) => (
          <div className="article-container" key={index}>
            <p>{article.title}</p>
          </div>
        ))}
      </div>
    </>
  );
}
