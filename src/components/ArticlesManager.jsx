import { useEffect, useState } from "react";
import Articles from "./Articles";
import axios from "axios";

export default function ArticlesManager() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    axios
      .get("https://nc-news-u31g.onrender.com/api/articles")
      .then(({ data }) => {
        setArticles(data.articles);
      });
  }, []);

  return <Articles articles={articles} />;
}
