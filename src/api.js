import axios from "axios";
const baseURL = "https://katies-nc-news.herokuapp.com/api";

export const fetchData = async url => {
  const { data } = await axios.get(`${baseURL}/${url}`);
  return data;
};

export const fetchQueries = async (page, sortBy, article_id) => {
  const url = article_id
    ? `${baseURL}/articles/${article_id}/comments?p=${page}&sort_by=${sortBy}`
    : `${baseURL}/articles?p=${page}&sort_by=${sortBy}`;

  const { data } = await axios.get(url);
  return data;
};

export const fetchArticlesByTopic = async (topic, page, sortBy) => {
  const { data } = await axios.get(
    `${baseURL}/topics/${topic}/articles?p=${page}&sort_by=${sortBy}`
  );
  return data.articles;
};

export const fetchUserByUsername = async username => {
  const { data } = await axios.get(`${baseURL}/users/${username}`);
  return data.user;
};

export const fetchArticlesByUsername = async (username, query) => {
  const url = query
    ? `${baseURL}/articles/users/${username}?sort_by=${query}`
    : `${baseURL}/articles/users/${username}`;

  const { data } = await axios.get(url);
  return data.articles;
};

export const fetchArticleById = async id => {
  const { data } = await axios.get(`${baseURL}/articles/${id}`);
  return data.article;
};

export const changeVote = async (article_id, voteChange, comment_id) => {
  const url = comment_id
    ? `${baseURL}/articles/${article_id}/comments/${comment_id}`
    : `${baseURL}/articles/${article_id}`;
  const body = { inc_votes: voteChange };

  return await axios({
    method: "patch",
    url,
    data: body
  });
};

export const deleteItem = async (article_id, comment_id) => {
  const url = comment_id
    ? `${baseURL}/articles/${article_id}/comments/${comment_id}`
    : `${baseURL}/articles/${article_id}`;
  return await axios({
    method: "delete",
    url
  });
};

export const addComment = async (article_id, user, body) => {
  const { username } = user;
  return await axios({
    method: "post",
    url: `${baseURL}/articles/${article_id}/comments`,
    data: {
      created_by: username,
      body
    }
  });
};

export const addTopic = async (slug, description) => {
  return await axios({
    method: "post",
    url: `${baseURL}/topics`,
    data: {
      slug,
      description
    }
  });
};

export const addArticle = async (user, title, topic, body) => {
  return await axios({
    method: "post",
    url: `${baseURL}/topics/${topic}/articles`,
    data: {
      created_by: user.username,
      title,
      topic,
      body
    }
  });
};
