import { ArticleType, UserType } from '../../utils/types';
import SaveIcon from './SaveIcon';

interface NewsCardProps {
  article: ArticleType;
  loggedInUser: UserType | null;
  handleSave: (item: ArticleType | string) => void;
  userArticles: ArticleType[];
}

const NewsCard = ({ article, loggedInUser, handleSave, userArticles }: NewsCardProps) => {
  return (
    <a className='card-link' href={article.url} target='_blank'>
      <div className='card'>
        <div className='card-header'>
          <img className='card-image' src={article.image_url} alt='news article image' />
        </div>
        <div className='card-body'>
          {loggedInUser && (
            <SaveIcon item={article} isSaved={userArticles.includes(article)} handleSave={handleSave} />
          )}
          <h4>{article.title}</h4>
          <p>{article.snippet}</p>
        </div>
      </div>
    </a>
  );
};

export default NewsCard;