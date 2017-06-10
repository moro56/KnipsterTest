import React, { Component } from 'react';
import { observer } from 'mobx-react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as Colors from 'material-ui/styles/colors';
import CircularProgress from 'material-ui/CircularProgress';
import CardView from './components/CardView.js';
import {GridList} from 'material-ui/GridList';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import CustomersStore from './stores/CustomersStore';
import {
  Link
} from 'react-router-dom'

class App extends Component {

  constructor(props){
    super(props);
    this.handleScroll = this.handleScroll.bind(this);

    CustomersStore.getCustomers();

    this.state = {
      open: false,
      id: null
    };
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Delete"
        primary={true}
        onTouchTap={this.deleteCustomer}
      />,
    ];

    const listOrProgress = CustomersStore.loading === true ?
      <CircularProgress style={styles.progress}/> 
      : 
      null;

    return (
      <MuiThemeProvider>
        <div>
          <div style={styles.header}>
          </div>
          <div style={styles.content}>
            <GridList padding={20} cellHeight={"auto"} style={styles.gridList}>
              {CustomersStore.customers.map((item) => {
                return <CardView key={item.id} customer={item}
                        onEdit={() => this.editCustomer(item)}
                        onDelete={() => this.openDialog(item.id)} />
              })}
            </GridList>
            {listOrProgress}
          </div>
          <Link to="/edit">
            <FloatingActionButton secondary={true} style={styles.fab} onTouchTap={() => {
              CustomersStore.customer = null;
            }}>
              <ContentAdd />
            </FloatingActionButton>
          </Link>
          <Dialog
            actions={actions}
            modal={false}
            open={this.state.open}
            onRequestClose={this.handleClose}>
            Delete customer?
          </Dialog>
        </div>
      </MuiThemeProvider>
    );
  }

  editCustomer(item) {
    CustomersStore.customer = item;
  }

  openDialog(id) {
    this.handleOpen();
    this.setState({id: id});
  }

  deleteCustomer = () => {
    CustomersStore.deleteCustomer(this.state.id);
    this.handleClose();
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  handleScroll() {
    const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight,  html.scrollHeight, html.offsetHeight);
    const windowBottom = windowHeight + window.pageYOffset;
    if (windowBottom >= docHeight) {
      CustomersStore.loading = true;
      CustomersStore.getCustomers(CustomersStore.customers[CustomersStore.customers.length - 1].id);
    }
  }
}

var styles = {
  header: {
    height: 100,
    backgroundColor: Colors.cyan500,
  },
  gridList: {
    marginLeft: 60,
    marginRight: 60,
    marginTop: 20,
    marginBottom: 20
  },
  progress: {
    position: "absolute",
    left: "50%"
  },
  fab : {
    position: "fixed",
    right: 20,
    bottom: 20
  }
}

export default observer(App);
