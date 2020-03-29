import { hot } from 'react-hot-loader/root';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Router, Switch } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import styled, { ThemeProvider } from 'styled-components';

import history from 'modules/history';
import theme, { headerHeight } from 'modules/theme';


import Home from 'routes/Home';
import History from 'routes/History';
import Video from 'routes/Video';
import NotFound from 'routes/NotFound';

import SystemAlerts from 'components/SystemAlerts';

import GlobalStyles from 'components/GlobalStyles';
import path from './routes';

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  opacity: 1 !important;
  position: relative;
  transition: opacity 0.5s;
`;

const Main = styled.main`
  min-height: 100vh;
`;

export class App extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  };

  render() {
    return (
      <Router history={history}>
        <ThemeProvider theme={theme}>
          <AppWrapper>
            <Helmet
              defer={false}
              encodeSpecialCharacters={true}
              defaultTitle="Vod Task"
            />
            <Main>
              <Switch>
                <Route exact path={path.home} component={Home} />
                <Route exact path={path.history} component={History} />
                <Route exact path={path.video} component={Video} />
                <Route exact path={path.videoRoot} component={Video} />
                <Route component={NotFound} />
              </Switch>
            </Main>
            <SystemAlerts />
            <GlobalStyles />
          </AppWrapper>
        </ThemeProvider>
      </Router>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {};
}

export default hot(connect(mapStateToProps)(App));
