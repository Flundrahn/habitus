const API_URL = process.env.NODE_ENV === 'development'
  ? 'https://localhost:7125/api'
  : 'TODO put production api url here after deployment';

export default API_URL;