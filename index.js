const http = require('http')

require("dotenv").config();
require("./middleware/database").connect("");

const app = require("./app");
const { API_PORT } = process.env;
const port = 4030 || API_PORT;
const logger = require("./middleware/logger")

const server = http.createServer(app)
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
  logger.info(`listening at http://localhost:${port}`)
})


