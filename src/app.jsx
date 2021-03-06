import React, { Component, PropTypes } from 'react';
import ReactDOM, { render } from 'react-dom';
import { Provider } from 'react-redux';
import 'assets/style/public.scss';
import route from './router'; // 路由配置
import store from './redux/store';

store.subscribe(() => { // 监听state变化
    // console.log(store.getState())
});

render(
    <Provider store={store}>
        {route}
    </Provider>,
    document.body.appendChild(document.createElement('div'))
);

