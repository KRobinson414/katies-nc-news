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
