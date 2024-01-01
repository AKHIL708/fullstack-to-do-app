import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import "./todoApplication.scss";
import { useNavigate, useParams } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60vw",
  bgcolor: "background.paper",
  border: "unset",
  boxShadow: 24,
  p: 1,
};
function TodoApplication() {
  const navigate = useNavigate();
  const { userId } = useParams();
  // modal handling
  const [open, setOpen] = useState(false);
  const [modalData, setModalData] = useState("");
  const [modalId, setModalId] = useState("");
  const handleOpen = (data, id) => {
    setOpen(true);
    setModalData(data);
    setModalId(id);
    console.log(data, id);
  };
  const handleClose = () => setOpen(false);

  let createDate = new Date().toString().substring(0, 15);

  const [inputVal, setInputVal] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [toDoListData, setTodoListData] = useState([]);

  const getTodoData = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      userId,
    });
    const requestOptions = {
      headers: myHeaders,
      body: raw,
      method: "POST",
      redirect: "follow",
    };
    const response = await fetch(
      "http://localhost:5000/todoList",
      requestOptions
    );
    const data = await response.json();
    setTodoListData(data);
    console.log(data);
  };
  const addData = async () => {
    if (inputVal.length == 0) {
      return window.alert("Invalid DATA !");
    }
    setInputVal("");
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      userId: userId,
      id: Date.now(),
      createdAt: createDate,
      data: inputVal,
      type: "pending",
    });
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    const response = await fetch(
      "http://localhost:5000/todoList/add",
      requestOptions
    );
    const data = await response.json();
    if (data) {
      getTodoData();
    }
    console.log(data);
  };
  const deleteData = async (id) => {
    // console.log(id)
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      id: id,
    });
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    const response = await fetch(
      "http://localhost:5000/todoList/delete",
      requestOptions
    );
    const data = await response.json();
    console.log(data);
    if (data) {
      getTodoData();
    }
  };

  const filterData = async (type, id) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      userId: userId,
      type: type,
    });
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    const response = await fetch(
      "http://localhost:5000/todoList/filter",
      requestOptions
    );
    const data = await response.json();
    console.log(data);
    setTodoListData(data);
  };

  const updateTodoStatus = async (id, type) => {
    // console.log("received id : ", id);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
      id: id,
      type: type,
    });
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    const response = await fetch(
      "http://localhost:5000/todoList/updateStatus",
      requestOptions
    );
    const data = await response.json();
    console.log(data);
    if (data) {
      getTodoData();
      setActiveFilter("All");
    }
  };

  const updateTodoData = async (id, modalData) => {
    console.log("received id : ", id, modalData);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
      id: id,
      data: modalData,
    });
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    const response = await fetch(
      "http://localhost:5000/todoList/updateData",
      requestOptions
    );
    const data = await response.json();
    console.log(data);
    if (data) {
      getTodoData();
      handleClose();
      setActiveFilter("All");
    }
  };

  useEffect(() => {
    getTodoData();
  }, []);

  return (
    <>
      <section className="to-do-container">
        <div className="header">
          <h1> To Do Application</h1>
          {/* <h1>userName</h1> */}
          <button
            onClick={() => {
              localStorage.clear();
              navigate("/login");
            }}
          >
            Log Out
          </button>
        </div>
        <div className="to-do-addition">
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
          />
          <div className="add-icon">
            <AddIcon className="icon" onClick={() => addData()} />
          </div>
        </div>
        <div className="filters">
          <div
            className="box"
            onClick={() => {
              getTodoData();
              setActiveFilter("All");
            }}
          >
            <p className={`${activeFilter == "All" ? "active" : ""}`}>All</p>
          </div>
          <div
            className="box"
            onClick={() => {
              filterData("pending");
              setActiveFilter("pending");
            }}
          >
            <p className={`${activeFilter == "pending" ? "active" : ""}`}>
              Pending
            </p>
          </div>
          <div
            className="box"
            onClick={() => {
              filterData("completed");
              setActiveFilter("completed");
            }}
          >
            <p className={`${activeFilter == "completed" ? "active" : ""}`}>
              Completed
            </p>
          </div>
          <div className="navigator">
            <div className="pending-color"></div>
            <p>pending</p>
          </div>
          <div className="navigator">
            <div className="completed-color"></div>
            <p>completed</p>
          </div>
        </div>
        <div className="to-do-lists">
          {toDoListData.length > 0 ? (
            <>
              {toDoListData.map((data, index) => {
                return (
                  <>
                    <div className="list" key={index}>
                      <div className="data">
                        <h2>{data.data}</h2>
                        <p>{data.createdAt}</p>
                      </div>
                      <div className="icons">
                        <div
                          className={`circle blue  ${
                            data.type == "pending" ? "pending" : ""
                          }`}
                          title="pending"
                          onClick={() => updateTodoStatus(data.id, "pending")}
                        ></div>
                        <div
                          className={`circle green ${
                            data.type == "completed" ? "completed" : ""
                          }  `}
                          title="completed"
                          onClick={() => updateTodoStatus(data.id, "completed")}
                        ></div>
                        <DeleteIcon
                          onClick={() => deleteData(data.id)}
                          className="delete-icon icon"
                          titleAccess="Delete to do "
                        />
                        <EditIcon
                          onClick={() => handleOpen(data.data, data.id)}
                          className="edit-icon icon"
                          titleAccess="Edit to do "
                        />
                      </div>
                    </div>
                  </>
                );
              })}
            </>
          ) : (
            <h1>NO Data for now </h1>
          )}
        </div>
      </section>
      {/* <section className="modal"> */}
      <Modal
        open={open}
        onClose={handleClose}
        className="modal"
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="box">
          <div className="container">
            <input
              type="text"
              value={modalData}
              onChange={(e) => setModalData(e.target.value)}
            />
            <button onClick={() => updateTodoData(modalId, modalData)}>
              Update
            </button>
          </div>
        </Box>
      </Modal>
      {/* </section> */}


      <section className="hover">
        <div className="circle">
          hover
        </div>
        <div className="hiden-section">
          <div className="section-to-show">
          <h1>Can you see me now</h1>
          </div>
        </div>
      </section>



    </>
  );
}

export default TodoApplication;
