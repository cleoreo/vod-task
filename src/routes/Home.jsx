import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { Button, Container, Text, utils } from 'styled-minimal';
import Background from 'components/Background';
import Icon from 'components/Icon';
import history from '../modules/history';
import path from './index';

const { spacer } = utils;

const HomeContainer = styled(Container)`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 100vh;
`;

const Header = styled.div`
  margin-bottom: ${spacer(3)};
  text-align: center;

  svg {
    height: 10rem;
    width: auto;

    ${/* sc-custom '@media-query' */ utils.responsive({
      lg: `
        height: 15rem;
     `,
    })};
  }
`;

const Heading = styled.h1`
  color: #fff;
  font-size: 3.5rem;
  line-height: 1.4;
  margin-bottom: ${spacer(3)};
  margin-top: 0;
  text-align: center;

  ${/* sc-custom '@media-query' */ utils.responsive({
    lg: `
      font-size: 4rem;
    `,
  })};
`;

export class Home extends React.PureComponent {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }),
    user: PropTypes.object.isRequired,
  };

  handleClickLogin = () => {
    history.push(path.private);
    // this.props.history.push(path.private);
  };

  render() {
    const { user } = this.props;

    return (
      <HomeContainer key="Home" data-testid="HomeWrapper" verticalPadding>

        <Button
          animate={user.status === 'running'}
          onClick={this.handleClickLogin}
          size="xl"
          textTransform="uppercase"
          data-testid="Login"
        >
          <Text ml={2}>Start</Text>
        </Button>
      </HomeContainer>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return { user: state.user };
}

export default connect(mapStateToProps)(Home);
