import { useEffect, useState } from "react";
import Articles from "./Articles";
import { getArticles, getArticlesByQueries } from "../api/api";
import CircularProgress from "@mui/material/CircularProgress";
import SortByDropdown from "./SortByDropdown";
import { useParams, useSearchParams } from "react-router-dom";

export default function ArticlesManager() {
  const { topic } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const sortByQuery = searchParams.get("sort_by");
  console.log(sortByQuery);
  const orderByQuery = searchParams.get("order");

  console.log(topic);
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getArticlesByQueries(topic, sortByQuery, orderByQuery).then(({ data }) => {
      setArticles(data.articles);
      setIsLoading(false);
    });
  }, [topic, sortByQuery, orderByQuery]);

  console.log(articles);

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

  return (
    <>
      <SortByDropdown
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />
      <Articles articles={articles} setArticles={setArticles} />;
    </>
  );
}
