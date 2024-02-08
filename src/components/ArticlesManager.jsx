import { useEffect, useState } from "react";
import Articles from "./Articles";
import { getArticles } from "../api/api";
import CircularProgress from "@mui/material/CircularProgress";

export default function ArticlesManager() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getArticles().then(({ data }) => {
      setArticles(data.articles);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return (
      <div>
        <p>Loading</p>
        <p>
          <CircularProgress />
        </p>
      </div>
    );
  }

  return <Articles articles={articles} setArticles={setArticles} />;
}
