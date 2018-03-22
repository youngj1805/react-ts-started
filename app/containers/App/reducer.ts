import { fromJS } from 'immutable';

import { LOAD_REPOS, LOAD_REPOS_SUCCESS, LOAD_REPOS_ERROR } from './constansts';

const initialState = fromJS({
    loading: false,
    error: false,
    currentUser: false,
    userData: {
        repositories: false
    }
});

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_REPOS:
            return state
                .set('loading', true)
                .set('error', false)
                .setIn(['userData', 'repositories'], false);
        case LOAD_REPOS_SUCCESS:
            return state
                .set('loading', false)
                .set('error', false)
                .set('currentUser', action.username)
                .setIn(['userData', 'repositories'], action.repos);
        case LOAD_REPOS_ERROR:
            return state
                .set('loading', false)
                .set('error', action.error);
        default:
            return state;
    }
}

export default appReducer;