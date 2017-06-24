import { Action } from '../actions/settings';
import * as Actions from '../actions/settings';
import * as State from '../state';

export const initialState: State.Settings = {
    showed: false,
    tags: {
        showColorLimitsPercent: true,
        showColorLimitsSize: true
    },
    colorLimitsPercent: [
        {
            min: 0,
            max: 10,
            color: 'green'
        },
        {
            min: 10,
            max: 35,
            color: 'yellow'
        },
        {
            min: 35,
            max: 75,
            color: 'orange'
        },
        {
            min: 75,
            max: 100,
            color: 'red'
        }
    ],
    colorLimitsSize: [
        {
            min: {
                value: 0,
                factor: 0
            },
            max: {
                value: 512,
                factor: 0
            },
            color: 'green'
        },
        {
            min: {
                value: 512,
                factor: 0
            },
            max: {
                value: 1,
                factor: 1
            },
            color: 'yellow'
        },
        {
            min: {
                value: 1,
                factor: 1
            },
            max: {
                value: 1,
                factor: 2
            },
            color: 'orange'
        },
        {
            min: {
                value: 1,
                factor: 2
            },
            max: {
                value: 1,
                factor: 3
            },
            color: 'red'
        }
    ]
};

export const reducer = (state: State.Settings = initialState, action: Action): State.Settings => {
    switch (action.type) {
        case Actions.TOGGLE_PANE:
            return {
                ...state,
                showed: !state.showed
            };

        case Actions.UPDATE_COLOR_OF_LIMIT_PERCENT:
            return {
                ...state,
                colorLimitsPercent: state.colorLimitsPercent.map((cl, index) => {
                    if (index === action.index) {
                        return {
                            ...cl,
                            color: action.color
                        };
                    }

                    return cl;
                })
            };

        case Actions.UPDATE_RANGE_OF_LIMIT_PERCENT:
            return {
                ...state,
                colorLimitsPercent: state.colorLimitsPercent.map((cl, index) => {
                    if (index === action.index) {
                        return {
                            ...cl,
                            min: action.min,
                            max: action.max
                        };
                    }

                    return cl;
                })
            };

        case Actions.UPDATE_COLOR_OF_LIMIT_SIZE:
            return {
                ...state,
                colorLimitsSize: state.colorLimitsSize.map((cl, index) => {
                    if (index === action.index) {
                        return {
                            ...cl,
                            color: action.color
                        };
                    }

                    return cl;
                })
            };

        case Actions.UPDATE_RANGE_OF_LIMIT_SIZE:
            return {
                ...state,
                colorLimitsSize: state.colorLimitsSize.map((cl, index) => {
                    if (index === action.index) {
                        return {
                            ...cl,
                            min: {
                                ...cl.min,
                                value: action.min
                            },
                            max: {
                                ...cl.max,
                                value: action.max
                            }
                        };
                    }

                    return cl;
                })
            };

        case Actions.TOGGLE_SHOW_LIMIT_PERCENT:
            return {
                ...state,
                tags: {
                    ...state.tags,
                    showColorLimitsPercent: !state.tags.showColorLimitsPercent
                }
            };

        case Actions.TOGGLE_SHOW_LIMIT_SIZE:
            return {
                ...state,
                tags: {
                    ...state.tags,
                    showColorLimitsSize: !state.tags.showColorLimitsSize
                }
            };

        case Actions.UPDATE_FACTOR_OF_LIMIT_SIZE:
            return {
                ...state,
                colorLimitsSize: state.colorLimitsSize.map((cl, index) => {
                    if (index === action.index) {
                        if (action.propertyType === 'min') {
                            return {
                                ...cl,
                                min: {
                                    ...cl.min,
                                    factor: action.factor
                                }
                            };
                        } else {
                            return {
                                ...cl,
                                max: {
                                    ...cl.max,
                                    factor: action.factor
                                }
                            };
                        }
                    }

                    return cl;
                })
            };

        default: return state;
    }
};