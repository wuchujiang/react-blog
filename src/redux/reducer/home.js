import { USER_INFO } from '../types';

export const userInfo = (state = '', action = {}) => {
    switch (action.type) {
    case USER_INFO:
        return action.value;
    default:
        return state;
    }
};

