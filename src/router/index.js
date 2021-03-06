import React, { Component } from 'react';
import { Router, Route, IndexRoute, browserHistory, hashHistory } from 'react-router';
import Home from 'src/container/home';
import Index from 'src/container/';
import checkStatus from './checkStatus';

const writer = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../container/writer').default);
    }, 'writer');
};

const login = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../container/login').default);
    }, 'login');
};

const register = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../container/register').default);
    }, 'register');
};

const article = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../container/article').default);
    }, 'article');
};

const history = process.env.NODE_ENV !== 'production' ? hashHistory : hashHistory;
/* const search = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../Component/search').default)
    },'search')
}*/

const RouteConfig = (
    <Router history={history}>
        <Route path="/" component={Index}>
            <IndexRoute component={Home} />
            <Route path="writer" onEnter={checkStatus} getComponent={writer} />
            <Route path="login" getComponent={login} />
            <Route path="register" getComponent={register} />
            <Route path="article/:id" getComponent={article} />
        </Route>
    </Router>
);

export default RouteConfig;
