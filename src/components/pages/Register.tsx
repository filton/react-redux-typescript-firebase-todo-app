import React, { FC, useState, FormEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { signup, setError } from '../../store/actions/authActions';
import { RootState } from '../../store/store';

const Register: FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { error } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    return () => {
      if(error) {
        dispatch(setError(''));
      }
    }
  }, [error, dispatch]);

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    if(error) {
      dispatch(setError(''));
    }
    setLoading(true);
    dispatch(signup({ firstName, lastName, email, password }, () => setLoading(false)));
  }

  return(
    <div className="register-page">
      <div className="form">
        <h2>Register</h2>
        <form onSubmit={submitHandler}>
          {error &&  <p className="error-message">{error}</p>}

          <input 
            type="text"
            name="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.currentTarget.value)}
            placeholder="First name"
            required
          />

          <input 
            type="text"
            name="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.currentTarget.value)}
            placeholder="Last name"
            required
          />

          <input 
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
            placeholder="Email address"
            required
          />

          <input 
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
            placeholder="Password"
            required
          />

          <button>{loading ? "Loading..." : "Register Now"}</button>

          <p className="login-message">Already registered? <Link to="/login">Log In</Link></p>
          <p className="cancel-message"><Link to="/">Cancel</Link></p>
        </form>
      </div>
    </div>
  );
}

export default Register;