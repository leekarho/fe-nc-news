import "./App.css";
import ArticlesManager from "./components/ArticlesManager";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import SingleArticle from "./components/SingleArticle";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<ArticlesManager />} />
        <Route path="/article/:article_id" element={<SingleArticle />} />
      </Routes>
    </>
  );
}

export default App;
