export class ViewerTab {
    key: string;
    title: string;
    originalJson: string;
    isObject: boolean;
    isArray: boolean;
    nodes: ViewerNode[];
    settings: {
        removeNullProperties: boolean;
        showStatsBlock: boolean;
        showNodesSimilaritiesBlock: boolean;
    };
}

export class ViewerNode {
    isOpened: boolean;
    property: string;
    isObject: boolean;
    isArray: boolean;
    value: boolean | number | string | ViewerNode[];
}