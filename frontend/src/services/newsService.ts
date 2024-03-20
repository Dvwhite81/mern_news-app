import axios from 'axios';

const apiKey = import.meta.env.VITE_API_KEY;
const baseUrl = `https://api.thenewsapi.com/v1/news/all?api_token=${apiKey}&language=en`;

export const getNewsByQuery = async (query: string) => {
  console.log('apiKey:', apiKey);

  const URL = `${baseUrl}&search=${query}`;
  return getNews(URL);
};

export const getNewsByCategory = async (category: string) => {
  const URL = `${baseUrl}&category=${category}`;
  return getNews(URL);
};

export const getNews = async (url: string) => {
  const response = await axios.get(url);
  console.log('response:', response);
  const { data } = response.data;
  console.log('data:', data);
  return data;
}
