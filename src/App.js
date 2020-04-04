import React from "react";
import { Col, Row, H2, H3 } from "@the-simple/web-components";
import { set, get } from "idb-keyval";

class App extends React.Component {
  state = { stage: "LOADING", latestItems: [] };

  async componentDidMount() {
    if (!navigator.onLine) {
      const latestItems = await get("latestItems");
      if (latestItems) {
        this.setState({ stage: "READY", latestItems });
        return;
      }
      this.setState({ stage: "OFFLINE" });
      return;
    }

    const latestItems = await this.fetechItems();
    await set("latestItems", latestItems);
    this.setState({ stage: "READY", latestItems });
  }

  fetechItems = async () => {
    const response = await fetch(
      `https://hacker-news.firebaseio.com/v0/maxitem.json`
    );
    let lastHackerNewsId = await response.json();
    let ids = Array.from({ length: 10 }, (_, i) => lastHackerNewsId - i);

    const latestItems = await Promise.all(
      ids.map(async (item) => {
        const response = await fetch(
          `https://hacker-news.firebaseio.com/v0/item/${item}.json`
        );
        const lastAction = await response.json();
        return lastAction;
      })
    );
    return latestItems;
  };

  render() {
    const { stage, latestItems } = this.state;
    return (
      <React.Fragment>
        <Row textAlign="center">
          <Col>
            <H2>The last 10 actions on Hacker News</H2>
          </Col>
        </Row>
        <Row position="center">
          <Col lg={8}>
            {(() => {
              switch (stage) {
                case "READY":
                  return (
                    <div>
                      {latestItems.map(({ by, id, time }) => {
                        return (
                          <div key={id} style={{ paddingTop: 12 }}>
                            <div>by: {by}</div>
                            <div>time: {time}</div>
                          </div>
                        );
                      })}
                    </div>
                  );
                case "OFFLINE":
                  return <H3>OFFLINE..</H3>;
                case "LOADING":
                default:
                  return <H3>Loading..</H3>;
              }
            })()}
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default App;
