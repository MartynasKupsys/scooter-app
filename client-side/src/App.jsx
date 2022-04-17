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
  const [update, setUpdate] = useState(Date.now());
  const [showModal, setShowModal] = useState({ status: false, id: 0 });

  const item = getInfo.filter((el) => el.id === showModal.id);

  useEffect(() => {
    if (create === null) {
      return;
    }
    axios.post("http://localhost:5000/kolt", create).then((res) => setUpdate(Date.now()));
  }, [create]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/kolt")
      .then((res) => res.data)
      .then((data) => setGetInfo(data));
  }, [update]);

  useEffect(() => {
    if (remove === 0) {
      return;
    }
    axios.delete("http://localhost:5000/kolt/" + remove).then((res) => setUpdate(Date.now()));
  }, [remove]);

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
        <Modal showModal={showModal} item={item}></Modal>
      </div>
    </>
  );
}

export default App;
