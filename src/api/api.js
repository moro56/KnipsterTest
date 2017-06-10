import {create} from 'apisauce';

const api = create({
  baseURL: "https://api.stripe.com/v1",
  headers: {
    'Authorization': 'Bearer sk_test_BQokikJOvBiI2HlWgH4olfQ2'
  }
});

export default api;