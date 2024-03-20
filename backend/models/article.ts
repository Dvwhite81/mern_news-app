import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema({
  uuid: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  snippet: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  image_url: {
    type: Number,
    default: 1,
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
