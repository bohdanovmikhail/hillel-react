import React from 'react';
import PropTypes from 'prop-types';
import { createBrowserHistory } from 'history';
import InputMask from 'react-input-mask';

const history = createBrowserHistory();

export default class AddEditForm extends React.Component {
  state = {
    isAdded: false,
    goToMain: false,
    isErrorName: false,
    isErrorPhone: false,
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
      let name = this.state.fio;
      let phone = this.state.phone;
      let phoneNumber = parseInt(phone);
      let rxString = /[\wа-яА-Я ]/;
      let rxNumber = /\d/;

      for(let i = 0; i < name.length; i++) {
        if(!rxString.test(name[i]) || rxNumber.test(name[i])) {
          this.setState({
            isErrorName: true,
          });
          break;
        }
        this.setState({
          isErrorName: false,
        });
      }

      if(phoneNumber.toString().length != 12) {
        this.setState({
          isErrorPhone: true,
        });
      } else {
        this.setState({
          isErrorPhone: false,
        });
      }

      console.log(this.state);


      if(!this.state.isErrorName && !this.state.isErrorPhone) {
        this.props.onDataSave({
          fio: this.state.fio,
          phone: this.state.phone,
        });

        // history.push('/');

        // window.location.reload();
      }

    }


  }

  updateField(fieldName, value) {
    this.setState({
      [fieldName]: value
    });
  }

  render() {
    return (
      <div className="wrapper-form">
        <div className="form">
          <input
              name="fio"
              placeholder="Ф.И.О."
              onChange={(event) => this.updateField('fio', event.target.value)}
              value={this.state.fio}
              className={
                this.state.isErrorName ? 'input-error' : ''}

          />

          <InputMask
              mask="+380999999999"
              name="phone"
              placeholder="+380_________"
              onChange={(event) => this.updateField('phone', event.target.value)}
              value={this.state.phone}
              className={
                this.state.isErrorPhone ? 'input-error' : ''}
          />
          <button onClick={() => this.onSaveButtonClick()}>Save</button>

          <div className={
            this.state.isAdded ? 'formAdded active' : 'formAdded'
          }>
            <div>Контакт добавлен.</div>
          </div>

          <div className={
            this.state.isErrorName ? 'check-input error' : 'check-input'
          }>
            <div>Ошибка при вводе имени</div>
          </div>

          <div className={
            this.state.isErrorPhone ? 'check-input error' : 'check-input'
          }>
            <div>Ошибка при вводе телефона</div>
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
