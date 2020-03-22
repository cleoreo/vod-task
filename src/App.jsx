import { hot } from 'react-hot-loader/root';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Router, Switch } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import styled, { ThemeProvider } from 'styled-components';

import history from 'modules/history';
import theme, { headerHeight } from 'modules/theme';
import { utils } from 'styled-minimal';

import config from 'config';

import Home from 'routes/Home';
import Test from 'routes/Test';
import Private from 'routes/Private';
import NotFound from 'routes/NotFound';

import Header from 'components/Header';
import SystemAlerts from 'components/SystemAlerts';

import Footer from 'components/Footer';
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
  padding: ${utils.px(headerHeight)} 0 0;
`;

export class App extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
  };

  render() {
    const { dispatch, user } = this.props;

    return (
      <Router history={history}>
        <ThemeProvider theme={theme}>
          <AppWrapper>
            <Helmet
              defer={false}
              htmlAttributes={{ lang: 'pt-br' }}
              encodeSpecialCharacters={true}
              defaultTitle={config.name}
              titleTemplate={`%s | ${config.name}`}
              titleAttributes={{ itemprop: 'name', lang: 'pt-br' }}
            />
            <Header dispatch={dispatch} user={user} />
            <Main>
              <Switch>
                <Route exact path={path.home} component={Home} />
                <Route exact path={path.history} component={Test} />
                <Route path={path.private} component={Private} />
                <Route component={NotFound} />
              </Switch>
            </Main>
            <Footer />
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
  return {
    user: state.user,
  };
}

export default hot(connect(mapStateToProps)(App));
