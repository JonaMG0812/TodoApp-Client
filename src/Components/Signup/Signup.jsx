import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Form, Input, Button, Card, Row, Col } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import home from "../../assets/home.png";
import styles from "../Login/style.module.css";
import Axios from "axios";

const Signup = () => {
  const regUser = (values) => {
    console.log("Received values of form: ", values);
  };

  return (
    <>
      <div className={styles.loginBgColor}></div>
      <Row type="flex" justify="center" align="middle">
        <Col xs={20} sm={16} md={12} lg={8} xl={6}>
          <Card className={styles.loginCard}>
            <img src={home} className={styles.homeLogo} alt="logo" />
            <h1>Log In</h1>
            <Form
              name="normal_login"
              className="login-form"
              initialValues={{ remember: true }}
              onFinish={regUser}
            >
              <Form.Item
                name="username"
                rules={[
                  { required: true, message: "Please input your Username!" },
                ]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Username"
                />
              </Form.Item>

              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "Please input your Email!" },
                ]}
              >
                <Input
                  prefix={<MailOutlined className="site-form-item-icon" />}
                  type="email"
                  placeholder="email"
                />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your Password!" },
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
                  className={styles.regFormButton}
                >
                  Register
                </Button>
                <p className={styles.pOr}>Or</p>
                <Link to="/">
                  <p className={styles.linkBackTo}>Back to Login!</p>
                </Link>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Signup;
