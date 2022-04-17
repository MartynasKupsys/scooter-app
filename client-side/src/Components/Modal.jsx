export default function Modal({ showModal, item }) {
  return (
    <div className={showModal.status ? "modalas-show" : "modalas"}>
      <div className="modalas-container">
        <div className="card text-center">
          <div className="card-header">Info about: </div>
          <div className="card-body">
            <h5 className="card-title">Edit info:</h5>
          </div>
          {/* <div className="card-footer text-muted">2 days ago</div> */}
        </div>
      </div>
    </div>
  );
}
