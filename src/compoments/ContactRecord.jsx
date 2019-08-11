import React from 'react';
import Contact from '../types/Contact';

export default class ContactRecord extends React.Component {
  getFIO() {
    const { contact } = this.props;

    return (
      <span>
        <b>FIO:</b>
        {contact.fio}
      </span>
    );
  }

  render() {
    return (
      <div>
        {this.getFIO()}
      </div>
    );
  }
}

ContactRecord.propTypes = {
  contact: Contact,
};
