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

// Get User Articles by Username
usersRouter.get('/:username/articles', async (req, res) => {
  const { username } = req.params;
  const user = await User.findOne({ username: username });
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

// Delete Article
usersRouter.put('/:username/articles/:articleId', async (req, res) => {
  const { username, articleId } = req.params;
  console.log('usersRouter put articleId:', articleId);
  const user = await User.findOne({ username: username });

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

// Delete User
usersRouter.delete('/:id', async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

export default usersRouter;
