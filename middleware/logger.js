const winston = require('winston')
const ecsFormat = require('@elastic/ecs-winston-format')

const logger = winston.createLogger({
    level: 'debug',
    format: ecsFormat({ convertReqRes: true }),
    transports: [
      //new winston.transports.Console(),
      new winston.transports.File({
        //path to log file
        filename: 'logs/log.json',
        level: 'debug'
      })
    ]
  })
module.exports =logger