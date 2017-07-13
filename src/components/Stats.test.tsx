import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Stats from './Stats';

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

  ReactDOM.render(<Stats tab={viewerTab} />, div);
});