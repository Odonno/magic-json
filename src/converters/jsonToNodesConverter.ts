import { ViewerNode } from '../models/Viewer';

export default class JsonToNodesConverter {
    public static convert(json: string): ViewerNode[] {
        return this.convertFromObject(JSON.parse(json));
    }

    private static convertFromObject(o: any): ViewerNode[] {
        return Object.keys(o).map(key => {
            let isObject = false;
            let isArray = false;
            let value;

            if (o[key] === null) {
                value = null;
            } else if (typeof o[key] === 'object') {
                if (Array.isArray(o[key])) {
                    isArray = true;
                } else {
                    isObject = true;
                }
                value = this.convertFromObject(o[key]);
            } else {
                value = o[key];
            }

            return {
                isOpened: false,
                property: key,
                isObject,
                isArray,
                value
            };
        });
    }
}