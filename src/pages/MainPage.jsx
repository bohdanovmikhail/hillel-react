import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import ContactRecord from '../compoments/ContactRecord';
import Contact from '../types/Contact';


export default class MainPage extends React.Component {
  getContactList() {
    const {contacts} = this.props;

    if (contacts.length === 0) {
      return (
          <div>
            <span className="empty"> </span>
          </div>
      )
    }

    return contacts.map((contact, i) => {
      const index = i;

      return (
        <div className="contacts">
          <ContactRecord contact={contact}/>
          <div className={'MainPageBook__edit column'}>
            <Link key={index} to={`/edit/${index}`} className="button edit">
            </Link>
            <button className="button remove" onClick={this.props.onDeleteContact}>&#10006;</button>
          </div>
        </div>
      );
    });
  }

  render() {
    return (
      <div className={'MainPageBook'}>
        <div className="MainPageBook__title">
          <div className="MainPageBook__title-name">
            <span className="column">Name</span>
            <span className="column">Phone number</span>
          </div>
          <div className="MainPageBook__title-edit">
            <span className="column">Edit</span>
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
