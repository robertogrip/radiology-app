import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import {
  ExamList,
  Login,
  Users,
  NotFound,
  Default,
  Dashboard,
  CreateExam,
  CreateUser,
  EditExam,
  EditUser
} from './pages';
import * as serviceWorker from './serviceWorker';
import './index.scss';

//import Api
import { Api } from './utils';

const cacheUser = () => {
  const user = localStorage.getItem('user') && JSON.parse(localStorage.getItem('user'));
  return user && user.timestamp + 3600000 >= new Date().getTime() ? user : false;
};

let userValidate = cacheUser() || {};

const loggedIn = () => {
  return userValidate && (userValidate.level === '2' || userValidate.level === '1');
};

const adminLoggedIn = () => {
  return userValidate && userValidate.level === '2';
};

const renderMergedProps = (component, ...rest) => {
  const finalProps = Object.assign({}, ...rest);
  return React.createElement(component, finalProps);
};

const PropsRoute = ({ component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={routeProps => {
        return !loggedIn() ? (
          renderMergedProps(component, routeProps, rest)
        ) : (
          <Redirect
            to={{
              pathname: adminLoggedIn() ? 'dashboard' : 'exam/list',
              state: { from: routeProps.location }
            }}
          />
        );
      }}
    />
  );
};

const PrivateRoute = ({ component, redirectTo, ...rest }) => {
  return (
    <Route
      {...rest}
      render={routeProps => {
        return loggedIn() ? (
          renderMergedProps(component, routeProps, rest)
        ) : (
          <Redirect
            to={{
              pathname: redirectTo,
              state: { from: routeProps.location }
            }}
          />
        );
      }}
    />
  );
};

const AdminPrivateRoute = ({ component, redirectTo, ...rest }) => {
  return (
    <Route
      {...rest}
      render={routeProps => {
        return adminLoggedIn() ? (
          renderMergedProps(component, routeProps, rest)
        ) : (
          <Redirect
            to={{
              pathname: redirectTo,
              state: { from: routeProps.location }
            }}
          />
        );
      }}
    />
  );
};

class App extends React.Component {
  constructor() {
    super();
    const user = userValidate;
    this.state = {
      user,
      updateUser: user => {
        if (user) {
          user.timestamp = new Date().getTime();
          localStorage.setItem('user', JSON.stringify(user));
          userValidate = user;
          this.setState({ user });
        }
      },
      updateState: state => {
        if (state) {
          this.setState({
            ...this.state,
            ...state
          });
        }
      }
    };

    if (user) {
      Api.exams.getAll({ user: user.id, level: user.level })
        .then(result => {
          const resultExams = (result && result.success && result.data) || null;
          this.setState({
            exams: resultExams
          });
        });

      Api.users.getAll({ user: user.id, level: user.level })
        .then(result => {
          this.setState({
            users: (result && result.success && result.data) || null
          });
        });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.user && nextState.user.id) {
      if (!nextState.exams)
        Api.exams.getAll({ user: nextState.user.id, level: nextState.user.level })
          .then(result => {
            const resultExams = (result && result.success && result.data) || null;
            this.setState({
              exams: resultExams
            });
          });

      if (!nextState.users)
        Api.users.getAll({ user: nextState.user.id, level: nextState.user.level })
          .then(result => {
            this.setState({
              users: (result && result.success && result.data) || null
            });
          });
    }

    return JSON.stringify(this.props) !== JSON.stringify(nextProps) || JSON.stringify(this.state) !== JSON.stringify(nextState);
  }

  render() {
    if (!this.state || (this.state.user.id && (!this.state.users || !this.state.exams))) return null;
    return (
      <BrowserRouter>
        <Switch>
          <PropsRoute path="/" exact={true} component={Login} {...this.state} />
          <PrivateRoute path="/exam/list" exact={true} component={ExamList} {...this.state} />
          <PrivateRoute path="/exam/view/:id" exact={true} component={Default} {...this.state} />
          <AdminPrivateRoute path="/dashboard" exact={true} component={Dashboard} {...this.state} />
          <AdminPrivateRoute
            path="/exam/create"
            exact={true}
            component={CreateExam}
            {...this.state}
          />
          <AdminPrivateRoute
            path="/exam/edit/:id"
            exact={true}
            component={EditExam}
            {...this.state}
          />
          <AdminPrivateRoute path="/users" exact={true} component={Users} {...this.state} />
          <AdminPrivateRoute
            path="/user/create"
            exact={true}
            component={CreateUser}
            {...this.state}
          />
          <AdminPrivateRoute
            path="/user/edit/:id"
            exact={true}
            component={EditUser}
            {...this.state}
          />
          <PropsRoute path="/" component={NotFound} {...this.state} />
        </Switch>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
