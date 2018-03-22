import { fromJS } from 'immutable';

import { DEFAULT_LOCALE } from 'app/containers/App/constansts';

import { CHANGE_LOCALE } from './constants';

const initialState = fromJS({
    locale: DEFAULT_LOCALE
});

export default function languageProviderReducer(state = initialState, action) {
    switch (action.type) {
        case CHANGE_LOCALE:
            return state.set('locale', action.locale);
        default:
            return state;
    }
}