import { useEffect, useState } from "react";
import Articles from "./Articles";
import { getArticles } from "../api/api";

export default function ArticlesManager() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    getArticles().then(({ data }) => {
      setArticles(data.articles);
    });
  }, []);

  return <Articles articles={articles} />;
}
