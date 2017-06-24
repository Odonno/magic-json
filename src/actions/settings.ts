export type Action =
    {
        type: 'SETTINGS_TOGGLE_PANE'
    } | {
        type: 'SETTINGS_UPDATE_COLOR_OF_LIMIT_PERCENT',
        index: number,
        color: string
    } | {
        type: 'SETTINGS_UPDATE_RANGE_OF_LIMIT_PERCENT',
        index: number,
        min: number,
        max: number
    } | {
        type: 'SETTINGS_UPDATE_COLOR_OF_LIMIT_SIZE',
        index: number,
        color: string
    } | {
        type: 'SETTINGS_UPDATE_RANGE_OF_LIMIT_SIZE',
        index: number,
        min: number,
        max: number
    } | {
        type: 'SETTINGS_TOGGLE_SHOW_LIMIT_PERCENT'
    } | {
        type: 'SETTINGS_TOGGLE_SHOW_LIMIT_SIZE'
    } | {
        type: 'SETTINGS_UPDATE_FACTOR_OF_LIMIT_SIZE',
        index: number,
        factor: number,
        propertyType: 'min' | 'max'
    };

export const TOGGLE_PANE = 'SETTINGS_TOGGLE_PANE';
export const UPDATE_COLOR_OF_LIMIT_PERCENT = 'SETTINGS_UPDATE_COLOR_OF_LIMIT_PERCENT';
export const UPDATE_RANGE_OF_LIMIT_PERCENT = 'SETTINGS_UPDATE_RANGE_OF_LIMIT_PERCENT';
export const UPDATE_COLOR_OF_LIMIT_SIZE = 'SETTINGS_UPDATE_COLOR_OF_LIMIT_SIZE';
export const UPDATE_RANGE_OF_LIMIT_SIZE = 'SETTINGS_UPDATE_RANGE_OF_LIMIT_SIZE';
export const TOGGLE_SHOW_LIMIT_PERCENT = 'SETTINGS_TOGGLE_SHOW_LIMIT_PERCENT';
export const TOGGLE_SHOW_LIMIT_SIZE = 'SETTINGS_TOGGLE_SHOW_LIMIT_SIZE';
export const UPDATE_FACTOR_OF_LIMIT_SIZE = 'SETTINGS_UPDATE_FACTOR_OF_LIMIT_SIZE';

export const togglePane = (): Action => ({
    type: TOGGLE_PANE
});

export const updateColorOfLimitPercent = (index: number, color: string): Action => ({
    type: UPDATE_COLOR_OF_LIMIT_PERCENT,
    index,
    color
});

export const updateRangeOfLimitPercent = (index: number, min: number, max: number): Action => ({
    type: UPDATE_RANGE_OF_LIMIT_PERCENT,
    index,
    min,
    max
});

export const updateColorOfLimitSize = (index: number, color: string): Action => ({
    type: UPDATE_COLOR_OF_LIMIT_SIZE,
    index,
    color
});

export const updateRangeOfLimitSize = (index: number, min: number, max: number): Action => ({
    type: UPDATE_RANGE_OF_LIMIT_SIZE,
    index,
    min,
    max
});

export const toggleShowLimitPercent = (): Action => ({
    type: TOGGLE_SHOW_LIMIT_PERCENT
});

export const toggleShowLimitSize = (): Action => ({
    type: TOGGLE_SHOW_LIMIT_SIZE
});

export const updateFactorOfLimitSize = (index: number, factor: number, propertyType: 'min' | 'max'): Action => ({
    type: UPDATE_FACTOR_OF_LIMIT_SIZE,
    index,
    factor,
    propertyType
});