import { Link, useNavigate } from 'react-router-dom';
import { UserType } from '../../utils/types';

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

      {loggedInUser ? (
        <p className='link nav-link' onClick={handleLogOutClick}>Log Out</p>
      ) : (
        <Link className='link nav-link' to='/login'>Log In</Link>
      )}
    </nav>
  )
}

export default NavBar;