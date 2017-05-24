import fetch from 'isomorphic-fetch';
import { hashHistory } from 'react-router';

const fetchPosts = (path, method, body, url = '') => {
    method = method.toUpperCase();
    if (method === 'GET') {
        // fetch的GET不允许有body，参数只能放在url中
        body = undefined;
    } else {
        body = body && JSON.stringify(body);
    }
    const tokenInfo = localStorage.getItem('token');
    return fetch(path, {
        method,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json', // 记得加上这行，不然bodyParser.json() 会识别不了,
            'x-access-token': tokenInfo ? JSON.parse(tokenInfo).token : ''
        },
        mode: 'cors',
        body
    }).then(response => {
        // 验证失败跳转到登录页面
        if (response.status === 403) {
            const href = url === '' ? '/login' : `/login?reUrl=${url}`;
            hashHistory.push(href);
            return Promise.reject('Unauthorized.');
        }
        if (!response.ok) throw new Error('Bad response from server');
        return response.json();
    }).catch(error => console.log(error));
};
export default fetchPosts;

