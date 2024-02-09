import { useEffect, useState } from "react";
import Articles from "./Articles";
import { getArticlesByQueries } from "../api/api";
import CircularProgress from "@mui/material/CircularProgress";
import SortByDropdown from "./SortByDropdown";
import { useParams, useSearchParams } from "react-router-dom";
import ErrorPage from "./ErrorPage";

export default function ArticlesManager() {
  const { topic } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [err, setErr] = useState(null);
  const [page, setPage] = useState(2); //for pagination

  const sortByQuery = searchParams.get("sort_by");
  const orderByQuery = searchParams.get("order");

  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setErr(null);
    setPage(2);
    getArticlesByQueries(topic, sortByQuery, orderByQuery)
      .then(({ data }) => {
        setArticles(data.articles);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        setErr("Something went wrong. Please check you have the correct URL");
      });
  }, [topic, sortByQuery, orderByQuery]);

  if (err) {
    return <ErrorPage error={err} />;
  }

  if (isLoading) {
    return (
      <>
        <div className="loading">
          <CircularProgress />
          <p>Loading...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <section className="sort-by-articles">
        <SortByDropdown
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        />
        <Articles
          articles={articles}
          setArticles={setArticles}
          topic={topic}
          sortByQuery={sortByQuery}
          orderByQuery={orderByQuery}
          page={page}
          setPage={setPage}
        />
        ;
      </section>
    </>
  );
}
