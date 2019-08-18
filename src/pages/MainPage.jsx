import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import ContactRecord from '../compoments/ContactRecord';
import Contact from '../types/Contact';


export default class MainPage extends React.Component {
  getContactList() {
    const {contacts} = this.props;

    console.log(contacts);

    if (contacts.length == 0) {
      return (
          <div>
            <span>Записная книга еще пуста</span>
          </div>
      )
    }

    return contacts.map((contact, i) => {
      const index = i;

      return (
        <div className="contact-item">
          <ContactRecord contact={contact}/>
          <div className={'actions column'}>
            <Link key={index} to={`/edit/${i}`} className="button edit">&#10000;</Link>
            <button className="button remove" onClick={this.props.onDeleteContact}>&#10006;</button>
          </div>
        </div>
      );
    });
  }

  render() {
    return (
      <div className={'wrapper-phone-book'}>
        <div className="wrapper-title">
          <div className="title-name">
            <span className="column">Full name</span>
            <span className="column">Telephon number</span>
          </div>
          <div className="title-actions">
            <span className="column">Actions</span>
          </div>
        </div>
        {this.getContactList()}
      </div>
    );
  }
}

MainPage.propTypes = {
  contacts: PropTypes.arrayOf(Contact).isRequired,
};
