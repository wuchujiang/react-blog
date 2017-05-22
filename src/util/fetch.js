import fetch from 'isomorphic-fetch';


const fetchPosts = (path, method, body) => {
    method = method.toUpperCase();
    if (method === 'GET') {
        // fetch的GET不允许有body，参数只能放在url中
        body = undefined;
    } else {
        body = body && JSON.stringify(body);
    }
    return fetch(path, {
        method,
        mode: 'cors',
        body
    }).then(response => {
        if (!response.ok) throw new Error('Bad response from server');
        return response.json();
    }).catch(error => console.log(error));
};
export default fetchPosts;

