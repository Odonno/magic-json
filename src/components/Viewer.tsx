import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as React from 'react';

import * as State from '../state';

import {
    updateTitle,
    toggleRemoveNullProperties, 
    removeTab,
    toggleShowStatsBlock,
    toggleShowNodesSimilaritiesBlock
} from '../actions/content';

import { ViewerTab } from '../models/Viewer';

import NodeViewer from './NodeViewer';
import Stats from './Stats';
import Similarities from './Similarities';

import SizeToStringConverter from '../converters/sizeToStringConverter';
import NodeViewerService from '../services/nodeViewerService';

import { Button, Input, Checkbox } from 'antd';

interface OwnProps {
    tab: ViewerTab;
}

interface StateFromProps {

}

interface DispatchFromProps {
    handleTitleChange(tab: ViewerTab, title: string): void;
    handleRemoveNullPropertiesChange(tab: ViewerTab): void;
    handleRemoveTabClick(tab: ViewerTab): void;
    handleShowStatsBlockChange(tab: ViewerTab): void;
    handleShowNodesSimilaritiesBlockChange(tab: ViewerTab): void;
}

class Viewer extends React.Component<OwnProps & StateFromProps & DispatchFromProps, void> {
    parseObject = (object: {}, stack: string = '') => {
        for (let property in object) {
            if (object.hasOwnProperty(property)) {
                // parsing of null
                if (object[property] === null) {
                    delete object[property];
                }

                // parsing of objets, recursively
                if (typeof object[property] === 'object') {
                    this.parseObject(object[property], stack + '.' + property);
                }
            }
        }
    }

    handleTitleChange = (e: React.FormEvent<HTMLInputElement>) => {
        this.props.handleTitleChange(this.props.tab, e.currentTarget.value);
    }

    render() {
        const parentSize = 2 + this.props.tab.nodes
            .map(node => NodeViewerService.calculateSize(node))
            .reduce((a, b) => a + b, 0);

        return (
            <div>
                <Input
                    size="large"
                    placeholder="Title"
                    value={this.props.tab.title}
                    onChange={this.handleTitleChange} />

                <h3>{'Total size: ' + SizeToStringConverter.convert(parentSize)}</h3>

                <h4>Settings</h4>
                <Checkbox
                    checked={this.props.tab.settings.removeNullProperties}
                    onChange={() => this.props.handleRemoveNullPropertiesChange(this.props.tab)}>
                    Remove null properties
                </Checkbox>
                <br />
                <Checkbox
                    checked={this.props.tab.settings.showStatsBlock}
                    onChange={() => this.props.handleShowStatsBlockChange(this.props.tab)}>
                    Show stats block
                </Checkbox>
                <br />
                <Checkbox
                    checked={this.props.tab.settings.showNodesSimilaritiesBlock}
                    onChange={() => this.props.handleShowNodesSimilaritiesBlockChange(this.props.tab)}>
                    Show nodes similarities block
                </Checkbox>
                <br />
                <Button type="danger" onClick={() => this.props.handleRemoveTabClick(this.props.tab)}>
                    Remove pane
                </Button>

                <h4>Content</h4>
                {this.props.tab.nodes
                    .filter(node => !this.props.tab.settings.removeNullProperties || node.value !== null)
                    .map(node => {
                        return (
                            <NodeViewer
                                key={node.property}
                                node={node}
                                parentSize={parentSize}
                                removeNullProperties={this.props.tab.settings.removeNullProperties} />
                        );
                    })
                }

                {this.props.tab.settings.showStatsBlock &&
                    (
                        <div>
                            <h4>Stats (size per property)</h4>
                            <Stats tab={this.props.tab} />
                        </div>
                    )
                }

                {this.props.tab.settings.showNodesSimilaritiesBlock &&
                    (
                        <div>
                            <h4>Nodes similarities (objects)</h4>
                            <Similarities tab={this.props.tab} />
                        </div>
                    )
                }
            </div>
        );
    }
}

const mapStateToProps = (state: State.Root): StateFromProps => ({

});

const mapDispatchToProps = (dispatch: Dispatch<State.Root>): DispatchFromProps => ({
    handleTitleChange: (tab: ViewerTab, title: string) => {
        dispatch(updateTitle(tab, title));
    },
    handleRemoveNullPropertiesChange: (tab: ViewerTab) => {
        dispatch(toggleRemoveNullProperties(tab));
    },
    handleRemoveTabClick: (tab: ViewerTab) => {
        dispatch(removeTab(tab));
    },
    handleShowStatsBlockChange: (tab: ViewerTab) => {
        dispatch(toggleShowStatsBlock(tab));
    },
    handleShowNodesSimilaritiesBlockChange: (tab: ViewerTab) => {
        dispatch(toggleShowNodesSimilaritiesBlock(tab));
    }
});

export default connect<StateFromProps, DispatchFromProps, OwnProps>(
    mapStateToProps,
    mapDispatchToProps
)(Viewer);