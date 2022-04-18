import parseDate from "../Functions/parseDate";
import { useState } from "react";
import { updateRecord } from "../Actions/actions";

export default function Modal({ showModal, setShowModal, dispatchUpdate, item }) {
  const [date, setDate] = useState(Date.now());
  const [kilometres, setKilometres] = useState(0);
  const [isBusy, setIsBusy] = useState(false);
  const checking = () => {
    setIsBusy((prev) => !prev);
  };

  const submitUpdate = () => {
    const newData = { date: date, kilometres: kilometres, isbusy: isBusy, id: showModal.id };
    // console.log(newData)
    // setEditItem((old) => newData);
    dispatchUpdate(updateRecord(newData))
  };

  const cancel = () => {
    setShowModal({ id: 0 });
    setKilometres(0);
    setIsBusy(false);
    // setEditItem();
    dispatchUpdate(updateRecord(null))
  };

  return (
    <>
      {showModal.id ? (
        <div className="modalas-show">
          <div className="modalas-container">
            <div className="card text-center">
              <div className="card-header">
                <span className="font-weight-bolder">Info about:</span> {item[0].scooter_name}
                {" : "}
                {item[0].registration_code}
              </div>
              <div className="card-body">
                <h5 className="card-title">Edit info: </h5>
                <div className="form-group">
                  <label>Update Date</label>
                  <input
                    type="date"
                    className="form-control"
                    onChange={(e) => setDate(e.target.value)}
                    value={parseDate(date)}
                  />
                </div>
                <div className="form-group">
                  <label>Update Kilometres</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => setKilometres(e.target.value)}
                    value={kilometres}
                  />
                </div>
                <div className="form-group form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    onChange={checking}
                    checked={isBusy}
                  />
                  <label className="form-check-label">Check if scooter is in use?</label>
                </div>
                <button className="btn btn-outline-info" onClick={submitUpdate}>
                  Update Info
                </button>
                <button className="btn btn-outline-warning ml-3" onClick={cancel}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
