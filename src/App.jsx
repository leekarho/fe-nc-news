import "./App.css";
import ArticlesManager from "./components/ArticlesManager";
import Header from "./components/Header";
import Topic from "./components/Topic";
import { Routes, Route } from "react-router-dom";
import SingleArticleManager from "./components/SingleArticleManager";
import UserContext from "./context/UserContext";
import { useState } from "react";

function App() {
  const [loggedInUser, setLoggedInUser] = useState({
    username: "tickle122",
    name: "Tom Tickle",
    avatar_url:
      "https://vignette.wikia.nocookie.net/mrmen/images/d/d6/Mr-Tickle-9a.png/revision/latest?cb=20180127221953",
  });

  return (
    <>
      <UserContext.Provider value={{ loggedInUser, setLoggedInUser }}>
        <Header />
        <Routes>
          <Route path="/" element={<ArticlesManager />} />
          <Route
            path="/article/:article_id"
            element={<SingleArticleManager />}
          />
          <Route path="/topic/:topic" element={<Topic />} />
        </Routes>
      </UserContext.Provider>
    </>
  );
}

export default App;
