import React, { FC } from 'react';
import { Link } from 'react-router-dom';

const PageNotFound: FC = () => {
  return (
    <div className='not-found-page'>
      <h1>404 - PAGE NOT FOUND</h1>
      <p>The page you are looking for, might have been removed, had its name changed or is temporarily unavailable</p>
      <Link className='not-found-button' to='/'>Go to Homepage</Link>
    </div>
  );
};

export default PageNotFound;
