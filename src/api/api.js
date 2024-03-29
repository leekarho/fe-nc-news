import axios from "axios";

export function getArticlesById(article_id) {
  return axios.get(
    `https://nc-news-u31g.onrender.com/api/articles/${article_id}`
  );
}

export function getArticlesByQueries(topic, sort, order, page = 1) {
  return axios.get(`https://nc-news-u31g.onrender.com/api/articles`, {
    params: {
      topic: topic,
      sort_by: sort,
      order: order,
      p: page,
    },
  });
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

export function removeComment(comment_id) {
  return axios.delete(
    `https://nc-news-u31g.onrender.com/api/comments/${comment_id}`
  );
}

export function getTopics() {
  return axios.get(`https://nc-news-u31g.onrender.com/api/topics`);
}

export function getUsers() {
  return axios.get(`https://nc-news-u31g.onrender.com/api/users`);
}
