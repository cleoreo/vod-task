import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
// styles
import './styles/History.scss';
// components
import Header from 'components/Header';
import HistoryCard from 'components/HistoryCard';
import { Link } from 'styled-minimal';
// routes

export class History extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static propTypes = {
    videoHistory: PropTypes.array.isRequired,
  };

  render() {
    const { videoHistory } = this.props;
    return (
      <div className="history-wrapper" key="history" data-testid="HistoryContainer">
        <Header />
        <div className="history-container">
          {videoHistory.length > 0 ? (
            videoHistory.map((item, index) => <HistoryCard key={index} video={item} />)
          ) : (
            <p>No history</p>
          )}
        </div>
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    videoHistory: state.history.history,
  };
}

export default connect(mapStateToProps)(History);
