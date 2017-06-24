import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as React from 'react';

import * as State from '../state';

import { ViewerTab, ViewerNode } from '../models/Viewer';

import { ColorLimitPercentSetting, ColorLimitSizeSetting } from '../models/ColorLimitSetting';

import NodeViewer from './NodeViewer';

import SizeToStringConverter from '../converters/sizeToStringConverter';
import NodeViewerService from '../services/nodeViewerService';

import { Tag } from 'antd';

const lazyLoad: any = require('react-lazyload');
const LazyLoad = lazyLoad.default;

const nodesStyle = {
    padding: '5px 20px'
} as React.CSSProperties;

type NodeSimilarGroup = {
    index: number;
    node: ViewerNode;
    occurences: number;
};

interface OwnProps {
    tab: ViewerTab;
}

interface StateFromProps {
    showColorLimitsPercent: boolean;
    showColorLimitsSize: boolean;
    colorLimitsPercent: ColorLimitPercentSetting[];
    colorLimitsSize: ColorLimitSizeSetting[];
}

interface DispatchFromProps {

}

class Similarities extends React.Component<OwnProps & StateFromProps & DispatchFromProps, void> {
    getChildrenNodes = (node: ViewerNode): ViewerNode[] => {
        if (Array.isArray(node.value)) {
            const childrenNodes = node.value
                .filter(n => n.isArray || n.isObject)
                .map(n => this.getChildrenNodes(n))
                .reduce((a, b) => a.concat(b), []);

            return childrenNodes.concat(node);
        }

        return [node];
    }

    areNodesEquals = (node1: ViewerNode, node2: ViewerNode): boolean => {
        if (node1.isObject !== node2.isObject) {
            return false;
        }

        if (node1.isArray !== node2.isArray) {
            return false;
        }

        if (Array.isArray(node1.value)) {
            if (Array.isArray(node2.value)) {
                if (node1.value.length !== node2.value.length) {
                    return false;
                }

                for (let key in Object.keys(node1.value)) {
                    if (!node2.value[key]) {
                        return false;
                    }

                    if (!this.areNodesEquals(node1.value[key], node2.value[key])) {
                        return false;
                    }
                }
            } else {
                return false;
            }
        } else {
            if (Array.isArray(node2.value)) {
                return false;
            } else {
                if (node1.property !== node2.property) {
                    return false;
                }

                return node1.value === node2.value;
            }
        }

        return true;
    }

    render() {
        const allNodes = this.props.tab.nodes
            .filter(n => n.isArray || n.isObject)
            .map(n => this.getChildrenNodes(n))
            .reduce((a, b) => a.concat(b), []);

        const linkedNodesIndex: { one: number, two: number }[] = [];

        for (let i = 0; i < allNodes.length - 1; i++) {
            for (let j = i + 1; j < allNodes.length; j++) {
                if (linkedNodesIndex.filter(x => x.two === j).length > 0) {
                    continue;
                }

                if (this.areNodesEquals(allNodes[i], allNodes[j])) {
                    linkedNodesIndex.push({ one: i, two: j });
                }
            }
        }
        
        const nodeSimilarGroups: NodeSimilarGroup[] = [];

        linkedNodesIndex
            .forEach(ni => {
                const group = nodeSimilarGroups.filter(g => g.index === ni.one)[0];

                if (group) {
                    group.occurences++;
                } else {
                    nodeSimilarGroups.push({
                        index: ni.one,
                        node: allNodes[ni.one],
                        occurences: 2
                    });
                }
            });

        const parentSize = 2 + this.props.tab.nodes
            .map(node => NodeViewerService.calculateSize(node))
            .reduce((a, b) => a + b, 0);

        return (
            <div>
                {nodeSimilarGroups.map((nsg) => {
                    const singleNodeSize = NodeViewerService.calculateSize(nsg.node);
                    const nodeSize = singleNodeSize * nsg.occurences;
                    const percent = nodeSize / parentSize * 100;

                    // use settings to configure colors/limit
                    const colorLimitPercentSetting = this.props.colorLimitsPercent
                        .filter(cl => percent >= cl.min && percent <= cl.max)[0];
                    const colorLimitPercentColor = colorLimitPercentSetting ? colorLimitPercentSetting.color : 'black';

                    const colorLimitSizeSetting = this.props.colorLimitsSize
                        .filter(cl => {
                            return nodeSize >= (cl.min.value * Math.pow(1024, cl.min.factor)) &&
                                nodeSize <= (cl.max.value * Math.pow(1024, cl.max.factor));
                        })[0];
                    const colorLimitSizeColor = colorLimitSizeSetting ? colorLimitSizeSetting.color : 'black';

                    return (
                        <LazyLoad key={nsg.index} height={35} offset={[100, 100]} debounce={50} overflow={true}>
                            <div style={nodesStyle}>
                                <span style={{ display: 'inline-block' }}>
                                    <strong>{nsg.node.property} </strong>
                                    {this.props.showColorLimitsSize &&
                                        <Tag color={colorLimitSizeColor}>{SizeToStringConverter.convert(nodeSize)}</Tag>
                                    }
                                    {this.props.showColorLimitsPercent &&
                                        <Tag color={colorLimitPercentColor}>{percent.toFixed(2) + '%'}</Tag>
                                    }
                                </span>

                                <div style={{ paddingTop: 5 }}>
                                    {Object.keys(nsg.node.value)
                                        .filter(key => !this.props.tab.settings.removeNullProperties || nsg.node.value[key] !== null)
                                        .map(key => {
                                            return (
                                                <LazyLoad key={key} height={35} offset={[100, 100]} debounce={50} overflow={true}>
                                                    <NodeViewer
                                                        node={nsg.node.value[key]}
                                                        parentSize={singleNodeSize}
                                                        removeNullProperties={this.props.tab.settings.removeNullProperties} />
                                                </LazyLoad>
                                            );
                                        })
                                    }
                                </div>
                            </div>
                        </LazyLoad>
                    );
                })}
            </div>
        );
    }
}

const mapStateToProps = (state: State.Root): StateFromProps => ({
    showColorLimitsPercent: state.settings.tags.showColorLimitsPercent,
    showColorLimitsSize: state.settings.tags.showColorLimitsSize,
    colorLimitsPercent: state.settings.colorLimitsPercent,
    colorLimitsSize: state.settings.colorLimitsSize
});

const mapDispatchToProps = (dispatch: Dispatch<State.Root>): DispatchFromProps => ({

});

export default connect<StateFromProps, DispatchFromProps, OwnProps>(
    mapStateToProps,
    mapDispatchToProps
)(Similarities);