import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as React from 'react';

import * as State from './state';

import { changeActiveTab } from './actions/content';
import { togglePane as toggleSettingsPane } from './actions/settings';

import { ViewerTab } from './models/Viewer';

import ImportFile from './components/ImportFile';
import Viewer from './components/Viewer';
import Settings from './components/Settings';

import { Layout, Tabs, Icon } from 'antd';
const { Header, Content, Footer } = Layout;
const TabPane = Tabs.TabPane;

const headerStyle = {
  zIndex: 10,
  position: 'fixed',
  width: '100%',
  color: 'white'
} as React.CSSProperties;

const settingIconStyle = {
  float: 'right',
  marginTop: '-45px',
  marginRight: '50px',
  fontSize: '26px',
  cursor: 'pointer'
} as React.CSSProperties;

const githubIconStyle = {
  float: 'right',
  marginTop: '-45px',
  fontSize: '26px',
  cursor: 'pointer'
} as React.CSSProperties;

const contentStyle = {
  height: 'calc(100vh - 114px)',
  marginTop: 64,
  marginBottom: 50,
  padding: 10
} as React.CSSProperties;

const siderSettingsStyle = {
  width: '400px',
  position: 'absolute',
  right: 0,
  top: 64,
  bottom: 50,
  backgroundColor: '#fff',
  boxShadow: '-1px 1px 10px #777',
  zIndex: 5
} as React.CSSProperties;

const footerStyle = {
  zIndex: 10,
  height: 50,
  position: 'fixed',
  width: '100%',
  textAlign: 'center',
  verticalAlign: 'middle',
  bottom: 0,
  backgroundColor: '#404040',
  color: 'white',
  padding: '16px 50px'
} as React.CSSProperties;

const footerElementStyle = {
  display: 'inline-block',
  margin: '0 2px',
  fontSize: 13,
  fontStyle: 'italic'
} as React.CSSProperties;

interface OwnProps {

}

interface StateFromProps {
  activeKey: string;
  tabs: ViewerTab[];
  isSettingsShowed: boolean;
}

interface DispatchFromProps {
  handleTabChange(activeKey: string): void;
  handleSettingsClick(): void;
}

class App extends React.Component<OwnProps & StateFromProps & DispatchFromProps, void> {
  render() {
    return (
      <Layout>
        <Header style={headerStyle}>
          <h1>Magic JSON</h1>
          <h2 style={{ display: 'none' }}>Analyse your JSON with ease</h2>

          <Icon 
            type="setting"
            style={settingIconStyle} 
            onClick={this.props.handleSettingsClick} />
          <Icon
            type="github"
            style={githubIconStyle}
            onClick={() => window.open('https://github.com/Odonno/magic-json')} />
        </Header>

        <Layout>
          <Content style={contentStyle}>
            <div style={{ margin: 20 }}>
              <ImportFile />
            </div>

            <Tabs
              activeKey={this.props.activeKey}
              onChange={this.props.handleTabChange}>
              {this.props.tabs.length > 0 && this.props.tabs.map(tab => {
                return (
                  <TabPane key={tab.key} tab={tab.title}>
                    <Viewer tab={tab} />
                  </TabPane>
                );
              })}
            </Tabs>
          </Content>

          {this.props.isSettingsShowed &&
            (
              <Layout style={siderSettingsStyle}>
                <Settings />
              </Layout>
            )
          }
        </Layout>

        <Footer style={footerStyle}>
          <div style={footerElementStyle}>It's a kind of magic</div>
        </Footer>
      </Layout>
    );
  }
}

const mapStateToProps = (state: State.Root): StateFromProps => ({
  activeKey: state.content.activeKey,
  tabs: state.content.tabs,
  isSettingsShowed: state.settings.showed
});

const mapDispatchToProps = (dispatch: Dispatch<State.Root>): DispatchFromProps => ({
  handleTabChange: (activeKey: string) => {
    dispatch(changeActiveTab(activeKey));
  },
  handleSettingsClick: () => {
    dispatch(toggleSettingsPane());
  }
});

export default connect<StateFromProps, DispatchFromProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(App);