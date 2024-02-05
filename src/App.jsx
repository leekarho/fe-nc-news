import "./App.css";
import ArticlesManager from "./components/ArticlesManager";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <ArticlesManager />
    </>
  );
}

export default App;
