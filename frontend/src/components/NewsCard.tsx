import { ArticleType } from '../utils/types';

interface NewsCardProps {
  article: ArticleType;
}

const NewsCard = ({ article }: NewsCardProps) => {
  return (
    <a className='card-link' href={article.url} target='_blank'>
      <div className='card'>
        <div className='card-header'>
          <img className='card-image' src={article.image_url} alt='news article image' />
        </div>
        <div className='card-body'>
          <h4>{article.title}</h4>
          <p>{article.snippet}</p>
        </div>
      </div>
    </a>
  );
};

export default NewsCard;