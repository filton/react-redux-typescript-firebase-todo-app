import React, { FC } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { signout } from '../../store/actions/authActions';

const NavBar: FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { authenticated } = useSelector((state: RootState) => state.auth);
  const location = useLocation();

  const logoutClickHandler = () => {
    dispatch(signout());
  }

  return(
    <nav className="navbar">
      <div className="navbar-list">
        {location.pathname !== '/' && !authenticated &&
          <li className="navbar-item" onClick={() => history.push('/')}>Home</li>
        }
      </div>

      {!authenticated ? 
        <div className="navbar-list">
          <li className="navbar-item" onClick={() => history.push('/register')}>Register</li>
          <li className="navbar-item" onClick={() => history.push('/login')}>Log In</li>
        </div>
      :
        <div className="navbar-list">
          <li className="navbar-item" onClick={logoutClickHandler}>Log Out</li>
        </div>
      }
    </nav>
  );
}

export default NavBar;