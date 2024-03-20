import { SyntheticEvent, useState } from 'react';
import { BASE_CATEGORIES, isArticle } from '../utils/helpers';
import { ArticleType, UserType } from '../utils/types';
import { getNewsByCategory, getNewsByQuery } from '../services/newsService';
import NewsCard from '../components/cards/NewsCard';
import SaveIcon from '../components/cards/SaveIcon';

interface HomeProps {
  loggedInUser: UserType | null;
  saveArticle: (article: ArticleType) => void;
  removeArticle: (article: ArticleType) => void;
  saveCategory: (category: string) => void;
  removeCategory: (category: string) => void;
}

const Home = ({ loggedInUser, saveArticle, removeArticle, saveCategory, removeCategory }: HomeProps) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [query, setQuery] = useState<string>('');
  const [newsResults, setNewsResults] = useState<ArticleType[]>([]);

  const handleSearch = async (e: SyntheticEvent) => {
    e.preventDefault();

    const results = await getNewsByQuery(query);
    setNewsResults(results);
    setQuery('');
  };

  const handleCategorySelect = async (category: string) => {
    const results = await getNewsByCategory(category);
    setNewsResults(results);
    setSelectedCategory(category);
  };

  const handleSaveCategory = async (category: string) => {
    console.log('handleSaveCategory category:', category);
    if (loggedInUser) {
      if (loggedInUser.categories.includes(category)) {
        removeCategory(category);
      } else {
        saveCategory(category);
      }
    }
  };

  const handleSaveArticle = async (article: ArticleType) => {
    console.log('handleSaveArticle article:', article);
    if (loggedInUser) {
      if (loggedInUser.articles.includes(article)) {
        removeArticle(article);
      } else {
        saveArticle(article);
      }
    }
  };

  const handleSave = async (item: ArticleType | string) => {
    console.log('handleSave item:', item);
    if (typeof item === 'string') {
      handleSaveCategory(item);
    } else if (isArticle(item)) {
      handleSaveArticle(item);
    }
  };

  return (
    <div className="page home-page">
      <div className="sidebar">
        {BASE_CATEGORIES.map((category, index) => (
          <div
            key={index}
            className="link category-link"
            onClick={() => handleCategorySelect(category)}
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
          {loggedInUser && selectedCategory !== '' && (
            <div className='selected-category-container'>
              <h2 className='selected-category-text'>
                <u>Current Category:</u>{' '}
                {selectedCategory} {' '}
              </h2>
              <SaveIcon
                item={selectedCategory}
                isSaved={(loggedInUser && loggedInUser.categories.includes(selectedCategory)) ? true : false}
                handleSave={handleSave}  
              />
            </div>
          )}
          {newsResults.map((article, index) => (
            <NewsCard
              key={index}
              article={article}
              loggedInUser={loggedInUser}
              handleSave={handleSave}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
