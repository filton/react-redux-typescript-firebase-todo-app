import { FC } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { Route, Redirect, RouteProps } from 'react-router-dom';

interface Props extends RouteProps {
  component: any;
}

const PrivateRoute: FC<Props> = ({ component: Component, ...rest }) => {
  const { authenticated } = useSelector((state: RootState) => state.auth);

  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated ? <Component {...props} /> : <Redirect to='/' />
      }
    />
  );
};

export default PrivateRoute;
