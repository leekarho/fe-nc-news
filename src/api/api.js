import axios from "axios";

export function getArticles(id) {
  const URL = "https://nc-news-u31g.onrender.com/api/articles";
  if (id) {
    return axios.get(`${URL}/${id}`);
  } else {
    return axios.get(URL);
  }
}

export function getComments(article_id) {
  return axios.get(
    `https://nc-news-u31g.onrender.com/api/articles/${article_id}/comments`
  );
}

export function getCommentsByPage(article_id, page) {
  return axios.get(
    `https://nc-news-u31g.onrender.com/api/articles/${article_id}/comments`,
    {
      params: {
        p: page,
      },
    }
  );
}

export function updateVoteOnArticle(article_id, vote) {
  return axios.patch(
    `https://nc-news-u31g.onrender.com/api/articles/${article_id}`,
    {
      inc_votes: vote,
    }
  );
}

export function postComment(article_id, username, body) {
  return axios.post(
    `https://nc-news-u31g.onrender.com/api/articles/${article_id}/comments`,
    { username, body }
  );
}
