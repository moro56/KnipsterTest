import React, { Component } from 'react';
import {Card, CardActions, CardTitle,CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import {
  Link
} from 'react-router-dom'

class CardView extends Component {

	render() {
		const {customer, onEdit, onDelete} = this.props;
		const fullName = this.getFullName(customer);
		const email = "Email: " + (customer.email ? customer.email : "");
		const description = "Description: " + (customer.description ? customer.description : "");
		const balance = "Balance: " + customer.account_balance;

	    return (
	      	<Card>
		        <CardTitle title={fullName} subtitle={email} />
		        <CardText> 
		        	{description} 
		        </CardText>
		        <CardText style={{paddingTop: 0}}> 
		        	{balance}
		        </CardText>
		        <CardActions style={{display:"flex",justifyContent: "flex-end"}}>
		          	<Link to="/edit">
		          		<FlatButton label="edit" primary={true} onTouchTap={onEdit} />
		          	</Link>
		          	<FlatButton label="delete" secondary={true} onTouchTap={onDelete} />
		        </CardActions>
	      	</Card>
	   	)
  	}

  	getFullName(customer) {
  		const name = customer.metadata["First name"] ? (customer.metadata["First name"] + " ") : "";
		const surname = customer.metadata["Last name"] ? customer.metadata["Last name"] : "";
		const fullName = name + surname;
		return fullName;
  	}
}

export default CardView;
