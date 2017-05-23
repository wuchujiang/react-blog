import fetch from 'isomorphic-fetch';


const fetchPosts = (path, method, body) => {
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
        if (!response.ok) throw new Error('Bad response from server');
        return response.json();
    }).catch(error => console.log(error));
};
export default fetchPosts;

