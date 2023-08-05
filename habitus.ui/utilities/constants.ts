const API_BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'https://localhost:7125/api'
    : 'https://habitus-api.azurewebsites.net/api';

const SMALL_VIEWPORT_WIDTH = 640;

export { API_BASE_URL, SMALL_VIEWPORT_WIDTH };
