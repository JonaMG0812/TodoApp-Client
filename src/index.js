import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import LoginClient from "./LoginClient";
import reportWebVitals from "./reportWebVitals";
import { Row, Col } from "antd";

ReactDOM.render(
  <React.StrictMode>
    <div className="login-bg-color"></div>
    <Row type="flex" justify="center" align="middle">
      <Col xs={20} sm={16} md={12} lg={8} xl={6}>
        <LoginClient />
      </Col>
    </Row>
  </React.StrictMode>,
  document.getElementById("root")
);
reportWebVitals();
