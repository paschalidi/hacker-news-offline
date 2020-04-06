import React from "react";
import { Col, Row, H2 } from "@the-simple/web-components";
import LatestItemsList from "./LatestItemsList";

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Row textAlign="center">
          <Col>
            <H2>The last 10 actions on Hacker News</H2>
          </Col>
        </Row>
        <Row position="center">
          <Col lg={8}>
            <LatestItemsList />;
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default App;
