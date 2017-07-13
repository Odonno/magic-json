import { ViewerTab } from '../models/Viewer';

export type Action =
    {
        type: 'CONTENT_CHANGE_ACTIVE_TAB',
        activeKey: string
    } | {
        type: 'CONTENT_ADD_TAB',
        filename: string,
        json: string
    } | {
        type: 'CONTENT_TOGGLE_REMOVE_NULL_PROPERTIES',
        tab: ViewerTab
    } | {
        type: 'CONTENT_UPDATE_TITLE',
        tab: ViewerTab,
        title: string
    } | {
        type: 'CONTENT_REMOVE_TAB',
        tab: ViewerTab
    } | {
        type: 'CONTENT_TOGGLE_SHOW_STATS_BLOCK',
        tab: ViewerTab
    } | {
        type: 'CONTENT_TOGGLE_SHOW_NODES_SIMILARITIES_BLOCK',
        tab: ViewerTab
    };

export const CHANGE_ACTIVE_TAB = 'CONTENT_CHANGE_ACTIVE_TAB';
export const ADD_TAB = 'CONTENT_ADD_TAB';
export const TOGGLE_REMOVE_NULL_PROPERTIES = 'CONTENT_TOGGLE_REMOVE_NULL_PROPERTIES';
export const UPDATE_TITLE = 'CONTENT_UPDATE_TITLE';
export const REMOVE_TAB = 'CONTENT_REMOVE_TAB';
export const TOGGLE_SHOW_STATS_BLOCK = 'CONTENT_TOGGLE_SHOW_STATS_BLOCK';
export const TOGGLE_SHOW_NODES_SIMILARITIES_BLOCK = 'CONTENT_TOGGLE_SHOW_NODES_SIMILARITIES_BLOCK';

export const changeActiveTab = (activeKey: string): Action => ({
    type: CHANGE_ACTIVE_TAB,
    activeKey
});

export const addTab = (filename: string, json: string): Action => ({
    type: ADD_TAB,
    filename,
    json
});

export const toggleRemoveNullProperties = (tab: ViewerTab): Action => ({
    type: TOGGLE_REMOVE_NULL_PROPERTIES,
    tab
});

export const updateTitle = (tab: ViewerTab, title: string): Action => ({
    type: UPDATE_TITLE,
    tab,
    title
});

export const removeTab = (tab: ViewerTab): Action => ({
    type: REMOVE_TAB,
    tab
});

export const toggleShowStatsBlock = (tab: ViewerTab): Action => ({
    type: TOGGLE_SHOW_STATS_BLOCK,
    tab
});

export const toggleShowNodesSimilaritiesBlock = (tab: ViewerTab): Action => ({
    type: TOGGLE_SHOW_NODES_SIMILARITIES_BLOCK,
    tab
});