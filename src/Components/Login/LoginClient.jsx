import React from "react";
import { useHistory, useLocation, Link } from "react-router-dom";
import { Form, Input, Button, Card, Row, Col } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import useAuth from "../../Hooks/useAuth";
import home from "../../assets/home.png";
import styles from "./style.module.css";

const LoginClient = () => {
  const history = useHistory();
  const location = useLocation();
  const auth = useAuth();
  const { from } = location.state ?? { from: { pathname: "/todo-app" } };

  const onFinish = ({ username, password }) => {
    auth.signin(username, password, () => {
      history.replace(from);
    });
  };

  return (
    <>
      <div className={styles.loginBgColor}></div>
      <Row type="flex" justify="center" align="middle">
        <Col xs={20} sm={16} md={12} lg={8} xl={6}>
          <Card className={styles.loginCard}>
            <img src={home} className={styles.homeLogo} alt="logo" />
            <h1>Log In</h1>
            <Form name="login" className={styles.loginForm} onFinish={onFinish}>
              <Form.Item
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Please input your Username!",
                  },
                ]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Username"
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your Password!",
                  },
                ]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className={styles.loginFormButton}
                >
                  Log in
                </Button>
                <Link to="/signup">
                  <Button type="primary" className={styles.loginFormButton}>
                    Signup
                  </Button>
                </Link>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default LoginClient;
