import React from 'react';
import './App.css';
import Form from './Form';

const LOCAL_STORAGE_KEYS = {
  CONTACTS: 'contacts'
};


export default class App extends React.Component {
  state = {
    contacts: []
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

  getContacts() {
    const { contacts } = this.state;

    return contacts.map((contact, index) => (
      <div key={index}>
        FIO: {contact.fio}
      </div>
    ));
  }

  render() {
    return (
      <div>
        <Form onDataSave={contact => this.onContactSave(contact)} />
        {this.getContacts()}
      </div>
    );
  }
}
