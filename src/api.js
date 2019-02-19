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

export const deleteItem = async (article_id, comment_id) => {
  const url = comment_id
    ? `${baseURL}/articles/${article_id}/comments/${comment_id}`
    : `${baseURL}/articles/${article_id}`;
  return axios({
    method: "delete",
    url
  });
};
