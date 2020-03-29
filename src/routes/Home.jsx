import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
// styles
import styled from 'styled-components';
import './styles/Home.scss';

// components
import Header from 'components/Header';
import { Container } from 'styled-minimal';
import VideoCarousel from 'components/VideoCarousel';

const HomeContainer = styled(Container)`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  min-height: 100vh;
`;

const CarouselWrapper = styled.div`
  width: 100%;
  padding: 70px 0 0 0;
`;

class Home extends React.PureComponent {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div key="Home" data-testid="HomeWrapper">
        <Header />
        <HomeContainer verticalPadding>
          <CarouselWrapper>
            <VideoCarousel />
          </CarouselWrapper>
        </HomeContainer>
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(Home);
