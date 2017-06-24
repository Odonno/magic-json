import { ViewerTab } from '../models/Viewer';
import { ColorLimitPercentSetting, ColorLimitSizeSetting } from '../models/ColorLimitSetting';

export type Content = {
    readonly activeKey: string,
    readonly tabs: ViewerTab[]
};

export type Settings = {
    readonly showed: boolean,
    readonly tags: {
        showColorLimitsPercent: boolean,
        showColorLimitsSize: boolean
    },
    readonly colorLimitsPercent: ColorLimitPercentSetting[],
    readonly colorLimitsSize: ColorLimitSizeSetting[]
};

export type Root = {
    readonly content: Content,
    readonly settings: Settings
};