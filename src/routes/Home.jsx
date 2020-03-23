import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
// styles
import styled from 'styled-components';
import './styles/home.scss';
// components
import { Button, Container, Text, utils } from 'styled-minimal';
import OwlCarousel from 'react-owl-carousel';
import VideoPlayer from 'react-video-js-player';
// routes
import path from './index';
import history from '../modules/history';

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

  constructor(props) {
    super(props);
    this.state = {
      video: {
        src: 'https://www.sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
      },
    };
  }

  render() {
    const { user } = this.props;
    const { video } = this.state;
    return (
      <HomeContainer key="Home" data-testid="HomeWrapper" verticalPadding>
        <VideoPlayer controls={true} preload="auto" src={video.src} width="720" height="420" />
        <OwlCarousel className="owl-theme" loop margin={10} nav>
          <div className="item">
            <h4>1</h4>
          </div>
          <div className="item">
            <h4>2</h4>
          </div>
          <div className="item">
            <h4>3</h4>
          </div>
          <div className="item">
            <h4>4</h4>
          </div>
          <div className="item">
            <h4>5</h4>
          </div>
          <div className="item">
            <h4>6</h4>
          </div>
          <div className="item">
            <h4>7</h4>
          </div>
          <div className="item">
            <h4>8</h4>
          </div>
          <div className="item">
            <h4>9</h4>
          </div>
          <div className="item">
            <h4>10</h4>
          </div>
          <div className="item">
            <h4>11</h4>
          </div>
          <div className="item">
            <h4>12</h4>
          </div>
        </OwlCarousel>
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
