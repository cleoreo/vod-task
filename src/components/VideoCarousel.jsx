import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// components
import MovieCard from 'components/MovieCard';
import OwlCarousel from 'react-owl-carousel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
// style
import './style/VideoCarousel.scss';
import settings from 'modules/theme';
// action
import { getVideoList } from '../actions';

export class VideoCarousel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      videoList: props.videoList,
      width: window.innerWidth,
      height: window.innerHeight,
      responsive: {
        [settings.breakpoints.md]: {
          items: 4,
        },
        [settings.breakpoints.lg]: {
          items: 5,
        },
        [settings.breakpoints.xl]: {
          items: 6,
        },
      },
    };
    props.getVideoList();
  }

  static propTypes = {
    getVideoList: PropTypes.func.isRequired,
    videoList: PropTypes.object.isRequired,
  };

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener('resize', this.updateDimensions);
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
  };

  render() {
    const { videoList } = this.props;
    const { responsive, width } = this.state;
    let content = <FontAwesomeIcon icon={faSpinner} spin />;
    if (videoList.success) {
      const items = videoList.data.entries.map((item, index) => (
        <MovieCard key={index} video={item} />
      ));
      if (width >= 768) {
        content = (
          <OwlCarousel
            key="VideoCarousel"
            data-testid="VideoCarouselWrapper"
            className="owl-theme"
            loop={false}
            margin={10}
            nav={false}
            lazyLoad={true}
            responsive={responsive}
          >
            {items}
          </OwlCarousel>
        );
      } else {
        content = <div className="movies-container">{items}</div>;
      }
    }
    return content;
  }
}
/* istanbul ignore next */
function mapStateToProps(state) {
  return { videoList: state.video.videoList };
}

const mapDispatchToProps = dispatch => ({
  getVideoList: () => dispatch(getVideoList()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(VideoCarousel);
