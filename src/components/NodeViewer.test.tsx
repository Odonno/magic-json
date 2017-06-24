import * as React from 'react';
import * as ReactDOM from 'react-dom';
import NodeViewer from './NodeViewer';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const viewerNode = {
    isOpened: false,
    isObject: false,
    isArray: false,
    property: 'content',
    value: 'Content of the sample'
  };

  ReactDOM.render(<NodeViewer node={viewerNode} parentSize={100} removeNullProperties={false} />, div);
});