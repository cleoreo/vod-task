import React from 'react';
import styled from 'styled-components';

import { Container, Image, utils } from 'styled-minimal';
import Loader from 'components/Loader';

import './style/MovieCard.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setPlayVideo } from '../actions';

const { spacer } = utils;

const CardImage = styled(Image)`
  align-items: center;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  font-size: 2rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;
const NoImageContainer = styled(Container)`
  position: absolute;
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.6);
`;

const NoImageText = styled.span`
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  color: white;
  font-size: 2rem;
`;

const LoaderWrapper = styled(Container)`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.6);
`;

class MovieCard extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      imageLoaded: false,
      imageLoadError: false,
    };
  }

  static propTypes = {
    setVideoToPlay: PropTypes.func.isRequired,
    video: PropTypes.object.isRequired,
  };

  render() {
    const { imageLoaded, imageLoadError } = this.state;
    const { setVideoToPlay, video } = this.props;
    return (
      <div
        tabIndex="0"
        className="item"
        onKeyPress={(e) => { e.key === "Enter" ? setVideoToPlay(video) : '' }}
        onClick={() => {
          setVideoToPlay(video);
        }}
      >
        {imageLoaded || !video.images[0].url ? null : (
          <LoaderWrapper>
            <Loader block />
          </LoaderWrapper>
        )}
        {video.images[0].url && !imageLoadError ? (
          <CardImage
            src={video.images[0].url}
            alt={video.title}
            onLoad={() => this.setState({ imageLoaded: true })}
            onError={() => this.setState({ imageLoaded: true, imageLoadError: true })}
          />
        ) : (
          <NoImageContainer>
            <NoImageText>{video.title}</NoImageText>
          </NoImageContainer>
        )}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setVideoToPlay: video => dispatch(setPlayVideo(video)),
});

export default connect(
  null,
  mapDispatchToProps,
)(MovieCard);
