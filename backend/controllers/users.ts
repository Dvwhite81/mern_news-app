import { Router } from 'express';
import 'express-async-errors';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../utils/config';

import User from '../models/user';

const usersRouter = Router();

// Get All Users
usersRouter.get('/', async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

// Get User by Token
usersRouter.get('/:token', async (req, res) => {
  console.log('usersRouter get params:', req.params);
  const { token } = req.params;
  console.log('token:', token);
  const decoded = jwt.verify(token, config.SECRET as string) as JwtPayload;
  console.log('getByToken decoded:', decoded);

  const user = decoded;
  const { id } = user;

  const dbUser = await User.findById(id);

  res.json({
    success: true,
    user: dbUser,
  });
});

// Get User Articles by userId
usersRouter.get('/:userId/articles', async (req, res) => {
  const { userId } = req.params;
  const user = await User.findById(userId);
  console.log('backend get user articles user:', user);
  if (user) {
    res.json({
      success: true,
      articles: user.articles,
    });
  } else {
    res.status(404).end();
  }
});

// Get User Categories by userId
usersRouter.get('/:userId/categories', async (req, res) => {
  const { userId } = req.params;
  const user = await User.findById(userId);
  console.log('backend get user categories user:', user);
  if (user) {
    res.json({
      success: true,
      categories: user.categories,
    });
  } else {
    res.status(404).end();
  }
});

// Add Article
usersRouter.post('/:userId/articles', async (req, res) => {
  console.log('save')
  const { userId } = req.params;
  const { article } = req.body;

  const user = await User.findById(userId);
  console.log('user:', user);

  if (user) {
    const { articles } = user;
    console.log('articles:', articles);

    if (articles.includes(article)) {
      return res.json({
        success: false,
        message: 'Article already saved',
      });
    }
    const newArticles = articles.concat(article);
    console.log('newArticles:', newArticles);
    user.articles = newArticles;
    await user.save();

    res.json({
      success: true,
      articles: newArticles,
    });
  } else {
    res.status(404).end();
  }
});

// Delete Article
usersRouter.delete('/:userId/articles/:articleId', async (req, res) => {
  const { userId, articleId } = req.params;
  console.log('usersRouter put articleId:', articleId);
  const user = await User.findById(userId);

  if (user) {
    const { articles } = user;
    const newArticles = articles.filter(
      (article) => article._id.toString() !== articleId
    );

    user.articles = newArticles;
    await user.save();

    res.json({
      success: true,
      articles: newArticles,
    });
  } else {
    res.status(404).end();
  }
});

// Add Category
usersRouter.post('/:userId/categories', async (req, res) => {
  console.log('save')
  const { userId } = req.params;
  const { category } = req.body;
  console.log('usersRouter put category:', category);
  const user = await User.findById(userId);
  console.log('user:', user);

  if (user) {
    const { categories } = user;
    console.log('categories:', categories);

    if (categories.includes(category)) {
      return res.json({
        success: false,
        message: 'Category already saved',
      });
    }
    const newCategories = categories.concat(category);
    console.log('newCategories:', newCategories);
    user.categories = newCategories;
    await user.save();

    res.json({
      success: true,
      categories: newCategories,
    });
  } else {
    res.status(404).end();
  }
});

// Delete Category
usersRouter.delete('/:userId/categories/:category', async (req, res) => {
  console.log('delete');
  const { userId, category } = req.params;
  console.log('usersRouter put category:', category);
  const user = await User.findById(userId);

  if (user) {
    const { categories } = user;
    const newCategories = categories.filter(
      (c) => c !== category
    );

    user.categories = newCategories;
    await user.save();

    res.json({
      success: true,
      categories: newCategories,
    });
  } else {
    res.status(404).end();
  }
});

// Delete User
usersRouter.delete('/:id', async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

export default usersRouter;
