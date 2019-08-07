import React from 'react';


export default class Form extends React.Component {
  state = {
    isShowForm: false
  };

  toggleForm() {
    this.setState({
      isShowForm: !this.state.isShowForm
    });
  }

  onSaveButtonClick() {
    const { fio, phone } = this.state;

    if (fio && phone) {
      this.props.onDataSave({
        fio: fio,
        phone: phone
      });

      this.setState({
        fio: '',
        phone: ''
      });
      this.toggleForm();
    }
  }

  updateField(fieldName, value) {
    this.setState({
      [fieldName]: value
    });
  }

  getFormInputs() {
    if (!this.state.isShowForm) {
      return null;
    }

    return (
      <div>
          <input
            name="fio"
            placeholder="Ф.И.О."
            onChange={(event) => this.updateField('fio', event.target.value)} />

          <input
            name="phone"
            placeholder="phone"
            onChange={(event) => this.updateField('phone', event.target.value)} />
          <button onClick={() => this.onSaveButtonClick()}>Save</button>
      </div>
    );
  }

  render() {
    return (
      <div className="form">
        <button onClick={() => this.toggleForm()}>Add element</button>
        {this.getFormInputs()}
      </div>
    );
  }
}
