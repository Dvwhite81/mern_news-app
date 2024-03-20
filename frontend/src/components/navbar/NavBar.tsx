import { Link, useNavigate } from 'react-router-dom';
import { UserType } from '../../utils/types';
import NewsLogo from '../../assets/news-logo.png';

interface NavBarProps {
  loggedInUser: UserType | null;
  handleLogOut: () => void;
}

const NavBar = ({ loggedInUser, handleLogOut }: NavBarProps) => {
  const navigate = useNavigate();

  const handleLogOutClick = () => {
    handleLogOut();
    navigate('/');
  }

  return (
    <nav id="navbar">
      {loggedInUser ? (
        <Link className='link nav-link' to='/profile'>Profile</Link>
      ) : (
        <Link className='link nav-link' to='/register'>Sign Up</Link>
      )}

      <div className='link main-logo-container'>
        <Link to='/'>
          <img id='main-logo' src={NewsLogo} alt='main logo' />
        </Link>
      </div>

      {loggedInUser ? (
        <p className='link nav-link' onClick={handleLogOutClick}>Log Out</p>
      ) : (
        <Link className='link nav-link' to='/login'>Log In</Link>
      )}
    </nav>
  )
}

export default NavBar;