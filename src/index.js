import React from 'react';
import ReactDOM from 'react-dom';
import { AnimatedSwitch } from 'react-router-transition';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import { Home, Login, Default, Dashboard } from './pages';
import * as serviceWorker from './serviceWorker';
import './index.scss';

const cacheUser = () => {
    const user = localStorage.getItem('user') && JSON.parse(localStorage.getItem('user'));
    return user && (user.timestamp + 3600000) >= new Date().getTime() ? user : false;
}

let userValidate = cacheUser() || {};

const loggedIn = () => {
    return userValidate && ( userValidate.level === 'admin' || userValidate.level === 'user')
}

const renderMergedProps = (component, ...rest) => {
    const finalProps = Object.assign({}, ...rest);
    return (
        React.createElement(component, finalProps)
    );
}
  
const PropsRoute = ({ component, ...rest }) => {
    return (
        <Route {...rest} render={routeProps => {
            return !loggedIn() ? (
                renderMergedProps(component, routeProps, rest)
            ) : (
                <Redirect to={{
                    pathname: 'dashboard',
                    state: { from: routeProps.location }
                }}/>
            );
        }}/>
    );
}

const PrivateRoute = ({ component, redirectTo, ...rest }) => {
    return (
        <Route {...rest} render={routeProps => {
            return loggedIn() ? (
                renderMergedProps(component, routeProps, rest)
            ) : (
                <Redirect to={{
                    pathname: redirectTo,
                    state: { from: routeProps.location }
                }}/>
            );
        }}/>
    );
};

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            user: userValidate,
            updateUser: user => {
                if (user) {
                    user.timestamp = new Date().getTime();
                    localStorage.setItem('user', JSON.stringify(user));
                    userValidate = user;
                    this.setState({user});
                }
            }
        };
    }

    render() {
        return (
            <BrowserRouter>
                <AnimatedSwitch
                    atEnter={{ opacity: 0 }}
                    atLeave={{ opacity: 0 }}
                    atActive={{ opacity: 1 }}
                    className="switch-wrapper"
                >
                    <PropsRoute path="/" exact={true} component={Login}  {...this.state} />
                    <PrivateRoute path="/users" exact={true} component={Default} {...this.state} />
                    <PrivateRoute path="/dashboard" exact={true} component={Dashboard} {...this.state} />
                    <PrivateRoute path="/exam/create" exact={true} component={Default} {...this.state} />
                    <PrivateRoute path="/exam/view/:id" exact={true} component={Home} {...this.state} />
                    <PrivateRoute path="/exam/edit/:id" exact={true} component={Home} {...this.state} />
                </AnimatedSwitch>
            </ BrowserRouter>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
