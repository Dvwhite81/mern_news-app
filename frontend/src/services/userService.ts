import axios from 'axios';
import { ArticleType } from '../utils/types';

const baseUrl = 'http://localhost:7000/api';

const login = async (username: string, password: string) => {
  const user = { username, password };
  console.log('userService login user:', user);
  const response = await axios.post(`${baseUrl}/login`, user);

  console.log('userService login response:', response);
  const { data } = response;
  console.log('userService login data:', data);
  if (data.success) {
    return {
      success: true,
      message: data.message,
      user: data.user,
      token: data.token,
    };
  } else {
    return {
      success: false,
      message: data.message,
    };
  }
};

const register = async (username: string, password: string) => {
  const user = { username, password };

  const { data } = await axios.post(`${baseUrl}/register`, user);
  console.log('userService register data:', data);
  if (data.success) {
    return login(username, password);
  } else {
    return {
      success: false,
      message: data.message,
    };
  }
};

const getArticleById = async (id: string) => {
  const { data } = await axios.get(`${baseUrl}/articles/${id}`);
  console.log('getArticleById data:', data);

  if (data) {
    const { success } = data;
    console.log('getArticleById success:', success);

    if (success) {
      const { article } = data;
      return {
        success: true,
        article: article,
      };
    }
  }
};

const getUserArticles = async (token: string) => {
  const { user } = await getUserByToken(token);

  if (!user) {
    return {
      success: false,
      message: 'No user found',
    };
  }

  const { id } = user;

  const { data } = await axios.get(`${baseUrl}/users/${id}/articles`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log('getUserArticles data:', data);
  if (data.success) {
    const articleIds = data.articles;
    const userArticles = [];

    for (const id of articleIds) {
      const article = getArticleById(id);
      userArticles.push(article);
    }
    return {
      success: true,
      articles: userArticles,
    };
  } else {
    return {
      success: false,
      message: data.message,
    };
  }
};

const getUserCategories = async (token: string) => {
  const { user } = await getUserByToken(token);

  if (!user) {
    return {
      success: false,
      message: 'No user found',
    };
  }

  const { id } = user;
  const { data } = await axios.get(`${baseUrl}/users/${id}/categories`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log('getUserCategories data:', data);
  if (data.success) {
    const categories = data.categories;

    return {
      success: true,
      categories: categories,
    };
  } else {
    return {
      success: false,
      message: data.message,
    };
  }
};

const addUserArticle = async (token: string, newArticle: ArticleType) => {
  const { user } = await getUserByToken(token);

  if (!user) {
    return {
      success: false,
      message: 'No user found',
    };
  }

  const { id } = user;

  const { data } = await axios.post(
    `${baseUrl}/users/${id}/articles`,
    {
      token,
      article: newArticle,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  console.log('addUserArticle data:', data);
  if (data.success) {
    return {
      success: true,
      message: 'Saved article',
      newArticle: newArticle,
      articles: data.articles,
    };
  } else {
    return {
      success: false,
      message: data.message,
    };
  }
};

const addUserCategory = async (token:string, newCategory: string) => {
  const { user } = await getUserByToken(token);

  if (!user) {
    return {
      success: false,
      message: 'No user found',
    };
  }

  const { id } = user;
  const { data } = await axios.post(
    `${baseUrl}/users/${id}/categories`,
    {
      token,
      category: newCategory,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (data.success) {
    return {
      success: true,
      message: 'Saved category',
      newCategory: newCategory,
      categories: data.categories,
    };
  } else {
    return {
      success: false,
      message: data.message,
    };
  }

};

const deleteUserArticle = async (token: string, article: ArticleType) => {
  const { user } = await getUserByToken(token);

  if (!user) {
    return {
      success: false,
      message: 'No user found',
    };
  }

  console.log('deleteUserArticle article:', article);
  const { id } = user;
  const articleId = article.uuid;

  const { data } = await axios.delete(
    `${baseUrl}/users/${id}/articles/${articleId}`
  );
  console.log('deleteUserArticle data:', data);
  if (data.success) {
    return {
      success: true,
      message: 'Removed article',
      articles: data.articles,
    };
  }
};

const deleteUserCategory = async (token: string, category: string) => {
  const { user } = await getUserByToken(token);

  if (!user) {
    return {
      success: false,
      message: 'No user found',
    };
  }
  
  console.log('deleteUserCategory categoryId:', category);
  const { id } = user;

  const { data } = await axios.delete(
    `${baseUrl}/users/${id}/categories/${category}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  console.log('deleteUserCategory data:', data);
  if (data.success) {
    return {
      success: true,
      message: 'Removed category',
      categories: data.categories,
    };
  }
}

const getUserByToken = async (token: string) => {
  const { data } = await axios.get(`${baseUrl}/users/${token}`);

  if (data.success) {
    return {
      success: true,
      user: data.user,
    };
  } else {
    return {
      success: false,
      message: data.message,
    };
  }
};

export default {
  addUserArticle,
  addUserCategory,
  deleteUserArticle,
  deleteUserCategory,
  getUserByToken,
  getUserArticles,
  getUserCategories,
  login,
  register,
};
