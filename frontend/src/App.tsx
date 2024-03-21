import { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import { ArticleType, AuthResult, UserType } from './utils/types';
import userService from './services/userService';

import Home from './pages/Home';
import Login from './pages/Login';
import NavBar from './components/navbar/NavBar';
import Profile from './pages/Profile';
import Register from './pages/Register';
import './App.css';

function App() {
  const [loggedInUser, setLoggedInUser] = useState<UserType | null>(null);
  const [userArticles, setUserArticles] = useState<ArticleType[]>([]);
  const [userCategories, setUserCategories] = useState<string[]>([]);
  
  const navigate = useNavigate();

  useEffect(() => {
    const checkedLoggedIn = async () => {
      const token = localStorage.getItem('token');

      if (token) {
        const result = await userService.getUserByToken(token);
        if (result) {
          const { success, user } = result;

          if (success && user) {
            const { user } = result;

            setLoggedInUser(user);
            setUserArticles(user.articles);
            setUserCategories(user.categories);
            navigate('/');
          } else {
            localStorage.removeItem('token');
          }
        }
      }
    };

    checkedLoggedIn();
  }, [navigate]);

  const handleRegister = async (
    username: string,
    password: string,
    confirmation: string
  ) => {
    if (username === '' || password === '' || confirmation === '') {
      toast.error('All fields are required');
      return;
    }

    if (password !== confirmation) {
      toast.error('Passwords must match');
      return;
    }

    const result: AuthResult | undefined = await userService.register(
      username,
      password
    );

    if (result) {
      const { success, message } = result;
      if (success) {
        handleLogin(username, password);
      } else {
        toast.error(message);
      }
    }
  };

  const handleLogin = async (username: string, password: string) => {
    if (username === '' || password === '') {
      toast.error('All fields are required');
      return;
    }

    const result: AuthResult | undefined = await userService.login(
      username,
      password
    );

    console.log('handleLogin result:', result);

    if (result) {
      const { success, message } = result;
      if (success) {
        const { user, token } = result;
        console.log('login USER:', user);
        if (user && token) {
          setLoggedInUser(user);
          localStorage.setItem('token', token);
          setUserArticles(user.articles);
          setUserCategories(user.categories);
          navigate('/');
        }

        toast.success(message);
      } else {
        toast.error(message);
      }
    }
  };

  const saveArticle = async (article: ArticleType) => {
    const token = localStorage.getItem('token');

    if (!loggedInUser || !token) return;

    const result = await userService.addUserArticle(token, article);

    if (result) {
      const { success, message } = result;

      if (success) {
        toast.success(message);
        setUserArticles(result.articles);
      } else {
        toast.error(message);
      }
    }
  };

  const saveCategory = async (category: string) => {
    const token = localStorage.getItem('token');

    if (!loggedInUser || !token) return;

    const result = await userService.addUserCategory(token, category);

    if (result) {
      const { success, message } = result;

      if (success) {
        toast.success(message);
        setUserCategories(result.categories);
      } else {
        toast.error(message);
      }
    }
  };

  const removeArticle = async (article: ArticleType) => {
    console.log('handleDeleteArticle articleId:', article);
    if (!loggedInUser) return;

    const token = localStorage.getItem('token');
    if (!token) return;

    const result = await userService.deleteUserArticle(token, article);
    console.log('handleDelete result:', result);
    if (result) {
      const { success, articles, message } = result;

      if (success) {
        setUserArticles(articles);
        toast.success(message);
      } else {
        toast.error(message);
      }
    }
  };

  const removeCategory = async (category: string) => {
    console.log('handleDeleteArticle category:', category);
    if (!loggedInUser) return;

    const token = localStorage.getItem('token');
    if (!token) return;

    const result = await userService.deleteUserCategory(token, category);
    console.log('handleDelete result:', result);
    if (result) {
      const { success, categories, message } = result;

      if (success) {
        setUserCategories(categories);
        toast.success(message);
      } else {
        toast.error(message);
      }
    }
  };

  const handleLogOut = () => {
    localStorage.removeItem('token');
    setLoggedInUser(null);
    navigate('/login');
    toast.success('Logged out');
  };

  return (
    <div id="main-container">
      <NavBar loggedInUser={loggedInUser} handleLogOut={handleLogOut} />
      <Routes>
        <Route
          path="/profile"
          element={
            <Profile
              loggedInUser={loggedInUser}
              userArticles={userArticles}
              userCategories={userCategories}
              removeArticle={removeArticle}
              removeCategory={removeCategory}
              handleLogOut={handleLogOut}
            />
          }
        />
        <Route
          path="/"
          element={
            <Home
              loggedInUser={loggedInUser}
              saveArticle={saveArticle}
              removeArticle={removeArticle}
              saveCategory={saveCategory}
              removeCategory={removeCategory}
            />
          }
        />
        <Route
          path="/register"
          element={<Register handleRegister={handleRegister} />}
        />
        <Route path="/login" element={<Login handleLogin={handleLogin} />} />
      </Routes>
      <ToastContainer theme="colored" newestOnTop />
    </div>
  );
}

export default App;
