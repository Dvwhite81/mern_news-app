import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  teaser: {
    type: String,
    required: true,
  },
  articleBody: {
    type: String,
    required: true,
  },
  articleStatus: {
    type: Number,
    default: 1,
  },
  created: {
    type: Date,
    required: true,
    default: new Date(),
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

articleSchema.set('toJSON', {
  transform: (document, returnedArticle) => {
    returnedArticle.id = returnedArticle._id.toString();
    delete returnedArticle._id;
    delete returnedArticle.__v;
  },
});

const ArticleModel = mongoose.model('Article', articleSchema);
export default ArticleModel;
