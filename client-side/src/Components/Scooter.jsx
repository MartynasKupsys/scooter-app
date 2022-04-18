import parseDate from "../Functions/parseDate";

export default function Scooter({ item, remove, setShowModal, index }) {
  return (
    <tr>
      <th scope="row">{index + 1}</th>
      <td>{item.scooter_name}</td>
      <td>{parseDate(item.creation_date)}</td>
      <td>{item.registration_code}</td>
      <td>{item.last_use_date}</td>
      <td>{item.total_ride_kilometres}</td>
      <td>{!item.is_busy ? "Available" : "Occupied"}</td>
      <td>
        <button
          className="btn btn-outline-info"
          onClick={() =>
            setShowModal((st) => {
              return { id: item.id };
            })
          }
        >
          Edit Info
        </button>
        <button className="btn btn-outline-danger ml-2" onClick={() => remove(item.id)}>
          Delete
        </button>
      </td>
    </tr>
  );
}
