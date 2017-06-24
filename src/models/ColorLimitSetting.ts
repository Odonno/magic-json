export class ColorLimitPercentSetting {
    min: number;
    max: number;
    color: string;
}

export class ColorLimitSizeSetting {
    min: {
        value: number,
        factor: number
    };
    max: {
        value: number,
        factor: number
    };
    color: string;
}