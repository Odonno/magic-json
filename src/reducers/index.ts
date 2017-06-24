import { combineReducers } from 'redux';

import * as State from '../state';

import {
    initialState as contentInitialState,
    reducer as contentReducer
} from './content';

import {
    initialState as settingsInitialState,
    reducer as settingsReducer
} from './settings';

export const initialState: State.Root = {
    content: contentInitialState,
    settings: settingsInitialState
};

export const reducers = combineReducers<State.Root>({
    content: contentReducer,
    settings: settingsReducer
});