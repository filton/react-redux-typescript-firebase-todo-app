import { FC } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { Link } from 'react-router-dom';

const Homepage: FC = () => {
  const { authenticated } = useSelector((state: RootState) => state.auth);

  return (
    <div className='homepage'>
      {!authenticated && (
        <div>
          <h1>Welcome to Todo App</h1>
          <h2>You need to be logged to continue...</h2>
          <p className='login-message'>
            Already registered? <Link to='/login'>Log In</Link>
          </p>
          <p className='register-message'>
            Not registered? <Link to='/register'>Create an account</Link>
          </p>
        </div>
      )}
    </div>
  );
};

export default Homepage;
