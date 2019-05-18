const BASE_URL = "http://localhost",
  BASE_PORT = 8881,
  SOCKET_PORT = 8889,
  DB_URL = "0.0.0.0",
  DB_PORT = 27017;

module.exports = {
  "port": BASE_PORT,
  "port_socket": SOCKET_PORT,
  "url": `${BASE_URL}:${BASE_PORT}`,
  "db": `mongodb://${DB_URL}:${DB_PORT}`,
  "JWT_SECRET": "adminzinbeechat",
  "gmail_email": "kythuatchatbee@gmail.com",
  "gmail_password": "$chatbee@123$",
  "pfx_url": "./zinbee.pfx",
  "pfx_pass": "198586367"
};
