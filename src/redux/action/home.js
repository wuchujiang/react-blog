import fetch from 'isomorphic-fetch';
import { ADD_TODOS, SUBTRACT_TODOS } from '../types';

export const addAodos = () => ({ type: ADD_TODOS });

export const subtractTodos = () => ({ type: SUBTRACT_TODOS });

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
