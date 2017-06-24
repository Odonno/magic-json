import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as React from 'react';

import * as State from '../state';

import {
    updateColorOfLimitPercent,
    updateRangeOfLimitPercent,
    updateColorOfLimitSize,
    updateRangeOfLimitSize,
    toggleShowLimitPercent,
    toggleShowLimitSize,
    updateFactorOfLimitSize
} from '../actions/settings';

import { ColorLimitPercentSetting, ColorLimitSizeSetting } from '../models/ColorLimitSetting';

import { Card, Input, Tag, Switch, Select } from 'antd';
const InputGroup = Input.Group;
const Option = Select.Option;

interface OwnProps {

}

interface StateFromProps {
    isColorLimitPercentTagShowed: boolean;
    isColorLimitSizeTagShowed: boolean;
    colorLimitsPercent: ColorLimitPercentSetting[];
    colorLimitsSize: ColorLimitSizeSetting[];
}

interface DispatchFromProps {
    handleColorLimitPercentShowedChange(): void;
    handleColorLimitSizeShowedChange(): void;
    handleColorLimitPercentColorChange(index: number, color: string): void;
    handleColorLimitPercentRangeChange(index: number, min: number, max: number): void;
    handleColorLimitSizeColorChange(index: number, color: string): void;
    handleColorLimitSizeRangeChange(index: number, min: number, max: number): void;
    handleColorLimitSizeFactorChange(index: number, factor: number, propertyType: 'min' | 'max'): void
}

class Settings extends React.Component<OwnProps & StateFromProps & DispatchFromProps, void> {
    handleColorLimitPercentColorChange = (e: React.FormEvent<any>, index: number) => {
        this.props.handleColorLimitPercentColorChange(index, e.target['value']);
    }

    handleColorLimitPercentValueChange = (e: React.FormEvent<any>, propertyType: 'min' | 'max', index: number) => {
        if (propertyType === 'min') {
            const currentMax = this.props.colorLimitsPercent[index].max;
            this.props.handleColorLimitPercentRangeChange(index, e.target['value'], currentMax);
        } else {
            const currentMin = this.props.colorLimitsPercent[index].min;
            this.props.handleColorLimitPercentRangeChange(index, currentMin, e.target['value']);
        }
    }

    handleColorLimitSizeColorChange = (e: React.FormEvent<any>, index: number) => {
        this.props.handleColorLimitSizeColorChange(index, e.target['value']);
    }

    handleColorLimitSizeValueChange = (e: React.FormEvent<any>, propertyType: 'min' | 'max', index: number) => {
        if (propertyType === 'min') {
            const currentMax = this.props.colorLimitsSize[index].max.value;
            this.props.handleColorLimitSizeRangeChange(index, e.target['value'], currentMax);
        } else {
            const currentMin = this.props.colorLimitsSize[index].min.value;
            this.props.handleColorLimitSizeRangeChange(index, currentMin, e.target['value']);
        }
    }

    handleColorLimitSizeFactorChange = (value: string, propertyType: 'min' | 'max', index: number) => {
        this.props.handleColorLimitSizeFactorChange(index, parseInt(value), propertyType);
    }

