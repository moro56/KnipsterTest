import {observable} from 'mobx';
import api from './../api/api.js';

class CustomersStore {
	
	calling = false;
	customer = null;
	customers = observable([]);
	loading = observable(false);

	getCustomers(next) {
		if(this.calling) {
			return;
		}
		this.loading = true;
		this.calling = true;
		api.get('/customers', {starting_after: next}).then((response) => {
			if(next){
				this.customers.replace(this.customers.concat(response.data.data.slice()));
			} else {
				this.customers.replace(response.data.data);
			}
			this.loading = false;
			this.calling = false;
		}).catch(() => {
			this.loading = false;
			this.calling = false;
		});
	}

	deleteCustomer(id) {
		if(this.calling) {
			return;
		}
		this.calling = true;
		api.delete('/customers/'+id).then((response) => {
			let data = response.data;
			if(data && data.deleted){
				let customer = this.customers.find(x => x.id === data.id);
				if(customer) {
					this.customers.remove(customer);
				}
			}
			this.calling = false;
		}).catch(() => {
			this.calling = false;
		});
	}

	updateCustomer(customer, id) {
		var params = new URLSearchParams();
    	params.append('email', customer.email);
    	params.append('description', customer.description);
    	params.append('account_balance', customer.account_balance);
    	params.append('metadata[First name]', customer.metadata['First name']);
    	params.append('metadata[Last name]', customer.metadata['Last name']);

		let headers = new Headers();
		headers.append('Authorization', 'Bearer sk_test_BQokikJOvBiI2HlWgH4olfQ2');
		headers.append('Content-Type', 'application/x-www-form-urlencoded');

		fetch('https://api.stripe.com/v1/customers/' + id, {
			method: 'post',
			headers: headers,
			body: params
		}).then((response) => {
			return response.json();
		}).then((data) => {
			let index = this.customers.findIndex(x => x.id === data.id);
			if(index !== -1) {
				this.customers[index] = data;
			}
			window.history.back();
		}).catch(() => {
		});
	}

	createCustomer(customer) {
		var params = new URLSearchParams();
    	params.append('email', customer.email);
    	params.append('description', customer.description);
    	params.append('account_balance', customer.account_balance);
    	params.append('metadata[First name]', customer.metadata['First name']);
    	params.append('metadata[Last name]', customer.metadata['Last name']);

		let headers = new Headers();
		headers.append('Authorization', 'Bearer sk_test_BQokikJOvBiI2HlWgH4olfQ2');
		headers.append('Content-Type', 'application/x-www-form-urlencoded');

		fetch('https://api.stripe.com/v1/customers', {
			method: 'post',
			headers: headers,
			body: params
		}).then((response) => {
			return response.json();
		}).then((data) => {
			this.customers.unshift(data);
			window.history.back();
		}).catch(() => {
		});
	}
}

const customersStore = new CustomersStore()
export default customersStore;