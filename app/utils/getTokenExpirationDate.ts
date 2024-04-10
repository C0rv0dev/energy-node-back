import config from "../config/config";

function getTokenExpirationDate() {
  return config.jwt_expires_in * 24 * 60 * 60 * 1000 + Date.now();
}

export default getTokenExpirationDate;
