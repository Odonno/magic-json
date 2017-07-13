import { ViewerNode } from '../models/Viewer';

export default class NodeViewerService {
    public static calculateSize(node: ViewerNode): number {
        if (node.value === null) {
            return `${node.property}: null`.length;
        } else if (
            typeof node.value === 'number' ||
            typeof node.value === 'string' ||
            typeof node.value === 'boolean') {
            return `${node.property}: ${node.value.toString()}`.length;
        } else if (typeof node.value === 'object') {
            if (Array.isArray(node.value)) {
                const childrenSize = node.value
                    .map(v => this.calculateSize(v))
                    .reduce((a, b) => a + b, 0);

                if (node.isArray) {
                    return `${node.property}: []`.length + childrenSize;
                } else {
                    return `${node.property}: {}`.length + childrenSize;
                }
            }
        } else {
            // Impossible to calculate size of property: ${node.property}
        }

        return 0;
    }
}