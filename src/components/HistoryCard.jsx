import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Image } from 'styled-minimal';

import Loader from 'components/Loader';
import styled from 'styled-components';
import './style/HistoryCard.scss';

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

class HistoryCard extends React.PureComponent {
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

  onHistoryCardClick = () => {
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
        className="history-card-wrapper"
        onKeyPress={e => {
          e.key === 'Enter' ? this.onHistoryCardClick() : '';
        }}
        onClick={() => {
          this.onHistoryCardClick();
        }}
      >
        <div className="history-card-left-container">
          <div className="history-card-img-container">
            {imageLoaded || !video.images[0].url ? null : (
              <div className="history-card-loader-container">
                <Loader block />
              </div>
            )}
            {video.images[0].url && !imageLoadError ? (
              <Image
                className="history-card-img"
                src={video.images[0].url}
                alt={video.title}
                onLoad={() => this.setState({ imageLoaded: true })}
                onError={() => this.setState({ imageLoaded: true, imageLoadError: true })}
              />
            ) : (
              <div className="no-img-container">
                <span>{video.title}</span>
              </div>
            )}
          </div>
        </div>
        <div className="history-card-right-container">
          <p className="movie-title">{video.title}</p>
          <p className="movie-description">{video.description}</p>
          <div className="movie-category-container">
            {video.categories.map((item, index) => (
              <span className="movie-category" key={index}>
                {item.title}
              </span>
            ))}
          </div>
        </div>
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
)(HistoryCard);
