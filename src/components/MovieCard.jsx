import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Container, Image } from 'styled-minimal';

import Loader from 'components/Loader';
import styled from 'styled-components';
import './style/MovieCard.scss';

import path, { getPath } from 'routes/index';
import { push } from '../modules/history';
import { setPlayVideo } from '../actions';

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

  onMovieCardClick = () => {
    const { setVideoToPlay, video } = this.props;
    setVideoToPlay(video);

    push(getPath(path.video, { id: video.id }));
  };

  render() {
    const { imageLoaded, imageLoadError } = this.state;
    const { video } = this.props;
    return (
      <div
        tabIndex={0}
        className="item"
        onKeyPress={e => {
          e.key === 'Enter' ? this.onMovieCardClick() : '';
        }}
        onClick={() => {
          this.onMovieCardClick();
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
