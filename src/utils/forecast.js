const request = require('request')


const forecast  = ( address, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key='+ process.env.API_KEY +'&query=' + address// + latitude + ',' + longtitude

    request({ url , json:true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect forecast services', undefined)
        }
        else if (body.error) {
            callback('Unable to find forecast for location', undefined)
        }
        else {
            callback(undefined,
                (' It is currently ' + body.current.temperature + '°c out, ' + body.current.weather_descriptions[0]+ 
                '. There is a ' + body.current.precip  + '% chance of rain at '+ body.location.name + ', ' + body.location.region + ' in ' + body.location.country + '.')
            )
        }
    })
}

module.exports = forecast