    render() {
        return (
            <div style={{ padding: 10 }}>
                <h3>Global settings</h3>

                <h4>Tags</h4>

                <div style={{ margin: '10px 0' }}>
                    <Switch
                        checked={this.props.isColorLimitPercentTagShowed}
                        onChange={this.props.handleColorLimitPercentShowedChange} />
                    <span style={{ marginLeft: 10 }}>Show color limits (percent) tag</span>
                </div>
                <div style={{ margin: '10px 0' }}>
                    <Switch
                        checked={this.props.isColorLimitSizeTagShowed}
                        onChange={this.props.handleColorLimitSizeShowedChange} />
                    <span style={{ marginLeft: 10 }}>Show color limits (size) tag</span>
                </div>

                <h4>Color limits (percent)</h4>

                {this.props.colorLimitsPercent.map((cl, index) => {
                    return (
                        <Card key={index} style={{ margin: '10px 0' }}>
                            <InputGroup compact={true}>
                                <Input
                                    style={{ width: 60, textAlign: 'center' }}
                                    placeholder="Min"
                                    value={cl.min}
                                    onChange={(e) => this.handleColorLimitPercentValueChange(e, 'min', index)}
                                    suffix="%" />
                                <Input
                                    style={{ width: 24, borderLeft: 0, pointerEvents: 'none' }}
                                    placeholder="~" />
                                <Input
                                    style={{ width: 60, textAlign: 'center', borderLeft: 0 }}
                                    placeholder="Max"
                                    value={cl.max}
                                    onChange={(e) => this.handleColorLimitPercentValueChange(e, 'max', index)}
                                    suffix="%" />
                            </InputGroup>

                            <Input
                                placeholder="Color (name or hexa value)"
                                value={cl.color}
                                onChange={(e) => this.handleColorLimitPercentColorChange(e, index)} />

                            <Tag color={cl.color}>Result</Tag>
                        </Card>
                    );
                })}

                <h4>Color limits (size)</h4>

                {this.props.colorLimitsSize.map((cl, index) => {
                    return (
                        <Card key={index} style={{ margin: '10px 0' }}>
                            <InputGroup compact={true}>
                                <Input
                                    style={{ width: 60, textAlign: 'center' }}
                                    placeholder="Min"
                                    value={cl.min.value}
                                    onChange={(e) => this.handleColorLimitSizeValueChange(e, 'min', index)} />
                                <Select 
                                    value={cl.min.factor.toString()}
                                    onChange={(value: string) => this.handleColorLimitSizeFactorChange(value, 'min', index)}>
                                    <Option value="0">B</Option>
                                    <Option value="1">KB</Option>
                                    <Option value="2">MB</Option>
                                    <Option value="3">GB</Option>
                                </Select>
                                <Input
                                    style={{ width: 24, borderLeft: 0, pointerEvents: 'none' }}
                                    placeholder="~" />
                                <Input
                                    style={{ width: 60, textAlign: 'center', borderLeft: 0 }}
                                    placeholder="Max"
                                    value={cl.max.value}
                                    onChange={(e) => this.handleColorLimitSizeValueChange(e, 'max', index)} />
                                <Select 
                                    value={cl.max.factor.toString()}
                                    onChange={(value: string) => this.handleColorLimitSizeFactorChange(value, 'max', index)}>
                                    <Option value="0">B</Option>
                                    <Option value="1">KB</Option>
                                    <Option value="2">MB</Option>
                                    <Option value="3">GB</Option>
                                </Select>
                            </InputGroup>

                            <Input
                                placeholder="Color (name or hexa value)"
                                value={cl.color}
                                onChange={(e) => this.handleColorLimitSizeColorChange(e, index)} />

                            <Tag color={cl.color}>Result</Tag>
                        </Card>
                    );
                })}
            </div>
        );
    }
}

const mapStateToProps = (state: State.Root): StateFromProps => ({
    isColorLimitPercentTagShowed: state.settings.tags.showColorLimitsPercent,
    isColorLimitSizeTagShowed: state.settings.tags.showColorLimitsSize,
    colorLimitsPercent: state.settings.colorLimitsPercent,
    colorLimitsSize: state.settings.colorLimitsSize
});

const mapDispatchToProps = (dispatch: Dispatch<State.Root>): DispatchFromProps => ({
    handleColorLimitPercentShowedChange: () => {
        dispatch(toggleShowLimitPercent());
    },
    handleColorLimitSizeShowedChange: () => {
        dispatch(toggleShowLimitSize());
    },
    handleColorLimitPercentColorChange: (index: number, color: string) => {
        dispatch(updateColorOfLimitPercent(index, color));
    },
    handleColorLimitPercentRangeChange: (index: number, min: number, max: number) => {
        dispatch(updateRangeOfLimitPercent(index, min, max));
    },
    handleColorLimitSizeColorChange: (index: number, color: string) => {
        dispatch(updateColorOfLimitSize(index, color));
    },
    handleColorLimitSizeRangeChange: (index: number, min: number, max: number) => {
        dispatch(updateRangeOfLimitSize(index, min, max));
    },
    handleColorLimitSizeFactorChange: (index: number, factor: number, propertyType: 'min' | 'max') => {
        dispatch(updateFactorOfLimitSize(index, factor, propertyType));
    }
});

export default connect<StateFromProps, DispatchFromProps, OwnProps>(
    mapStateToProps,
    mapDispatchToProps
)(Settings);