import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Similarities from './Similarities';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const viewerTab = {
    key: 'test.json',
    title: 'test.json',
    originalJson: '{}',
    isObject: false,
    isArray: false,
    nodes: [],
    settings: {
      removeNullProperties: false,
      showStatsBlock: false,
      showNodesSimilaritiesBlock: false
    }
  };

  ReactDOM.render(<Similarities tab={viewerTab} />, div);
});