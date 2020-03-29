import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

// style
import './styles/Video.scss';
// redux
import { getVideoList, setPlayVideo } from 'actions';

// components
import VideoPlayer from 'react-video-js-player';
import { Button } from 'styled-minimal';

// routes
import path from 'routes/index';
import history, { push, goBack } from '../modules/history';

class Video extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      width: window.innerWidth,
      height: window.innerHeight,
      video: props.videoToPlay,
    };

    if (!props.videoToPlay || !props.videoList.success) {
      props.getVideoList();
    }

    if (!props.match.params.id) {
      push(path.home);
    }
  }

  static propTypes = {
    getVideoList: PropTypes.func,
    match: PropTypes.object.isRequired,
    setVideoToPlay: PropTypes.func,
    videoList: PropTypes.object,
    videoToPlay: PropTypes.object,
  };

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener('resize', this.updateDimensions);
  }

  static getDerivedStateFromProps(props) {
    if (props.videoList.success) {
      const { match, videoList, setVideoToPlay } = props;
      const { id } = match.params;
      const list = videoList.data.entries;
      const video = list.find(o => o.id === id);
      setVideoToPlay(video);
      return { video };
    }
    return null;
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  updateDimensions = () => {
    const w = window;
    const d = document;
    const { documentElement } = d;
    const body = d.getElementsByTagName('body')[0];
    const width = w.innerWidth || documentElement.clientWidth || body.clientWidth;
    const height = w.innerHeight || documentElement.clientHeight || body.clientHeight;

    this.setState({ width, height });

    if (this.videoPlayer) {
      this.videoPlayer.width(width);
      this.videoPlayer.height(height);
    }
  };

  onPlayerReady = player => {
    this.videoPlayer = player;
  };

  onVideoEnd = () => {
    if (history.action === 'POP') {
      push(path.home);
    } else {
      goBack();
    }
  };

  render() {
    const { width, height, video } = this.state;
    return (
      <div className="video-wrapper" key="Video" data-testid="VideoWrapper">
        <Button className="video-go-back-btn" onClick={this.onVideoEnd} size="xl">
          <span ml={2}>Go back</span>
        </Button>
        {video ? (
          <VideoPlayer
            controls={true}
            preload="auto"
            src={video.contents[0].url}
            width={width}
            height={height}
            onReady={this.onPlayerReady}
            onEnd={this.onVideoEnd}
          />
        ) : null}
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    videoToPlay: state.video.videoPlaying,
    videoList: state.video.videoList,
  };
}

const mapDispatchToProps = dispatch => ({
  getVideoList: () => dispatch(getVideoList()),
  setVideoToPlay: video => dispatch(setPlayVideo(video)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Video);
