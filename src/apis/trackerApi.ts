import axios from 'axios';
import { getItemAsync } from './secureStorage';
import { deviceStorage } from '../models/device-storage';

export const trackerApi = axios.create({
  baseURL: process.env.EXPO_PUBLIC_NGROK_TRACK_SERVER_API,
  headers: {
    'Content-Type': 'application/json'
  }
});

trackerApi.interceptors.request.use(
  async (config) => {
    const token = getItemAsync(deviceStorage.Token);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
)

export default trackerApi;
