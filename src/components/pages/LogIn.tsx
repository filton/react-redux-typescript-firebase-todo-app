import { FC, useState, FormEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { signin, setError } from '../../store/actions/authActions';
import { RootState } from '../../store/store';

const LogIn: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { error } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    return () => {
      if (error) {
        dispatch(setError(''));
      }
    };
  }, [error, dispatch]);

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    if (error) {
      dispatch(setError(''));
    }
    setLoading(true);
    dispatch(signin({ email, password }, () => setLoading(false)));
  };

  return (
    <div className='login-page'>
      <div className='form'>
        <h2>Log In</h2>
        <form onSubmit={submitHandler}>
          {error && <p className='error-message'>{error}</p>}
          <input
            type='email'
            name='email'
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
            placeholder='Email address'
            required
          />
          <input
            type='password'
            name='password'
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
            placeholder='Password'
            required
          />
          <button>{loading ? 'Loading...' : 'Log In'}</button>
          <p className='register-message'>
            Not registered? <Link to='/register'>Create an account</Link>
          </p>
          <p className='cancel-message'>
            <Link to='/'>Cancel</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LogIn;
