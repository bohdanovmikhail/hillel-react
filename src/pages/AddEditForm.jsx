import React from 'react';
import PropTypes from 'prop-types';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

export default class AddEditForm extends React.Component {
  state = {
    isAdded: false,
    goToMain: false,
  };

  constructor(props) {
    super(props);

    this.onEdit();
  }

  onEdit() {
    if(this.props.match) {
      const contacts = this.props.contacts;
      const index = this.props.match.params.recordId;

      this.state.fio = contacts[index].fio;
      this.state.phone = contacts[index].phone;
    }
  }

  onSaveButtonClick() {
    if(this.props.match) {
      const index = this.props.match.params.recordId;
      this.props.onUpdateContact({
        fio: this.state.fio,
        phone: this.state.phone,
      }, index);


      history.push('/');

      window.location.reload();
    } else if(this.state.fio && this.state.phone) {
      this.props.onDataSave({
        fio: this.state.fio,
        phone: this.state.phone,
      });

      history.push('/');

      window.location.reload();
    }

  }

  updateField(fieldName, value) {
    this.setState({
      [fieldName]: value
    });
  }

  render() {
    return (
      <div>
        <div className="form">
          <input
              name="fio"
              placeholder="Ф.И.О."
              onChange={(event) => this.updateField('fio', event.target.value)}
              value={this.state.fio}

          />

          <input
              name="phone"
              placeholder="phone"
              onChange={(event) => this.updateField('phone', event.target.value)}
              value={this.state.phone}

          />
          <button onClick={() => this.onSaveButtonClick()}>Save</button>

          <div className={
            this.state.isAdded ? 'formAdded active' : 'formAdded'
          }>
            <div>Контакт добавлен.</div>
          </div>
        </div>
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
