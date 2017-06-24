import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as React from 'react';

import * as State from '../state';

import { addTab } from '../actions/content';

import * as Dropzone from 'react-dropzone';
import { Icon, message } from 'antd';

interface OwnProps {

}

interface StateFromProps {

}

interface DispatchFromProps {
    handleAddTab(newKey: string, json: string): void;
}

interface OwnState {
    isDragActive: boolean;
    isLoading: boolean;
}

class ImportFile extends React.Component<OwnProps & StateFromProps & DispatchFromProps, OwnState> {
    constructor() {
        super();

        this.state = {
            isDragActive: false,
            isLoading: false
        };
    }

    readFromBase64 = (file: File, callback: (result: string) => void) => {
        const reader = new FileReader();

        reader.onloadend = () => {
            const base64Result = reader.result;
            const json = atob(base64Result.split(',')[1]);

            callback(json);
        };

        reader.readAsDataURL(file);
    }

    handleDrop = (files: File[]) => {
        this.setState({
            isDragActive: false,
            isLoading: true
        });

        if (files.length > 0) {
            files.map(file => {
                // TODO : handle error
                this.readFromBase64(file, (result: string) => {
                    message.success(`${file.name} file uploaded successfully.`);
                    this.props.handleAddTab(file.name, result);

                    this.setState({
                        isLoading: false
                    });
                });
            });
        }
    }

    handleDragEnter = () => {
        this.setState({
            isDragActive: true
        });
    }
    handleDragLeave = () => {
        this.setState({
            isDragActive: false
        });
    }

    render() {
        return (
            <Dropzone
                name="file"
                accept=".json"
                multiple={false}
                onDrop={this.handleDrop}
                onDragEnter={this.handleDragEnter}
                onDragLeave={this.handleDragLeave}
                className={'ant-upload ant-upload-drag' + (this.state.isDragActive ? ' ant-upload-drag-hover' : '')}
                style={{ padding: 20 }}>
                <div>
                    <p className="ant-upload-drag-icon">
                        <Icon type={this.state.isLoading ? 'loading' : 'link'} />
                    </p>
                    <p className="ant-upload-text">
                        Click or drag your JSON file to this area
                    </p>
                </div>
            </Dropzone>
        );
    }
}

const mapStateToProps = (state: State.Root): StateFromProps => ({

});

const mapDispatchToProps = (dispatch: Dispatch<State.Root>): DispatchFromProps => ({
    handleAddTab: (filename: string, json: string) => {
        dispatch(addTab(filename, json));
    }
});

export default connect<StateFromProps, DispatchFromProps, OwnProps>(
    mapStateToProps,
    mapDispatchToProps
)(ImportFile);