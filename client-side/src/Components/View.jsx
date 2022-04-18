import Scooter from "./Scooter";
export default function View({ getInfo, remove, setShowModal }) {
  return (
    <>
      <h2>Scooter List</h2>
      <table className="table">
        <thead className="thead">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Scooter Name</th>
            <th scope="col">Creation Date</th>
            <th scope="col">Registration Code</th>
            <th scope="col">Last used</th>
            <th scope="col">Total Kilometres</th>
            <th scope="col">Busy</th>
            <th scope="col">More actions</th>
          </tr>
        </thead>
        <tbody>
          {getInfo.map((item, i) => {
            return (
              <Scooter
                key={i}
                item={item}
                index={i}
                setShowModal={setShowModal}
                remove={remove}
              ></Scooter>
              // <tr key={i}>
              //   <th scope="row">{i + 1}</th>
              //   <td>{item.scooter_name}</td>
              //   <td>{parseDate(item.creation_date)}</td>
              //   <td>{item.registration_code}</td>
              //   <td>{item.last_use_date}</td>
              //   <td>{item.total_ride_kilometres}</td>
              //   <td>{!item.is_busy ? "Available" : "Occupied"}</td>
              //   <td>
              //     <button
              //       className="btn btn-more-info"
              //       onClick={() =>
              //         setShowModal((st) => {
              //           return { id: item.id };
              //         })
              //       }
              //     >
              //       Update Usage
              //     </button>
              //     <button className="btn btn-outline-danger ml-2" onClick={() => remove(item.id)}>
              //       Delete
              //     </button>
              //   </td>
              // </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
