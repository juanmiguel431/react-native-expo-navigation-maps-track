import axios from 'axios';

export default axios.create({
  baseURL: 'https://d631-186-6-126-137.ngrok-free.app',
  headers: {
    'Content-Type': 'application/json'
  }
});
