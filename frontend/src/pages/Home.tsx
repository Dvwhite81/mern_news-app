import { SyntheticEvent, useState } from 'react';
import { BASE_CATEGORIES } from '../utils/helpers';
import { ArticleType } from '../utils/types';
import { getNewsByCategory, getNewsByQuery } from '../services/newsService';
import NewsCard from '../components/NewsCard';

const Home = () => {
  const [query, setQuery] = useState<string>('');
  const [newsResults, setNewsResults] = useState<ArticleType[]>([]);

  const handleSearch = async (e: SyntheticEvent) => {
    e.preventDefault();

    const results = await getNewsByQuery(query);
    setNewsResults(results);
    setQuery('');
  };

  const handleCategoryClick = async (category: string) => {
    const results = await getNewsByCategory(category);
    setNewsResults(results);
  };

  return (
    <div className="page home-page">
      <div className="home-categories">
        {BASE_CATEGORIES.map((category, index) => (
          <div
            key={index}
            className="link category-link"
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </div>
        ))}
      </div>
      <div className='home-main'>
        <form onSubmit={handleSearch} className="form news-form">
          <input
            type="text"
            value={query}
            onChange={({ target }) => setQuery(target.value)}
          />
          <button type="submit" className="btn submit-btn">
            Search
          </button>
        </form>
        <div className="card-display">
          {newsResults.map((article, index) => (
            <NewsCard key={index} article={article} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
