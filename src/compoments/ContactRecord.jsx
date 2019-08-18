import React from 'react';
import Contact from '../types/Contact';

export default class ContactRecord extends React.Component {
  getFIO() {
    const { contact } = this.props;

    return (
        <span className={'name column'}>
          {contact.fio}
        </span>
    );
  }

  getPhone() {
    const { contact } = this.props;

    return (
      <span className={'phone column'}>
        {contact.phone}
      </span>
    );
  }

  render() {
    return (
      <div className={'contact-item-left'}>
        {this.getFIO()}
        {this.getPhone()}
      </div>
    );
  }
}

ContactRecord.propTypes = {
  contact: Contact,
};
