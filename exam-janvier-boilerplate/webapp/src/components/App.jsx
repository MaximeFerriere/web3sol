import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import { Context as childrenContext } from "../contexts/childrenContext";
import { Layout, Menu } from "antd";
import { useContext, useState } from "react";
import { create, remove } from "../services/eventsApi.js";
const { Header, Content } = Layout;

const Help = () => {
  return <p>La page web avec le manuel</p>;
};

const Child = () => {
  const [newName, setNewName] = useState("");
  const handleNoteChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  const addNote = (event) => {
    event.preventDefault();
    const nameObject = {
      name: newName,
      date: "2022-01-20T12:10:00.000+00:00",
      child: id,
    };
    create(nameObject).then((response) => {
      seteventList(eventList.concat(response));
    });
    setNewName("");
  };

  const { getChildWithEvents, eventList, seteventList } =
    useContext(childrenContext);
  const id = useParams().id;
  //const note = childrenList.filter((n) => n.id === id);
  console.log(getChildWithEvents(id));
  const deleteeeee = (event) => {
    remove(event.target.dataset.delta).then((response) => {
      seteventList(eventList.filter((item) => item !== response));
    });
  };
  return (
    <ul>
      {getChildWithEvents(id).map((item) => (
        <li key={item.child.id}>
          <h1>Child:</h1>
          <h3>nom: {item.child.name}</h3>
          <h3>genre: {item.child.gender}</h3>
          <h3>dn: {item.child.birthDate}</h3>
          <h1>Evenements</h1>
          {item.event.map((i) => (
            <div key={i.id}>
              <h3>{i.name}</h3>
              <button onClick={deleteeeee} data-delta={i.id}>
                Supprimer
              </button>
            </div>
          ))}
        </li>
      ))}
      <form onSubmit={addNote}>
        <div>
          name: <input value={newName} onChange={handleNoteChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </ul>
  );
};

const Children = () => {
  const { childrenList } = useContext(childrenContext);
  return (
    <ul>
      {childrenList.map((item) => (
        <li key={item.id}>
          <Link to={`/children/${item.id}`}>{item.name}</Link>
        </li>
      ))}
    </ul>
  );
};

const App = () => {
  const { childrenList } = useContext(childrenContext);
  {
    console.log(childrenList);
    //console.log(getChildWithEvents("63c95ad4d77bbf60de55f196"));
  }
  return (
    <Layout className="layout">
      <Router>
        <Header>
          <Menu theme="dark" mode="horizontal" selectedKeys={[]}>
            <Menu.Item>
              <Link to="/help">HELP</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/children">Child</Link>
            </Menu.Item>
            <Menu.Item>Event</Menu.Item>
          </Menu>
        </Header>

        <Content style={{ padding: "30px 50px" }}>
          <Routes>
            <Route path="/help" element={<Help />} />
            <Route path="/children" element={<Children />} />
            <Route path="/children/:id" element={<Child />} />
          </Routes>
        </Content>
      </Router>
    </Layout>
  );
};

export default App;
