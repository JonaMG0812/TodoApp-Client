import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import {
  Card,
  Table,
  Tag,
  Button,
  PageHeader,
  Row,
  Col,
  Form,
  Input,
  Select,
  DatePicker,
  Tooltip,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  LogoutOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import Axios from "axios";
import Moment from "moment";
import styles from "./style.module.css";

const columns = [
  {
    title: "Task Title",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status) => {
      let textTask;
      let color;
      switch (status) {
        case "toDo":
          color = "purple";
          textTask = "To Do";
          break;
        case "inProgress":
          color = "blue";
          textTask = "In Progress";
          break;
        case "complete":
          color = "green";
          textTask = "Complete";
          break;
        case "timeOut":
          color = "red";
          textTask = "Time Out";
        default:
          break;
      }
      return (
        <span>
          <Tag color={color} key={status}>
            {textTask}
          </Tag>
        </span>
      );
    },
  },
  {
    title: "Due Date",
    dataIndex: "dueDate",
    key: "dueDate",
    render: (dueDate) => Moment(dueDate).format("MMM Do YY"),
  },
  {
    title: "Action",
    key: "action",
    render: (task) => {
      return (
        <>
          <Tooltip title="Edit Task">
            <Button
              className={styles.icon}
              type="primary"
              shape="circle"
              icon={<EditOutlined />}
            />
          </Tooltip>
          <Tooltip title="Delete Task">
            <Button
              className={styles.icon}
              type="primary"
              danger
              shape="circle"
              icon={<DeleteOutlined />}
            />
          </Tooltip>
          <Tooltip className={styles.iconComplete} title="Mark as complete!">
            <Button
              type="primary"
              shape="circle"
              icon={<CheckCircleOutlined />}
            />
          </Tooltip>
        </>
      );
    },
  },
];

const TodoApp = () => {
  const headers = { Authorization: `Bearer ${auth?.user?.access_token}` };
  const [tasks, setTasks] = useState(null);
  const history = useHistory();
  const auth = useAuth();

  const signOut = () => {
    auth.signout(() => {
      history.replace("/");
    });
  };

  const createTask = async () => {
    const { values } = await Axios({
      method: "POST",
      url: "http://localhost:3000/tasks",
      headers: headers,
    });
    setTasks(values);
  };

  const getTasks = async () => {
    const { data } = await Axios({
      method: "GET",
      url: "http://localhost:3000/tasks",
      headers: headers,
    });
    setTasks(data);
  };

  useEffect(() => {
    getTasks();
    createTask();
  }, []);

  return (
    <>
      <PageHeader className={styles.sitePageHeader} title="Todo App">
        <Button
          className={styles.logOutButton}
          type="primary"
          icon={<LogoutOutlined />}
        >
          <a className={styles.signOutLink} onClick={signOut}>
            Logout
          </a>
        </Button>
      </PageHeader>
      <Row className={styles.wrapper}>
        <Col flex={2}>
          <Card
            title="Create Task"
            bordered={true}
            className={styles.cardCreateTask}
          >
            <Form name="nest-messages" onFinish={createTask} layout="vertical">
              <Form.Item
                label="Title"
                name="title"
                rules={[
                  {
                    required: true,
                    message: "Please input your task's title!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Description"
                name="description"
                rules={[
                  {
                    required: true,
                    message: "Please input your task's description!",
                  },
                ]}
              >
                <Input.TextArea className={styles.textArea} />
              </Form.Item>
              <Form.Item
                label="Status"
                name="status"
                rules={[
                  {
                    required: true,
                    message: "Please select a task's status!",
                  },
                ]}
              >
                <Select>
                  <Select.Option value="toDo">To Do</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item
                label="Due Date"
                name="dueDate"
                rules={[
                  {
                    required: true,
                    message: "Please select a due date!",
                  },
                ]}
              >
                <DatePicker className={styles.datePicker} />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className={styles.createTaskButton}
                >
                  Create Task
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
        <Col flex={3}>
          <Table columns={columns} dataSource={tasks} />
        </Col>
      </Row>
    </>
  );
};
export default TodoApp;
