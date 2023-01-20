import React, { useState, useEffect } from "react";
import { randomDate, randomItem } from "utils/random";
import * as actionsService from "../services/actionsApi";
import * as placesService from "../services/placesApi";

const Context = React.createContext(null);

const ProviderWrapper = (props) => {
  const [actions, setAction] = useState([]);
  const [places, setPlace] = useState([]);

  const [disasters, setDisasters] = useState([]);

  const createDisaster = (action, place, date) => {
    const newDis = {
      name: action + " " + place,
      date: date,
    };
    return newDis;
  };
  const createPlace = (name) => {
    const newPlace = {
      name: name,
    };
    return newPlace;
  };

  const initialLoadAction = () => {
    actionsService.retrieve().then((ac) => {
      setAction(ac);
    });
    placesService.retrieve().then((pl) => {
      setPlace(pl);
    });
  };
  useEffect(initialLoadAction, []);

  const buildDisasters = (num) => {
    const localTab = [];
    for (let index = 0; index < num; index++) {
      const randomAction = randomItem(actions);
      const randomPlace = randomItem(places);
      const randomDates = randomDate(2020).toISOString();
      localTab.push(
        createDisaster(randomAction.name, randomPlace.name, randomDates)
      );
    }
    setDisasters(localTab);
  };

  const addPlace = (name) => {
    const newObj = createPlace(name);
    placesService.create(newObj).then((r) => {
      setPlace([...places, r.data]);
    });
  };

  const deletePlace = (place) => {
    const objToDelete = places.find((p) => p.id === place.id);
    placesService.deleteO(objToDelete.id).then((r) => console.log(r));
    setPlace(places.filter((p) => p.id !== place.id));
  };

  const sortedDisaster = disasters.sort((a, b) => {
    if (a.date > b.date) return 1;
    else return -1;
  });

  const exposedValue = {
    sortedDisaster,
    buildDisasters,
    places,
    addPlace,
    deletePlace,
  };

  return (
    <Context.Provider value={exposedValue}>{props.children}</Context.Provider>
  );
};

export { Context, ProviderWrapper };
export default Context;
