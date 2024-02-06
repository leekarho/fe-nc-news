import "./App.css";
import ArticlesManager from "./components/ArticlesManager";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import SingleArticleManager from "./components/SingleArticleManager";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<ArticlesManager />} />
        <Route path="/article/:article_id" element={<SingleArticleManager />} />
      </Routes>
    </>
  );
}

export default App;
