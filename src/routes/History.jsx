import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
// styles
import styled from 'styled-components';
import './styles/Home.scss';
// components
import { Button, Container, utils } from 'styled-minimal';
import VideoPlayer from 'react-video-js-player';
import VideoCarousel from 'components/VideoCarousel';
// routes

const { spacer } = utils;

const HomeContainer = styled(Container)`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
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

export class History extends React.PureComponent {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    videoToPlay: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  handleClickCreate = () => {
    // push(path.private);
    // console.log(this.owlCarousal);
    // this.owlCarousal.create();
    this.videoPlayer.requestFullscreen();
  };

  handleClickDestroy = () => {
    // push(path.private);
    console.log(this.owlCarousal);
    this.owlCarousal.destory();
  };

  onPlayerReady = player => {
    console.log('Player is ready: ', player);
    this.videoPlayer = player;
  };

  render() {
    const { videoToPlay } = this.props;
    return (
      <HomeContainer key="Home" data-testid="HomeWrapper" verticalPadding>
        {videoToPlay ? (
          <VideoPlayer
            controls={true}
            preload="auto"
            src={videoToPlay.contents[0].url}
            width={videoToPlay.contents[0].width}
            height={videoToPlay.contents[0].height}
            onReady={this.onPlayerReady}
          />
        ) : null}
        <VideoCarousel />
        <Button onClick={this.handleClickCreate}>Play</Button>
      </HomeContainer>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    videoToPlay: state.video.videoPlaying,
  };
}

export default connect(mapStateToProps)(History);
