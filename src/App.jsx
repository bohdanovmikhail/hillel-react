import React from 'react';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';

import MainPage from './pages/MainPage';
import AddEditForm from './pages/AddEditForm';

import './App.css';


export default function App() {
  const contactList = [
    {
      fio: 'Qwerty',
    },
    {
      fio: 'Asdfgh',
    },
  ];

  return (
    <Router>
      <div>
        <NavLink
          to="/"
          exact
          activeClassName="active"
        >
            Main page
        </NavLink>
        <NavLink
          to="/add"
          activeClassName="active"
        >
          Add new record
        </NavLink>
      </div>

      <Route path="/" exact render={() => <MainPage contacts={contactList} />} />
      <Route path="/add" component={AddEditForm} />
      <Route path="/edit/:recordId" render={({ match }) => <AddEditForm match={match} contacts={contactList} />} />
    </Router>
  );
}
