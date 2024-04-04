const PORT = process.env.PORT || 3000;
const API_VERSION = process.env.API_VERSION || 'v1';
const API_BASE_URL = `/api/${API_VERSION}`;

const config = {
    port: PORT,
    api_version: API_VERSION,
    api_base_url: API_BASE_URL,
};

export default config;