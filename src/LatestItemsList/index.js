import React from "react";
import { connect } from "react-redux";
import * as actions from "./actions";

class LatestItemsList extends React.Component {
  componentDidMount() {
    if (navigator.onLine) {
      const { fetchLatestItems } = this.props;
      fetchLatestItems();
    }
  }

  render() {
    const { latestItems, stage } = this.props;
    return (
      <div>
        {latestItems
          ? latestItems.map(({ by, id, time }) => {
              return (
                <div key={id} style={{ paddingTop: 12 }}>
                  <div>by: {by}</div>
                  <div>time: {time}</div>
                </div>
              );
            })
          : null}
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchLatestItems: () =>
      dispatch({
        type: actions.FETCH_LATEST,
      }),
  };
}

function mapStateToProps({ latestItemsReducer: { latestItems, stage } }) {
  return { latestItems, stage };
}

export default connect(mapStateToProps, mapDispatchToProps)(LatestItemsList);
