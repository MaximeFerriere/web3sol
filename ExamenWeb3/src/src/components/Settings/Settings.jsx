import Place from "components/Place/Place";
import React, { useContext, useState } from "react";
import context from "../../contexts/context";

const Settings = () => {
  const { places, addPlace } = useContext(context);
  const [name, setName] = useState("");

  const handleAddPlace = () => {
    addPlace(name);
    setName("");
  };

  const handleName = (e) => {
    setName(e.target.value);
  };

  return (
    <div>
      <h1>Configuration</h1>
      <h2>Lieux</h2>
      <ul>
        {places.map((p) => (
          <Place key={p.id} place={p} />
        ))}
      </ul>
      <input value={name} onChange={handleName} />
      <button onClick={handleAddPlace}>Ajouter</button>
    </div>
  );
};

export default Settings;
