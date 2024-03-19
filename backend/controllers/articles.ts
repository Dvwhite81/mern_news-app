import { Response, Router } from 'express';
import ArticleModel from '../models/article';

const articlesRouter = Router();

articlesRouter.get('/', async (req, res: Response) => {
  console.log('GET');
  const articles = await ArticleModel.find({}).populate('user', { username: 1 });
  console.log('articles:', articles);
  res.json(articles);
});

articlesRouter.get('/:id', async (req, res: Response) => {
  const article = await ArticleModel.findById(req.params.id);
  if (article) res.json(article);
  else res.status(404).end();
});

articlesRouter.post('/', async (req, res: Response) => {
  console.log('POST');
  const { body, user } = req;

  if (!user) {
    return res.status(401).json({ error: 'missing or invalid token' });
  }

  const { article } = body;
  const { title, teaser, articleBody, articleStatus, created } = article;

  const newArticleModel = new ArticleModel({
    title,
    teaser,
    articleBody,
    articleStatus,
    created,
    user: user.id,
  });

  const savedArticleModel = await newArticleModel.save();
  user.articles = user.articles.concat(savedArticleModel._id);
  await user.save();
  res.status(201).json(savedArticleModel);
});

articlesRouter.delete('/:id', async (req, res: Response) => {
  const { id } = req.params;
  const { user } = req;

  if (!user) {
    return res.status(401).json({
      error: 'missing or invalid token',
    });
  }

  const articleToDelete = await ArticleModel.findById(id);

  if (articleToDelete?.user?.toString() !== user.id.toString()) {
    res.status(401).end();
  } else {
    await ArticleModel.findByIdAndDelete(id);
    res.status(204).end();
  }
});

articlesRouter.put('/:id', async (req, res: Response) => {
  const { id } = req.params;
  const { title, teaser, articleBody, articleStatus, created } = req.body;

  const article = {
    title,
    teaser,
    articleBody,
    articleStatus,
    created,
  };

  const updatedArticleModel = await ArticleModel.findByIdAndUpdate(id, article, {
    new: true,
  });
  res.json(updatedArticleModel);
});

export default articlesRouter;
