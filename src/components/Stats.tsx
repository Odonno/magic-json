import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as React from 'react';

import * as State from '../state';

import { ViewerTab, ViewerNode } from '../models/Viewer';

import { ColorLimitPercentSetting, ColorLimitSizeSetting } from '../models/ColorLimitSetting';

import SizeToStringConverter from '../converters/sizeToStringConverter';
import NodeViewerService from '../services/nodeViewerService';

import { Tag } from 'antd';

const lazyLoad: any = require('react-lazyload');
const LazyLoad = lazyLoad.default;

type PropertySize = {
    key: string;
    size: number;
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

class Stats extends React.Component<OwnProps & StateFromProps & DispatchFromProps, void> {
    calculatePropertySize = (node: ViewerNode, isInArray: boolean = false): PropertySize[] => {
        if (Array.isArray(node.value)) {
            const childrenPropertySize = node.value
                .filter(n => !this.props.tab.settings.removeNullProperties || n.value !== null)
                .map(v => this.calculatePropertySize(v, node.isArray))
                .reduce((a, b) => a.concat(b), []);

            if (isInArray) {
                return childrenPropertySize;
            } else {
                return [{
                    key: node.property,
                    size: NodeViewerService.calculateSize(node)
                }].concat(childrenPropertySize);
            }
        } else {
            if (isInArray) {
                return [];
            }

            return [{
                key: node.property,
                size: NodeViewerService.calculateSize(node)
            }];
        }
    }

    render() {
        const tempArray = this.props.tab.nodes
            .filter(node => !this.props.tab.settings.removeNullProperties || node.value !== null)
            .map(node => this.calculatePropertySize(node, this.props.tab.isArray))
            .reduce((a, b) => a.concat(b), []);

        const sizePerPropertyArray: PropertySize[] = [];

        tempArray.forEach(t => {
            const filteredSpp = sizePerPropertyArray.filter(spp => spp.key === t.key);

            if (filteredSpp.length > 0) {
                filteredSpp[0].size += t.size;
            } else {
                sizePerPropertyArray.push({
                    key: t.key,
                    size: t.size
                });
            }
        });

        const totalSize = sizePerPropertyArray
            .map(spp => spp.size)
            .reduce((a, b) => a + b);

        return (
            <div>
                {sizePerPropertyArray
                    .sort((a, b) => b.size - a.size)
                    .map(spp => {
                        const percent = spp.size / totalSize * 100;

                        // use settings to configure colors/limit
                        const colorLimitPercentSetting = this.props.colorLimitsPercent
                            .filter(cl => percent >= cl.min && percent <= cl.max)[0];
                        const colorLimitPercentColor = colorLimitPercentSetting ? colorLimitPercentSetting.color : 'black';

                        const colorLimitSizeSetting = this.props.colorLimitsSize
                            .filter(cl => {
                                return spp.size >= (cl.min.value * Math.pow(1024, cl.min.factor)) &&
                                    spp.size <= (cl.max.value * Math.pow(1024, cl.max.factor));
                            })[0];
                        const colorLimitSizeColor = colorLimitSizeSetting ? colorLimitSizeSetting.color : 'black';

                        return (
                            <LazyLoad key={spp.key} height={35} offset={[100, 100]} debounce={50} overflow={true}>
                                <div style={{ padding: '5px 20px' }}>
                                    <span style={{ display: 'inline-block' }}>
                                        <strong>{spp.key} </strong>
                                        {this.props.showColorLimitsSize &&
                                            <Tag color={colorLimitSizeColor}>{SizeToStringConverter.convert(spp.size)}</Tag>
                                        }
                                        {this.props.showColorLimitsPercent &&
                                            <Tag color={colorLimitPercentColor}>{percent.toFixed(2) + '%'}</Tag>
                                        }
                                    </span>
                                </div>
                            </LazyLoad>
                        );
                    })
                }
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
)(Stats);