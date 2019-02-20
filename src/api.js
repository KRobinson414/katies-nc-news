import axios from "axios";
const baseURL = "https://katies-nc-news.herokuapp.com/api";

export const fetchData = async url => {
  const { data } = await axios.get(`${baseURL}/${url}`);
  return data;
};

export const fetchUserByUsername = async username => {
  const { data } = await axios.get(`${baseURL}/users/${username}`);
  return data;
};

export const fetchArticleById = async id => {
  const { data } = await axios.get(`${baseURL}/articles/${id}`);
  return data;
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
