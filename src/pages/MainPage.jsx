import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import ContactRecord from '../compoments/ContactRecord';
import Contact from '../types/Contact';


export default class MainPage extends React.Component {
  getContactList() {
    const { contacts } = this.props;

    return contacts.map((contact, i) => {
      const index = i;

      return (
        <Link
          key={index}
          to={`/edit/${i}`}
        >
          <ContactRecord contact={contact} />
        </Link>
      );
    });
  }

  render() {
    return (
      <div>
        {this.getContactList()}
      </div>
    );
  }
}

MainPage.propTypes = {
  contacts: PropTypes.arrayOf(Contact).isRequired,
};
