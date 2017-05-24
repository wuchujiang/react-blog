import fetch from 'isomorphic-fetch';
import { USER_INFO } from '../types';

export const fetchPosts = path => {
    return dispatch => {
        return fetch(path, {
            mode: 'cors',
        }).then(response => {
            if (!response.ok) throw new Error('Bad response from server');
            return response.json();
        }).catch(error => console.log(error));
    };
};

export const userInfo = (name) => ({ type: USER_INFO, value: name });
