import { Router } from 'express';
import 'express-async-errors';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../utils/config';

import User from '../models/user';

const usersRouter = Router();

const populateQuery = [
  { path: 'articles', select: 'title' },
];

// Get All Users
usersRouter.get('/', async (req, res) => {
  const users = await User.find({}).populate(populateQuery);
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

// Delete Article
usersRouter.put('/:userId/articles/:articleId', async (req, res) => {
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
usersRouter.put('/:userId/categories/:category', async (req, res) => {
  const { userId, category } = req.params;
  console.log('usersRouter put category:', category);
  const user = await User.findById(userId);

  if (user) {
    const { categories } = user;
    const newCategories = categories.concat(category);

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
usersRouter.put('/:userId/categories/:categoryId', async (req, res) => {
  const { userId, categoryId } = req.params;
  console.log('usersRouter put categoryId:', categoryId);
  const user = await User.findById(userId);

  if (user) {
    const { categories } = user;
    const newCategories = categories.filter(
      (category) => category._id.toString() !== categoryId
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
