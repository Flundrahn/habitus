const API_BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'https://localhost:7125/api'
    : 'https://habitus-api.azurewebsites.net/api';

export default API_BASE_URL;
