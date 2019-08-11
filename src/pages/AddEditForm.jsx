import React from 'react';
import PropTypes from 'prop-types';

export default class AddEditForm extends React.Component {
  getContact() {
    const { match, contacts } = this.props;

    return contacts[match.params.recordId];
  }

  render() {
    console.log(this.getContact());
    return (
      <div>
        Form!
      </div>
    );
  }
}

AddEditForm.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      recordId: PropTypes.string,
    }),
  }).isRequired,
  contacts: PropTypes.any.isRequired, // eslint-disable-line
};
