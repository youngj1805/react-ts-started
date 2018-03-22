import { fromJS } from 'immutable';
import { combineReducers } from 'redux-immutable';
import { LOCATION_CHANGE } from 'react-router-redux';

import globalReducer from 'app/containers/App/reducer';
import languageProvierReducer from 'app/containers/LanguageProvider/reducer';

/**
 * routeReducer
 * The reducer merges route location changes into our immutable state.
 * The change is nessitated by moving to react-router-redux
 */

// Initial routing state
const routeInitialState = fromJS({
    location: null
})

const routeReducer = (state = routeInitialState, action) => {
    switch (action.type) {
        case LOCATION_CHANGE:
            return state.merge({
                location: action.payload
            })
        default:
            return state;
    }
}

const createReducer = (injectedReducers?) => combineReducers({
    route: routeReducer,
    global: globalReducer,
    language: languageProvierReducer,
    ...injectedReducers
})

export default createReducer;