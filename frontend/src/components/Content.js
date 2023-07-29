import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faDeleteLeft,
  faPenToSquare,
  faRightFromBracket,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
const Content = () => {
  const location = useLocation();
  const [data, setData] = useState({});
  const [inpVal, setInpVal] = useState("");
  const [editval, seteditval] = useState("");
  const [newVal, setnewVal] = useState("");

  const dataGet = () => {
    axios
      .get(`/users/content/${location.state.someData._id}`)
      .then((res) => setData(res.data));
  };

  useEffect(() => {
    if (location.state.someData) {
      dataGet();
    }
  }, []);

  const editing = (it) => {
    seteditval(it);
  };

  const edit = (e, it) => {
    e.preventDefault();
    data.todos.map((item, index) => {
      if (it === item) {
        data.todos[index] = newVal;
        axios.patch(`users/edit/${data._id}`, data).then((res) => {
          if (res.data.message !== undefined) {
            alert(res.data.message);
          } else {
            setData({});
            dataGet();
          }
        });
      }
      return data;
    });
  };

  const deletee = (it) => {
    console.log(it);
    data.todos.map((item, index) => {
      if (it === item) {
        data.todos.splice(index, 1);
        axios.patch(`users/delete/${data._id}`, data).then((res) => {
          if (res.data.message !== undefined) {
            alert(res.data.message);
          } else {
            dataGet();
          }
        });
        return data;
      }
    });
  };

  const add = (e) => {
    e.preventDefault();
    console.log(inpVal);
    data.todos.push(inpVal);
    axios.patch(`users/add/${data._id}`, data).then((res) => {
      if (res.data.message !== undefined) {
        alert(res.data.message);
      } else {
        dataGet();
      }
    });
    setInpVal("");
  };

  return (
    <div>
      <div className="container-fluid header">
        <div className="row">
          <div className="col-lg-3 logo">
            <h1>Task List</h1>
          </div>
          <div className="col-lg-5"></div>
          <div className="col-lg-4 userInfo">
            <p>{data.username}</p>
            <Link onClick={() => setData({})} to={"/"}>
              <FontAwesomeIcon icon={faRightFromBracket} />
              Log out
            </Link>
          </div>
        </div>
      </div>
      <div className="container taskCont">
        <div className="row">
          <div className="col-lg-12 taskContLG">
            <form className="firstForm" onSubmit={add}>
              <input
                onChange={(e) => setInpVal(e.target.value)}
                type="text"
                value={inpVal}
                placeholder="Enter new Todo"
              />
              <button type="submit">Add</button>
            </form>
            {data.todos ? (
              data.todos.map((item) =>
                item !== editval ? (
                  <div className="row togh">
                    <div className="col-lg-10">
                      <p>{item}</p>
                    </div>
                    <div className="col-lg-1 ">
                      <button className="editbut" onClick={() => editing(item)}>
                        <FontAwesomeIcon icon={faPenToSquare} />
                        Edit
                      </button>
                    </div>
                    <div className="col-lg-1">
                      <button className="delbut" onClick={() => deletee(item)}>
                        Delete
                        <FontAwesomeIcon icon={faDeleteLeft} />
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={(e) => edit(e, item)}>
                    <div className="row togh">
                      <div className="col-lg-10">
                        <input
                          type="text"
                          defaultValue={item}
                          onChange={(e) => setnewVal(e.target.value)}
                        />
                      </div>
                      <div className="col-lg-1">
                        <button className="subbut" type="submit">
                          <FontAwesomeIcon icon={faCheck} />
                          Submit
                        </button>
                      </div>
                      <div className="col-lg-1">
                        <button
                          className="cancelbut"
                          onClick={() => seteditval("")}
                        >
                          Cancel
                          <FontAwesomeIcon icon={faXmark} />
                        </button>
                      </div>
                    </div>
                  </form>
                )
              )
            ) : (
              <div class="loader">
                Loading
                <span></span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;
