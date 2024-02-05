import axios from "axios";

export default function getArticles(id) {
  const URL = "https://nc-news-u31g.onrender.com/api/articles";
  if (id) {
    return axios.get(`${URL}/${id}`);
  } else {
    return axios.get(URL);
  }
}
