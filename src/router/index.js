import React, { Component } from 'react';
import { Router, Route, IndexRoute, browserHistory, hashHistory } from 'react-router';
import Home from 'src/container/home';
import Index from 'src/container/';

const writer = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../container/writer').default);
    }, 'writer');
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
            <Route path="writer" getComponent={writer} />
        </Route>
    </Router>
);

export default RouteConfig;
