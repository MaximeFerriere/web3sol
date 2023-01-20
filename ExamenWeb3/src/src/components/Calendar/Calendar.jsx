import React, { useState, useContext } from "react";
import context from "../../contexts/context";
import OneDay from "./OneDay";

const Calendar = () => {
  const { sortedDisaster, buildDisasters } = useContext(context);

  const [numDesastre, setNumDesastre] = useState(0);

  const handleNombre = (e) => {
    setNumDesastre(e.target.value);
  };

  const handleChargerDesastre = () => {
    buildDisasters(numDesastre);
  };

  const days = [];
  if (sortedDisaster.length > 0) {
    sortedDisaster.map((d) => {
      days.push(<OneDay key={d.date} disas={d} />);
    });
  }

  return (
    <div>
      <h1>Calendrier des désastres de 2021</h1>
      <div>
        <input value={numDesastre} onChange={handleNombre} />{" "}
        <button onClick={handleChargerDesastre}>Charger les désastres</button>
      </div>
      <ul>{days}</ul>
    </div>
  );
};

export default Calendar;
