import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
// components
import MovieCard from 'components/MovieCard';
import OwlCarousel from 'react-owl-carousel';
// style
import { Link, theme, utils } from 'styled-minimal';
import { appColor } from 'modules/theme';
// action
import { getVideoList } from '../actions';

const { responsive, spacer } = utils;
const { grays } = theme;

const GitHubGrid = styled.ul`
  display: grid;
  grid-auto-flow: row;
  grid-gap: ${spacer(2)};
  grid-template-columns: 100%;
  list-style: none;
  margin: ${spacer(4)} auto 0;
  padding: 0;
  /* stylelint-disable */
  ${/* istanbul ignore next */ p =>
    responsive({
      ix: `
        grid-gap: ${spacer(3)(p)};
        width: 90%;
      `,
      md: `
        grid-template-columns: repeat(2, 1fr);
        width: 100%;
      `,
      lg: `
        grid-template-columns: repeat(3, 1fr);
      `,
      xl: `
        grid-gap: ${spacer(4)(p)};
        grid-template-columns: repeat(4, 1fr);
      `,
    })};
  /* stylelint-enable */

  > li {
    display: flex;
  }
`;

const Item = styled(Link)`
  align-items: center;
  border: solid 0.1rem ${appColor};
  border-radius: 0.4rem;
  overflow: hidden;
  padding: ${spacer(3)};
  text-align: center;
  width: 100%;
  /* stylelint-disable */
  ${/* istanbul ignore next */ p =>
    responsive({
      md: `
        padding: ${spacer(3)(p)};
      `,
      lg: `
        padding: ${spacer(4)(p)};
      `,
    })};
  /* stylelint-enable */

  p {
    color: #000;
  }

  img {
    height: 8rem;
    margin-bottom: ${spacer(2)};
  }
`;

const ItemHeader = styled.div`
  margin-bottom: ${spacer(3)};

  small {
    color: ${grays.gray60};
  }
`;

export class VideoCarousel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      videoList: props.videoList,
      width: window.innerWidth,
      height: window.innerHeight,
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

    console.log('width: ', width);
    console.log('height: ', height);
    this.setState({ width, height });
  };

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
    const { videoList } = this.props;
    return (
      <OwlCarousel
        key="VideoCarousel"
        data-testid="VideoCarouselWrapper"
        className="owl-theme"
        loop
        margin={5}
        nav
        ref={el => {
          this.owlCarousal = el;
        }}
      >
        {videoList.success
          ? videoList.data.entries.map((item, index) => <MovieCard key={index} video={item} />)
          : null}
      </OwlCarousel>
    );
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
