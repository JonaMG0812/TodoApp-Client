import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import { Table, Tag, Button } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
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
          <Button
            className={styles.icon}
            type="primary"
            shape="circle"
            icon={<EditOutlined />}
          />
          <Button
            type="primary"
            danger
            shape="circle"
            icon={<DeleteOutlined />}
          />
        </>
      );
    },
  },
];

const TodoApp = () => {
  const [tasks, setTasks] = useState(null);
  const history = useHistory();
  const auth = useAuth();

  const signOut = () => {
    auth.signout(() => {
      history.replace("/");
    });
  };

  const getTasks = async () => {
    const { data } = await Axios({
      method: "GET",
      url: "http://localhost:3000/tasks",
      headers: { Authorization: `Bearer ${auth?.user?.access_token}` },
    });
    setTasks(data);
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <>
      <a onClick={signOut}> Logout </a>
      <div>
        <Table columns={columns} dataSource={tasks} />
      </div>
    </>
  );
};
export default TodoApp;
