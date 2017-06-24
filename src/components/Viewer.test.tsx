import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Viewer from './Viewer';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const tab = {
    key: 'Sample 1',
    title: 'Sample 1',
    originalJson: '{ "content": "Content of the sample", "other": "Hello World!" }',
    isObject: true,
    isArray: false,
    nodes: [
      {
        isOpened: false,
        isObject: false,
        isArray: false,
        property: 'content',
        value: 'Content of the sample'
      },
      {
        isOpened: false,
        isObject: false,
        isArray: false,
        property: 'other',
        value: 'Hello World!'
      }
    ],
    settings: {
      removeNullProperties: false
    }
  };

  ReactDOM.render(<Viewer tab={tab} />, div);
});
