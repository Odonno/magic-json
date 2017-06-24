import { Action } from '../actions/content';
import * as Actions from '../actions/content';
import * as State from '../state';

import JsonToNodesConverter from '../converters/jsonToNodesConverter';

import { ViewerTab } from '../models/Viewer';

export const initialState: State.Content = {
    activeKey: 'Sample 1',
    tabs: [
        {
            key: 'Sample 1',
            title: 'Sample 1',
            originalJson: '{ "content": "Content of the sample", "other": "Hello World!" }',
            isObject: true,
            isArray: false,
            nodes: [
                {
                    isOpened: false,
                    isObject: false,
                    isArray: false,
                    property: 'content',
                    value: 'Content of the sample'
                },
                {
                    isOpened: false,
                    isObject: false,
                    isArray: false,
                    property: 'other',
                    value: 'Hello World!'
                }
            ],
            settings: {
                removeNullProperties: false
            }
        }
    ]
};

const createNewKey = (tabs: ViewerTab[], filename: string) => {
    let x = 0;

    while (true) {
        const checkName = filename + (x === 0 ? '' : ` (${x + 1})`);

        if (tabs.filter(tab => tab.key === checkName).length <= 0) {
            return checkName;
        }
        x++;
    }
};

export const reducer = (state: State.Content = initialState, action: Action): State.Content => {
    switch (action.type) {
        case Actions.CHANGE_ACTIVE_TAB:
            return {
                ...state,
                activeKey: action.activeKey
            };

        case Actions.ADD_TAB:
            // create a new key based on the current tabs
            const newKey = createNewKey(state.tabs, action.filename);

            const rootNodes = JsonToNodesConverter.convert(action.json);

            const isObject = action.json.substring(0, 1) === '{';
            const isArray = action.json.substring(0, 1) === '[';

            const newTab: ViewerTab = {
                key: newKey,
                title: newKey,
                originalJson: action.json,
                isObject,
                isArray,
                nodes: rootNodes,
                settings: {
                    removeNullProperties: false
                }
            };

            return {
                ...state,
                activeKey: newKey,
                tabs: state.tabs.concat(newTab)
            };

        case Actions.TOGGLE_REMOVE_NULL_PROPERTIES:
            return {
                ...state,
                tabs: state.tabs.map(tab => {
                    if (tab.key === action.tab.key) {
                        return {
                            ...tab,
                            settings: {
                                ...tab.settings,
                                removeNullProperties: !tab.settings.removeNullProperties
                            }
                        };
                    }

                    return tab;
                })
            };

        case Actions.UPDATE_TITLE:
            return {
                ...state,
                tabs: state.tabs.map(tab => {
                    if (tab.key === action.tab.key) {
                        return {
                            ...tab,
                            title: action.title
                        };
                    }

                    return tab;
                })
            };

        case Actions.REMOVE_TAB:
            return {
                ...state,
                tabs: state.tabs.filter(tab => tab.key !== action.tab.key)
            };

        default: return state;
    }
};