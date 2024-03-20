import { SyntheticEvent, useEffect, useState } from 'react';

import { ArticleType, UserType } from '../utils/types';
import { useNavigate } from 'react-router-dom';

interface ProfileProps {
  loggedInUser: UserType | null;
  userArticles: ArticleType[];
  userCategories: string[];
  removeArticle: (article: ArticleType) => void;
  removeCategory: (category: string) => void;
  handleLogOut: (e: SyntheticEvent) => void;
}

const Profile = ({
  loggedInUser,
  userArticles,
  userCategories,
  removeArticle,
  removeCategory,
  handleLogOut,
}: ProfileProps) => {
  const [showArticles, setShowArticles] = useState(false);
  const [showCategories, setShowCategories] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    console.log('useEffect loggedInUser:', loggedInUser);

    if (!loggedInUser) {
      navigate('/login');
    }
  });

  return (
    <div className="page home-page">
      <h2>Logged In User: {loggedInUser?.username}</h2>
      <button type="button" onClick={handleLogOut}>
        Log Out
      </button>

      {!showArticles && (
        <button type="button" onClick={() => setShowArticles(true)}>
          Show Articles
        </button>
      )}

      {!showCategories && (
        <button type="button" onClick={() => setShowCategories(true)}>
          Show Categories
        </button>
      )}

      {showArticles && (
        <div>
          <button type="button" onClick={() => setShowArticles(false)}>
            Hide Articles
          </button>
          <ul>
            {userArticles.map((article) => (
              <li key={article.title}>
                <p>{article.title}</p>
                <button
                  type="button"
                  onClick={() => removeArticle(article)}
                >
                  x
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {showCategories && (
        <div>
          <button type="button" onClick={() => setShowCategories(false)}>
            Hide Categories
          </button>
          <ul>
            {userCategories.map((category) => (
              <li key={category}>
                <p>{category}</p>
                <button
                  type="button"
                  onClick={() => removeCategory(category)}
                >
                  x
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Profile;
