import "./App.css";
import "./crud.scss";
import "./Bootstrap.css";
import axios from "axios";
import Header from "./Components/Header";
import Create from "./Components/Create";
import View from "./Components/View";
import Modal from "./Components/Modal";
import { useEffect, useReducer, useState } from "react";
import addReducer from "./Reducers/addReducer";
function App() {
  // const [create, setCreate] = useState(null);
  const [create, dispatchCreate] = useReducer(addReducer, null);
  const [getInfo, setGetInfo] = useState([]);
  const [updateTime, setUpdateTime] = useState(Date.now());
  const [showModal, setShowModal] = useState({ id: 0 });
  // const [editItem, setEditItem] = useState(null);
  const [editItem, dispatchUpdate] = useReducer(addReducer, null);
  console.log(editItem);

  function item(id) {
    const item = getInfo.filter((el) => el.id === id);
    return item;
  }

  // useEffect(() => {
  //   if (editItem === null) {
  //     return;
  //   }
  //   console.log(editItem)
  // }, [editItem])

  useEffect(() => {
    if (create === null) {
      return;
    }
    console.log(create);
    axios.post("http://192.168.88.39:8181/kolt", create).then((res) => setUpdateTime(Date.now()));
  }, [create]);

  useEffect(() => {
    axios
      .get("http://192.168.88.39:8181/kolt")
      .then((res) => res.data)
      .then((data) => setGetInfo(data));
  }, [updateTime]);

  // useEffect(() => {
  //   if (remove === 0) {
  //     return;
  //   }
  //   axios.delete("http://localhost:5001/kolt/" + remove).then((res) => setUpdateTime(Date.now()));
  // }, [remove]);

  const remove = (id) => {
    axios.delete("http://192.168.88.39:8181/kolt/" + id).then((res) => setUpdateTime(Date.now()));
  };

  // useEffect(() => {
  //   if (!showModal) {
  //     return;
  //   }
  //   setEditItem(item[0]);
  // }, [showModal])

  return (
    <>
      <Header></Header>
      <div className="main-container d-flex mt-3">
        <div className="col-4">
          <Create dispatchCreate={dispatchCreate}></Create>
        </div>
        <div className="col-8">
          <View getInfo={getInfo} remove={remove} setShowModal={setShowModal}></View>
        </div>
        <Modal
          showModal={showModal}
          setShowModal={setShowModal}
          // setEditItem={setEditItem}
          dispatchUpdate={dispatchUpdate}
          item={item(showModal.id)}
        ></Modal>
      </div>
    </>
  );
}

export default App;
