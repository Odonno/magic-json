import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as React from 'react';

import * as State from '../state';

import { ViewerNode } from '../models/Viewer';

import { ColorLimitPercentSetting, ColorLimitSizeSetting } from '../models/ColorLimitSetting';

import SizeToStringConverter from '../converters/sizeToStringConverter';
import NodeViewerService from '../services/nodeViewerService';

import { Icon, Tag } from 'antd';

const lazyLoad: any = require('react-lazyload');
const LazyLoad = lazyLoad.default;

const expanderStyle = {
    display: 'inline-block',
    width: 24,
    height: 24,
    textAlign: 'center',
    verticalAlign: 'middle',
    margin: 0
} as React.CSSProperties;

const nodesStyle = {
    padding: '5px 20px'
} as React.CSSProperties;

interface OwnProps {
    node: ViewerNode;
    parentSize: number;
    removeNullProperties: boolean;
}

interface StateFromProps {
    showColorLimitsPercent: boolean;
    showColorLimitsSize: boolean;
    colorLimitsPercent: ColorLimitPercentSetting[];
    colorLimitsSize: ColorLimitSizeSetting[];
}

interface DispatchFromProps {

}

interface OwnState {
    isOpen: boolean;
}

class NodeViewer extends React.Component<OwnProps & StateFromProps & DispatchFromProps, OwnState> {
    constructor() {
        super();

        this.state = {
            isOpen: false
        };
    }

    handleClick = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        let displayValue: string = '';
        let canUseOpenButton: boolean = false;
        const size = NodeViewerService.calculateSize(this.props.node);

        if (this.props.node.value === null) {
            displayValue = 'null';
        } else if (
            typeof this.props.node.value === 'number' ||
            typeof this.props.node.value === 'string' ||
            typeof this.props.node.value === 'boolean') {
            displayValue = this.props.node.value.toString();
        } else if (typeof this.props.node.value === 'object') {
            if (Array.isArray(this.props.node.value) && this.props.node.isArray) {
                displayValue = '[]';
                canUseOpenButton = this.props.node.value.length > 0;
            } else {
                displayValue = '{}';
                canUseOpenButton = true;
            }
        } else {
            console.log(`Impossible to use property: ${this.props.node.property}`);
        }

        let nodes: JSX.Element[] = [];
        if (this.state.isOpen) {
            nodes = Object.keys(this.props.node.value)
                .filter(key => !this.props.removeNullProperties || this.props.node.value[key] !== null)
                .map(key => {
                    return (
                        <LazyLoad key={key} height={35} offset={[100, 100]} debounce={50} overflow={true}>
                            <NodeViewer
                                node={this.props.node.value[key]}
                                parentSize={size}
                                removeNullProperties={this.props.removeNullProperties}
                                showColorLimitsPercent={this.props.showColorLimitsPercent}
                                showColorLimitsSize={this.props.showColorLimitsSize}
                                colorLimitsPercent={this.props.colorLimitsPercent}
                                colorLimitsSize={this.props.colorLimitsSize} />
                        </LazyLoad>
                    );
                });
        }

        const percent = size / this.props.parentSize * 100;

        // use settings to configure colors/limit
        const colorLimitPercentSetting = this.props.colorLimitsPercent
            .filter(cl => percent >= cl.min && percent <= cl.max)[0];
        const colorLimitPercentColor = colorLimitPercentSetting ? colorLimitPercentSetting.color : 'black';

        const colorLimitSizeSetting = this.props.colorLimitsSize
            .filter(cl => {
                return size >= (cl.min.value * Math.pow(1024, cl.min.factor)) &&
                    size <= (cl.max.value * Math.pow(1024, cl.max.factor));
            })[0];
        const colorLimitSizeColor = colorLimitSizeSetting ? colorLimitSizeSetting.color : 'black';

        return (
            <div>
                <span style={expanderStyle}>
                    {canUseOpenButton &&
                        (
                            <span style={{ cursor: 'pointer' }} onClick={this.handleClick}>
                                <Icon
                                    style={{ fontSize: '7px' }}
                                    type={this.state.isOpen ? 'caret-down' : 'caret-right'} />
                            </span>
                        )
                    }
                </span>

                <span style={{ display: 'inline-block' }}>
                    <strong> {this.props.node.property}</strong>
                    <span>:</span>
                    <span> </span>
                    <span>{displayValue}</span>
                    <span> </span>
                    {this.props.showColorLimitsSize &&
                        <Tag color={colorLimitSizeColor}>{SizeToStringConverter.convert(size)}</Tag>
                    }
                    {this.props.showColorLimitsPercent &&
                        <Tag color={colorLimitPercentColor}>{percent.toFixed(2) + '%'}</Tag>
                    }
                </span>

                <div style={nodesStyle}>
                    {nodes}
                </div>
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
)(NodeViewer);