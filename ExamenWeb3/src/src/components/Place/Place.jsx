import React, { useContext } from "react";
import context from "../../contexts/context";

const Place = ({ place }) => {
  const { deletePlace } = useContext(context);

  const handleDelete = () => {
    deletePlace(place);
  };

  return (
    <li>
      {place.name}{" "}
      <input type="button" value="Supprimer" onClick={handleDelete} />
    </li>
  );
};

export default Place;
