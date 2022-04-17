import "./App.css";
import "./crud.scss";
import "./Bootstrap.css";
import axios from "axios";
import Header from "./Components/Header";
import Create from "./Components/Create";
import View from "./Components/View";
import Modal from "./Components/Modal";
import { useEffect, useState } from "react";
function App() {
  const [create, setCreate] = useState(null);
  const [getInfo, setGetInfo] = useState([]);
  const [remove, setRemove] = useState(0);
  const [updateTime, setUpdateTime] = useState(Date.now());
  const [showModal, setShowModal] = useState({ id: 0 });
  const [editItem, setEditItem] = useState(null);
  console.log(editItem)


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
    axios.post("http://localhost:5001/kolt", create).then((res) => setUpdateTime(Date.now()));
  }, [create]);

  useEffect(() => {
    axios
      .get("http://localhost:5001/kolt")
      .then((res) => res.data)
      .then((data) => setGetInfo(data));
  }, [updateTime]);

  useEffect(() => {
    if (remove === 0) {
      return;
    }
    axios.delete("http://localhost:5001/kolt/" + remove).then((res) => setUpdateTime(Date.now()));
  }, [remove]);

  // useEffect(() => {
  //   if (!showModal) {
  //     return;
  //   }
  //   setEditItem(item[0]);
  // }, [showModal])

  return (
    <>
      <Header></Header>
      <div className="main-container d-flex">
        <div className="col-4">
          <Create setCreate={setCreate}></Create>
        </div>
        <div className="col-8">
          <View getInfo={getInfo} setRemove={setRemove} setShowModal={setShowModal}></View>
        </div>
        <Modal showModal={showModal} setShowModal={setShowModal} setEditItem={setEditItem} item={item(showModal.id)}></Modal>
      </div>
    </>
  );
}

export default App;
