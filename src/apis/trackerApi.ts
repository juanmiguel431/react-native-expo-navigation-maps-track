import axios from 'axios';

export default axios.create({
  baseURL: process.env.EXPO_PUBLIC_NGROK_TRACK_SERVER_API,
  headers: {
    'Content-Type': 'application/json'
  }
});
