import { useState } from "react";

export default function Create({ setCreate }) {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");

  function submit() {
    const item = { name: name, code: code.toUpperCase() };
    setCreate(item);
    setName("");
    setCode("");
  }

  return (
    <>
      <div className="form-group">
        <h2>Create New Item</h2>
        <label>Scooter Name</label>
        <input
          type="text"
          className="form-control"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
      </div>
      <div className="form-group">
        <label>Registration Code</label>
        <input
          type="text"
          className="form-control"
          onChange={(e) => setCode(e.target.value)}
          value={code}
        />
      </div>
      <button className="btn btn-submit" onClick={submit}>
        Submit
      </button>
    </>
  );
}
