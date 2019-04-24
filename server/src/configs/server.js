const BASE_URL = "http://localhost",
  BASE_PORT = 8881,
  DB_URL = "0.0.0.0",
  DB_PORT = 27017;

module.exports = {
  "port": BASE_PORT,
  "url": `${BASE_URL}:${BASE_PORT}`,
  "db": `mongodb://${DB_URL}:${DB_PORT}`,
  "JWT_SECRET": "adminzinbeechat",
  "gmail_email": "kythuatchatbee@gmail.com",
  "gmail_password": "$chatbee@123$",
  "pfx": "./zinbee.pfx",
  "passphrase": "198586367"
};
