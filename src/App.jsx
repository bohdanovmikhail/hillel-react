import React from 'react';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';

import MainPage from './pages/MainPage';
import AddEditForm from './pages/AddEditForm';

import './App.css';

const LOCAL_STORAGE_KEYS = {
  CONTACTS: 'contacts',
};


export default class App extends React.Component {
  state = {
    contacts: [],
    isContacts: false,
  };

  componentWillMount() {
    this.getData();
  }

  getData() {
    const str = localStorage.getItem(LOCAL_STORAGE_KEYS.CONTACTS);
    let data = str ? JSON.parse(str) : [];

    this.setState({
      contacts: data
    });
  }

  setData(contacts) {
    const str = JSON.stringify(contacts);
    localStorage.setItem(LOCAL_STORAGE_KEYS.CONTACTS, str);
  }

  onContactSave(contact) {
    const { contacts } = this.state;

    contacts.push(contact);
    this.setData(contacts);
    this.getData();
  }

  updateContact(contact, id) {
    const {contacts} = this.state;

    contacts[id] = contact;

    this.setData(contacts);
    this.getData();
  }

  deleteContact(id) {
    const {contacts} = this.state;

    contacts.splice(id, 1);
    this.setData(contacts);
    this.getData();
  }

  render() {
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
            Add new contact
          </NavLink>
        </div>

        <Route path="/"
               exact render={() =>
                   <MainPage
                             onDeleteContact={id => this.deleteContact(id)}
                             contacts={this.state.contacts}
                   />}
        />
        <Route path="/add" render={() => <AddEditForm onDataSave={contact => this.onContactSave(contact)}/>}/>
        <Route path="/edit/:recordId"
               render={({match}) =>
                   <AddEditForm
                       match={match}
                       contacts={this.state.contacts}
                       onUpdateContact={(contact, id) => this.updateContact(contact, id)}
                   />}
        />
      </Router>
    );
  }
}
