import React, { Component } from 'react';
import { observer } from 'mobx-react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as Colors from 'material-ui/styles/colors';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentSave from 'material-ui/svg-icons/content/save';
import TextField from 'material-ui/TextField';
import CustomersStore from './stores/CustomersStore';

class EditCustomer extends Component {

  constructor(props){
    super(props);

    this.customer = {};
    this.customer.metadata = [];
  }

  render() {
    const {customer} = CustomersStore;
    const name = customer && customer.metadata["First name"] ? customer.metadata["First name"] : "";
    const surname = customer && customer.metadata["Last name"] ? customer.metadata["Last name"] : "";
    const email = customer && customer.email ? customer.email : "";
    const description = customer && customer.description ? customer.description : "";
    const balance = customer && customer.account_balance ? customer.account_balance : 0;
    this.onNameChange(name);
    this.onSurnameChange(surname);
    this.onEmailChange(email);
    this.onDescriptionChange(description);
    this.onBalanceChange(balance);

    return (
      <MuiThemeProvider>
        <div>
          <div style={styles.header}>
          </div>
          <div style={styles.content}>
            <div>
              <TextField
                hintText="first name"
                defaultValue={name}
                floatingLabelText="Firt Name"
                onChange={(ev, text) => this.onNameChange(text)}
              />
            </div>
            <div>
              <TextField
                hintText="last name"
                defaultValue={surname}
                floatingLabelText="Last Name"
                onChange={(ev, text) => this.onSurnameChange(text)}
              />
            </div>
            <div>
              <TextField
                type="email"
                hintText="email"
                defaultValue={email}
                floatingLabelText="Email"
                onChange={(ev, text) => this.onEmailChange(text)}
              />
            </div>
            <div>
              <TextField
                hintText="description"
                defaultValue={description}
                floatingLabelText="Description"
                onChange={(ev, text) => this.onDescriptionChange(text)}
              />
            </div>
            <div>
              <TextField
                type="number"
                hintText="balance"
                floatingLabelText="Balance"
                defaultValue={balance}
                onChange={(ev, text) => this.onBalanceChange(text)}
              />
            </div>
          </div>
          <FloatingActionButton secondary={true} style={styles.fab}
            onTouchTap={this.createOrUpdate}>
            <ContentSave />
          </FloatingActionButton>
        </div>
      </MuiThemeProvider>
    );
  }

  createOrUpdate = () => {
    if(CustomersStore.customer) {
      CustomersStore.updateCustomer(this.customer,CustomersStore.customer.id);
    } else {
      CustomersStore.createCustomer(this.customer);
    }
  };

  onNameChange = (name) => {
    this.customer.metadata["First name"] = name;
  }

  onSurnameChange = (surname) => {
    this.customer.metadata["Last name"] = surname;
  }

  onEmailChange = (email) => {
    this.customer.email = email;
  }

  onDescriptionChange = (description) => {
    this.customer.description = description;
  }

  onBalanceChange = (balance) => {
    this.customer.account_balance = balance;
  }
}

var styles = {
  header: {
    height: 100,
    backgroundColor: Colors.cyan500,
  },
  content: {
    textAlign: "center"
  },
  fab : {
    position: "fixed",
    right: 20,
    bottom: 20
  }
}

export default observer(EditCustomer);
