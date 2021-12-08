const moment = require("moment");
const {
    createLogger,
    transports,
    format
} = require('winston');

const { printf } = format;

const logFormat = printf(({ message}) => {
    let data = JSON.stringify(message);
    return `${data}`;
  });

const logger = createLogger({
    transports: [
        // new transports.Console({
        //     level: 'info'
        // }),
        new transports.File({
            filename: 'logs/'+moment().format('DD-MM-YYYY')+'.log',
            level: 'info',
            format: format.combine(
                logFormat
            )
        })  
    ]
})

module.exports = logger;