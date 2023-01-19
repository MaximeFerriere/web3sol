import React, { useState, useEffect } from "react";
import { retrieveAll } from "../services/childrenApi.js";
import { retrieveAl } from "../services/eventsApi.js";
const Context = React.createContext(null);

const ProviderWrapper = (props) => {
  const [childrenList, setchildrenList] = useState([]);
  const [eventList, seteventList] = useState([]);

  const initialLoadAction = () => {
    retrieveAll().then((ac) => {
      setchildrenList(ac);
    });
    retrieveAl().then((pl) => {
      seteventList(pl);
    });
  };
  useEffect(initialLoadAction, []);

  const getChildWithEvents = (id) => {
    const Liste = eventList.filter((event) => event.child === id);
    const child = childrenList.find((child) => child.id === id);
    const li = [{ child, event: Liste }];
    return li;
  };

  const exposedValue = {
    childrenList,
    eventList,
    getChildWithEvents,
    seteventList,
  };
  return (
    <Context.Provider value={exposedValue}>{props.children}</Context.Provider>
  );
};

export { Context, ProviderWrapper };
