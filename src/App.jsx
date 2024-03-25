import "./App.css";
import ArticlesManager from "./components/ArticlesManager";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import SingleArticleManager from "./components/SingleArticleManager";
import UserContext from "./context/UserContext";
import { useState } from "react";
import NavBar from "./components/NavBar";
import Login from "./components/Login";
import ScrollToTopButton from "./components/ScrollToTopButton";

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});

  return (
    <>
      <UserContext.Provider value={{ loggedInUser, setLoggedInUser }}>
        <div className="nav">
          <Header />
          <NavBar />
        </div>
          <ScrollToTopButton />
        <Routes>
          <Route path="/" element={<ArticlesManager />} />
          <Route path="/:topic" element={<ArticlesManager />} />
          <Route
            path="/article/:article_id"
            element={<SingleArticleManager />}
          />
          <Route path="/login" element={<Login />} />
        </Routes>
      </UserContext.Provider>
    </>
  );
}

export default App;
