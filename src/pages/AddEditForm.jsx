import React from 'react';
import PropTypes from 'prop-types';
import { createBrowserHistory } from 'history';
import InputMask from 'react-input-mask';

const history = createBrowserHistory();

export default class AddEditForm extends React.Component {
  validateData = {
    fio: {
      minLenght: 5,
      maxLength: 40,
      regexTrue: /[\wа-яА-Я ]/,
      regexFalse: /\d/,

      validateFn: function (value) {
      },
    },
    phone: {
      length: 12,
      validateFn: function(value) {
        let phone = parseInt(value);
        let phoneString = phone.toString();

        if(phoneString.length != this.length) {
          return 'Номер телефона слишком короткий';
        }

      }
    }
  };
  state = {
    isAdded: false,
    goToMain: false,
    fioErrors: [],
    phoneErrors: [],
    booleanFio: false,
    booleanPhone: false,
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
    let errorObj = {};

    errorObj.errorFio = this.state.fioErrors;
    errorObj.errorPhone = this.state.phoneErrors;

    const booleanFioError = !!errorObj.errorFio.length;
    const booleanPhoneError = !!errorObj.errorPhone.length;

    this.setState({
      booleanFio: !!errorObj.errorFio.length,
      booleanPhone: !!errorObj.errorPhone.length,
    });

    if (this.props.match) {
      if (!booleanFioError && !booleanPhoneError) {
        const index = this.props.match.params.recordId;
        this.props.onUpdateContact({
          fio: this.state.fio,
          phone: this.state.phone,
        }, index);

        history.push('/');



        window.location.reload();
      }
    }

    if (!booleanFioError && !booleanPhoneError) {
      this.props.onDataSave({
        fio: this.state.fio,
        phone: this.state.phone,
      });

      this.setState({
        isAdded: true,
      });

      history.push('/');

      setTimeout(reloadWindow, 3000);
      // window.location.reload();

    }



      // let name = this.state.fio;
      // let phone = this.state.phone;
      // let phoneNumber = parseInt(phone);

      // errorObj = {
      //   name: this.validators.fio.validate(name),
      //   phone: this.validators.phone.validate(phoneNumber.toString()),
      // };
      //
      // console.log(errorObj);





      // let rxString = /[\wа-яА-Я ]/;
      // let rxNumber = /\d/;
      //
      // for(let i = 0; i < name.length; i++) {
      //   if(!rxString.test(name[i]) || rxNumber.test(name[i])) {
      //     this.setState({
      //       isErrorName: true,
      //     });
      //     break;
      //   }
      //   this.setState({
      //     isErrorName: false,
      //   });
      // }
      //
      // if(phoneNumber.toString().length != 12) {
      //   this.setState({
      //     isErrorPhone: true,
      //   });
      // } else {
      //   this.setState({
      //     isErrorPhone: false,
      //   });
      // }



      // this.setState({
      //   isError: {
      //     isErrorName: errorObj.name,
      //     isErrorPhone: errorObj.phone,
      //   }
      // });

      // console.log(this.state);






  }

  updateField(fieldName, value) {
    const errors = this.validateField(fieldName, value);

    this.setState({
      [fieldName]: value,
      [fieldName + 'Errors']: errors,
    });
  }

  validateField(fieldName, value) {
    const validator = this.validateData[fieldName];
    const result = [];

    if (validator.minLength > value.length) {
      result.push('Неверная минимальная длина');
    } else if (validator.maxLength < value.length) {
      result.push('Неверная максимальная длина');
    }

    if(validator.regexTrue) {
      for (let i = 0; i < value.length; i++) {
        if (!validator.regexTrue.test(value[i])) {
          result.push('Введены запрещенные символы: ' + value[i]);
        }
      }
    }
    if(validator.regexFalse) {
      for (let i = 0; i < value.length; i++) {
        if (validator.regexFalse.test(value[i])) {
          result.push('Введены запрещенные символы: ' + value[i]);
        }
      }
    }



    if (validator.validateFn) {
      const res = validator.validateFn(value);

      if (res) {
        result.push(res);
      }
    }

    return result;
  }

  render() {
    return (
      <div className="wrapper-form">
        <div className="form">
          <div className="wrapper-inputs">
            <div className="wrapper-fio input">
              <input
                  name="fio"
                  placeholder="Ф.И.О."
                  onChange={(event) => this.updateField('fio', event.target.value)}
                  value={this.state.fio}
                  className={
                    this.state.booleanFio ? 'input-error' : ''}

              />
              <div className={
                this.state.booleanFio ? 'check-input error' : 'check-input'
              }>
                {this.state.fioErrors.map(error => {
                  return <div>{error}</div>;
                })}
              </div>
            </div>

            <div className="wrapper-phone input">
              <InputMask
                  mask="+380999999999"
                  name="phone"
                  placeholder="+380_________"
                  onChange={(event) => this.updateField('phone', event.target.value)}
                  value={this.state.phone}
                  className={
                    this.state.booleanPhone ? 'input-error' : ''}
              />
              <div className={
                this.state.booleanPhone ? 'check-input error' : 'check-input'
              }>
                <div>
                  Телефон слишком короткий
                </div>
              </div>
            </div>
          </div>

          <button onClick={() => this.onSaveButtonClick()}>Save</button>

          <div className={
            this.state.isAdded ? 'formAdded reload' : 'formAdded'
          }>
            <div>Контакт добавлен. Переходим на главную . . .</div>
          </div>



        </div>
      </div>
    );
  }
}

function reloadWindow() {
  window.location.reload();
}

AddEditForm.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      recordId: PropTypes.string,
    }),
  }).isRequired,
  contacts: PropTypes.any.isRequired, // eslint-disable-line
};
