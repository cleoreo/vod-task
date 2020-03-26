import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
// styles
import styled from 'styled-components';
import './styles/home.scss';
// components
import { Button, Container, Text, utils } from 'styled-minimal';
import VideoPlayer from 'react-video-js-player';
import VideoCarousel from 'components/VideoCarousel';
// routes

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
    videoToPlay: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
      video: {
        src: 'https://www.sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
      },
    };
  }

  handleClickCreate = () => {
    // push(path.private);
    console.log(this.owlCarousal);
    this.owlCarousal.create();
  };

  handleClickDestroy = () => {
    // push(path.private);
    console.log(this.owlCarousal);
    this.owlCarousal.destory();
  };

  render() {
    const { video } = this.state;
    const { videoToPlay } = this.props;
    return (
      <HomeContainer key="Home" data-testid="HomeWrapper" verticalPadding>
        {videoToPlay ? (
          <VideoPlayer
            controls={true}
            preload="auto"
            src={videoToPlay.contents[0].url}
            width="720"
            height="420"
          />
        ) : null}
        <VideoCarousel />
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

export default connect(mapStateToProps)(Home);
