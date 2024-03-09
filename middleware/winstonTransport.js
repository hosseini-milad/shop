const axios = require('axios')
const Transport = require('winston-transport');
const {LOG_SIZE} = process.env

var logBulk = []

class CustomTransport extends Transport {
  constructor(options) {
    super(options);
    // Initialize your custom transport here
  }
  log(info, callback) {
    setImmediate(() => {
      // Your logic to send the log to the custom web server
      // `info` contains the log message, metadata, etc.
      this.sendToWebServer(info);
    });
    callback();
  }

  sendToWebServer(logInfo) {
    if(logBulk.length<LOG_SIZE)
      return;
    // Implement your logic to send the log to your custom web server
    // You can use HTTP/HTTPS request libraries like 'axios', 'node-fetch', etc.
    // Example using axios:
 
    //console.log(logInfo)
    0&&axios.post('http://192.168.1.110:5055/api/fetchWeb', logBulk)
      .then(response => {
        console.log('Log sent successfully:', response.data);
      })
      .catch(error => {
        console.error('Error sending log:', error.message);
      });
      logBulk = []
    /**/
  }
}

module.exports = CustomTransport;
